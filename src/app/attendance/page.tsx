import ProtectedPage from '@/components/ProtectedPage';

const records = [{ student: 'An Nguyen', className: 'Grade 5A', status: 'Present' }, { student: 'Binh Tran', className: 'Grade 5A', status: 'Late' }, { student: 'Chi Le', className: 'Grade 5A', status: 'Absent' }];

export default function AttendancePage() {
  return <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher']}><main className="p-8"><div className="mb-6 flex items-center justify-between"><div><h1 className="text-2xl font-bold">Attendance</h1><p className="mt-1 text-sm text-slate-500">22 September 2026 · Grade 5A</p></div><button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white">Submit attendance</button></div><div className="overflow-hidden rounded-xl bg-white shadow-sm"><table className="min-w-full text-left"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Class</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{records.map((record) => <tr key={record.student} className="border-t"><td className="px-4 py-3">{record.student}</td><td className="px-4 py-3">{record.className}</td><td className="px-4 py-3">{record.status}</td></tr>)}</tbody></table></div></main></ProtectedPage>;
}
