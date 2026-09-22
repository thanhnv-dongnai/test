import ProtectedPage from '@/components/ProtectedPage';
import { getStudentsBySchool } from '@/services/student.service';

export default async function StudentsPage() {
  const students = await getStudentsBySchool('sch_001');

  return (
    <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher']}>
      <main className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Students</h1>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="min-w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3">Student Code</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t">
                  <td className="px-4 py-3">{student.studentCode}</td>
                  <td className="px-4 py-3">{student.fullName}</td>
                  <td className="px-4 py-3">{student.gradeLevel}</td>
                  <td className="px-4 py-3">{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </ProtectedPage>
  );
}
