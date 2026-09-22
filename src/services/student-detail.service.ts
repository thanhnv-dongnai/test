import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export async function getStudentDetail(schoolId: string, studentId: string) {
  const ref = doc(db, 'schools', schoolId, 'students', studentId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() };
}

export async function getStudentResults(schoolId: string, studentId: string) {
  const q = query(
    collection(db, 'schools', schoolId, 'results'),
    where('studentId', '==', studentId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getStudentInvoices(schoolId: string, studentId: string) {
  const q = query(
    collection(db, 'schools', schoolId, 'invoices'),
    where('studentId', '==', studentId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
