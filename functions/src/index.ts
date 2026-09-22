import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

const addAuditLog = async (
  schoolId: string,
  entityType: string,
  entityId: string,
  action: string,
  fieldName: string,
  oldValue: any,
  newValue: any,
  changedBy: string
) => {
  await admin
    .firestore()
    .collection('schools')
    .doc(schoolId)
    .collection('auditLogs')
    .add({
      entityType,
      entityId,
      action,
      fieldName,
      oldValue,
      newValue,
      changedBy,
      changedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
};

const scoreToGrade = (score: number): string => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

export const createStudentRecord = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Login required');
  }

  const { schoolId, studentCode, firstName, lastName, gradeLevel, dateOfBirth, admissionDate } = data;

  if (!schoolId || !studentCode || !firstName || !lastName || !gradeLevel) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required student fields');
  }

  const studentRef = admin.firestore().collection('schools').doc(schoolId).collection('students').doc();
  const studentId = studentRef.id;

  await studentRef.set({
    studentCode,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    dateOfBirth,
    admissionDate,
    gradeLevel,
    status: 'active',
    schoolId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await addAuditLog(schoolId, 'students', studentId, 'created', 'studentCode', null, studentCode, context.auth.uid);

  return { message: 'Student created successfully', studentId };
});

export const processPayment = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Login required');
  }

  const { schoolId, studentId, invoiceId, amount, method, referenceNumber } = data;

  if (!schoolId || !studentId || !invoiceId || !amount || !method) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required payment fields');
  }

  const amountValue = Number(amount);
  if (amountValue <= 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Amount must be greater than zero');
  }

  const invoiceRef = admin.firestore().collection('schools').doc(schoolId).collection('invoices').doc(invoiceId);
  const invoiceSnap = await invoiceRef.get();

  if (!invoiceSnap.exists) {
    throw new functions.https.HttpsError('not-found', 'Invoice not found');
  }

  const invoice = invoiceSnap.data() as any;
  const currentPaid = Number(invoice.paidAmount || 0);
  const total = Number(invoice.total || 0);
  const nextPaid = currentPaid + amountValue;

  if (nextPaid > total) {
    throw new functions.https.HttpsError('failed-precondition', 'Payment amount exceeds invoice total');
  }

  const paymentRef = admin.firestore().collection('schools').doc(schoolId).collection('payments').doc();
  const paymentId = paymentRef.id;

  await paymentRef.set({
    invoiceId,
    studentId,
    paymentDate: new Date().toISOString(),
    method,
    amount: amountValue,
    referenceNumber: referenceNumber || '',
    receiptNumber: `RCPT-${Date.now()}`,
    status: 'posted',
    createdBy: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await invoiceRef.update({
    paidAmount: nextPaid,
    balance: total - nextPaid,
    status: total - nextPaid > 0 ? 'partial' : 'paid',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await addAuditLog(schoolId, 'payments', paymentId, 'created', 'amount', null, amountValue, context.auth.uid);

  return { message: 'Payment recorded successfully', paymentId };
});

export const publishExamResult = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Login required');
  }

  const { schoolId, studentId, examId, subjectId, score, teacherId } = data;

  if (!schoolId || !studentId || !examId || !subjectId || score === undefined) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required result fields');
  }

  const scoreValue = Number(score);
  if (scoreValue < 0 || scoreValue > 100) {
    throw new functions.https.HttpsError('invalid-argument', 'Score must be between 0 and 100');
  }

  const examRef = admin.firestore().collection('schools').doc(schoolId).collection('exams').doc(examId);
  const examSnap = await examRef.get();

  if (!examSnap.exists) {
    throw new functions.https.HttpsError('not-found', 'Exam not found');
  }

  const finalGrade = scoreToGrade(scoreValue);
  const resultRef = admin.firestore().collection('schools').doc(schoolId).collection('results').doc();

  await resultRef.set({
    studentId,
    examId,
    classId: examSnap.data()?.classId,
    subjectId,
    score: scoreValue,
    grade: finalGrade,
    markType: 'numeric',
    teacherId: teacherId || context.auth.uid,
    publishedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await addAuditLog(schoolId, 'results', resultRef.id, 'published', 'score', null, scoreValue, context.auth.uid);

  return { message: 'Result published successfully', resultId: resultRef.id };
});

export const issueLibraryBook = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Login required');
  }

  const { schoolId, studentId, bookId, dueDate } = data;

  if (!schoolId || !studentId || !bookId || !dueDate) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required book issue fields');
  }

  const bookRef = admin.firestore().collection('schools').doc(schoolId).collection('libraryBooks').doc(bookId);
  const bookSnap = await bookRef.get();

  if (!bookSnap.exists) {
    throw new functions.https.HttpsError('not-found', 'Book not found');
  }

  const book = bookSnap.data() as any;
  const availableQty = Number(book.availableQuantity || 0);

  if (availableQty <= 0) {
    throw new functions.https.HttpsError('failed-precondition', 'Book is not available');
  }

  const issueRef = admin.firestore().collection('schools').doc(schoolId).collection('libraryIssues').doc();

  await issueRef.set({
    bookId,
    studentId,
    issueDate: new Date().toISOString(),
    dueDate,
    returnDate: null,
    status: 'issued',
    fineAmount: 0,
    createdBy: context.auth.uid,
  });

  await bookRef.update({
    availableQuantity: availableQty - 1,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await addAuditLog(schoolId, 'libraryIssues', issueRef.id, 'issued', 'bookId', null, bookId, context.auth.uid);

  return { message: 'Book issued successfully', issueId: issueRef.id };
});

export const finalizeAttendance = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Login required');
  }

  const { schoolId, attendanceId } = data;
  if (!schoolId || !attendanceId) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing attendance fields');
  }

  const attendanceRef = admin.firestore().collection('schools').doc(schoolId).collection('attendance').doc(attendanceId);
  const attendanceSnap = await attendanceRef.get();

  if (!attendanceSnap.exists) {
    throw new functions.https.HttpsError('not-found', 'Attendance record not found');
  }

  await attendanceRef.update({
    status: 'finalized',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await addAuditLog(schoolId, 'attendance', attendanceId, 'finalized', 'status', 'submitted', 'finalized', context.auth.uid);

  return { message: 'Attendance finalized successfully' };
});

export const generatePayroll = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Login required');
  }

  const { schoolId, employeeId, period, basicSalary, allowances, deductions } = data;

  if (!schoolId || !employeeId || !period || basicSalary === undefined) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing payroll fields');
  }

  const netSalary = Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

  const payrollRef = admin.firestore().collection('schools').doc(schoolId).collection('payroll').doc();

  await payrollRef.set({
    employeeId,
    period,
    basicSalary: Number(basicSalary),
    allowances: Number(allowances || 0),
    deductions: Number(deductions || 0),
    netSalary,
    status: 'processed',
    processedBy: context.auth.uid,
  });

  await addAuditLog(schoolId, 'payroll', payrollRef.id, 'processed', 'netSalary', null, netSalary, context.auth.uid);

  return { message: 'Payroll generated successfully', payrollId: payrollRef.id };
});
