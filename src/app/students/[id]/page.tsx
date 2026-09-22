'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProtectedPage from '@/components/ProtectedPage';
import { getStudentDetail, getStudentInvoices, getStudentResults } from '@/services/student-detail.service';
import PaymentForm from '@/components/forms/PaymentForm';
import ExamResultForm from '@/components/forms/ExamResultForm';
import LibraryIssueForm from '@/components/forms/LibraryIssueForm';

type RecordData = Record<string, any> & { id: string };

export default function StudentDetailPage() {
  const params = useParams<{ id: string }>();
  const studentId = params.id;
  const [student, setStudent] = useState<Record<string, any> | null>(null);
  const [invoices, setInvoices] = useState<RecordData[]>([]);
  const [results, setResults] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!studentId) return;
    Promise.all([getStudentDetail('sch_001', studentId), getStudentInvoices('sch_001', studentId), getStudentResults('sch_001', studentId)])
      .then(([profile, invoiceRows, resultRows]) => {
        setStudent(profile as Record<string, any> | null);
        setInvoices(invoiceRows as RecordData[]);
        setResults(resultRows as RecordData[]);
      })
      .catch(() => setError('Unable to load the student profile.'))
      .finally(() => setLoading(false));
  }, [studentId]);

  return <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher', 'accountant']}><main className="space-y-8 p-8">{loading && <p className="rounded-lg bg-white p-6 text-slate-500">Loading student...</p>}{error && <p className="rounded-lg bg-red-50 p-6 text-red-700">{error}</p>}{!loading && !error && !student && <p className="rounded-lg bg-white p-6">Student not found.</p>}{student && <><section className="rounded-xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm uppercase tracking-wide text-slate-500">Student Profile</p><h1 className="mt-2 text-3xl font-bold">{student.fullName || `${student.firstName} ${student.lastName}`}</h1></div><div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">{student.status}</div></div><div className="mt-6 grid gap-4 md:grid-cols-3">{[['Student Code', student.studentCode], ['Grade', student.gradeLevel], ['Date of Birth', student.dateOfBirth], ['Phone', student.phone || '-'], ['Email', student.email || '-'], ['Address', student.address || '-']].map(([label, value]) => <div key={String(label)}><p className="text-sm text-slate-500">{label}</p><p className="mt-1 font-medium">{value}</p></div>)}</div></section><section className="grid gap-6 xl:grid-cols-3"><div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-2"><h2 className="mb-4 text-xl font-bold">Recent Results</h2>{results.length === 0 ? <p className="text-slate-500">No results available.</p> : <div className="space-y-3">{results.map((item) => <div key={item.id} className="flex justify-between rounded-lg border p-3"><span>{item.examId} · {item.subjectId}</span><strong>{item.score} ({item.grade})</strong></div>)}</div>}</div><div className="rounded-xl bg-white p-6 shadow-sm"><h2 className="mb-4 text-xl font-bold">Invoices</h2>{invoices.length === 0 ? <p className="text-slate-500">No invoices found.</p> : <div className="space-y-3">{invoices.map((invoice) => <div key={invoice.id} className="rounded-lg border p-3"><p className="font-medium">{invoice.invoiceNumber}</p><p className="text-sm text-slate-600">Balance: {invoice.balance}</p></div>)}</div>}</div></section><section className="grid gap-6 xl:grid-cols-3"><div className="rounded-xl bg-white p-6 shadow-sm"><h2 className="mb-4 text-xl font-bold">Payment</h2><PaymentForm schoolId="sch_001" studentId={studentId} /></div><div className="rounded-xl bg-white p-6 shadow-sm"><h2 className="mb-4 text-xl font-bold">Exam Result</h2><ExamResultForm schoolId="sch_001" studentId={studentId} /></div><div className="rounded-xl bg-white p-6 shadow-sm"><h2 className="mb-4 text-xl font-bold">Library Issue</h2><LibraryIssueForm schoolId="sch_001" studentId={studentId} /></div></section></>}</main></ProtectedPage>;
}
