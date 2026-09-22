import ProtectedPage from '@/components/ProtectedPage';

const teachers = [
  { code: 'TC-001', name: 'Lan Tran', subject: 'Mathematics', classes: 'Grade 5A', status: 'Active' },
  { code: 'TC-002', name: 'Minh Pham', subject: 'English', classes: 'Grade 6A, 6B', status: 'Active' },
  { code: 'TC-003', name: 'Hoa Le', subject: 'Science', classes: 'Grade 5B', status: 'On leave' },
];

export default function TeachersPage() {
  return (
    <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher']}>
      <main className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Teachers</h1>
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="min-w-full text-left">
            <thead className="bg-slate-100"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Classes</th><th className="px-4 py-3">Status</th></tr></thead>
            <tbody>{teachers.map((teacher) => <tr key={teacher.code} className="border-t"><td className="px-4 py-3">{teacher.code}</td><td className="px-4 py-3">{teacher.name}</td><td className="px-4 py-3">{teacher.subject}</td><td className="px-4 py-3">{teacher.classes}</td><td className="px-4 py-3">{teacher.status}</td></tr>)}</tbody>
          </table>
        </div>
      </main>
    </ProtectedPage>
  );
}
