import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Student } from '@/types/school';

export async function getStudentsBySchool(schoolId: string): Promise<Student[]> {
  const snapshot = await getDocs(query(collection(db, 'schools', schoolId, 'students'), where('schoolId', '==', schoolId)));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as Student[];
}
