'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedPage from '@/components/ProtectedPage';
import { getStudentsBySchool } from '@/services/student.service';
import type { Student } from '@/types/school';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getStudentsBySchool('sch_001')
      .then(setStudents)
      .catch(() => setError('Unable to load students. Check Firebase configuration and permissions.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher']}>
      <main className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div><h1 className="text-2xl font-bold">Students</h1><p className="mt-1 text-sm text-slate-500">Manage enrolled students and profiles.</p></div>
          <Link href="/admissions" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">New admission</Link>
        </div>
        {loading && <p className="rounded-lg bg-white p-6 text-slate-500">Loading students...</p>}
        {error && <p className="rounded-lg bg-red-50 p-6 text-red-700">{error}</p>}
        {!loading && !error && <div className="overflow-hidden rounded-xl bg-white shadow-sm"><table className="min-w-full text-left"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Student Code</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Grade</th><th className="px-4 py-3">Status</th><th className="px-4 py-3" /></tr></thead><tbody>{students.length === 0 ? <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No students found.</td></tr> : students.map((student) => <tr key={student.id} className="border-t"><td className="px-4 py-3">{student.studentCode}</td><td className="px-4 py-3">{student.fullName}</td><td className="px-4 py-3">{student.gradeLevel}</td><td className="px-4 py-3">{student.status}</td><td className="px-4 py-3"><Link className="text-blue-600 hover:underline" href={`/students/${student.id}`}>View</Link></td></tr>)}</tbody></table></div>}
      </main>
    </ProtectedPage>
  );
}
