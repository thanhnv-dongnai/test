import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Student } from '@/types/school';

export async function getStudentsBySchool(schoolId: string): Promise<Student[]> {
  const q = query(
    collection(db, 'schools', schoolId, 'students'),
    where('schoolId', '==', schoolId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Student[];
}
