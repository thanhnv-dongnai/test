import ProtectedPage from '@/components/ProtectedPage';

const exams = [{ name: 'Mid-Term Mathematics', className: 'Grade 5A', date: '15 Oct 2026', status: 'Scheduled' }, { name: 'English Assessment', className: 'Grade 6A', date: '18 Oct 2026', status: 'Scheduled' }];

export default function ExamsPage() {
  return <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher']}><main className="p-8"><h1 className="mb-6 text-2xl font-bold">Exams and Results</h1><div className="overflow-hidden rounded-xl bg-white shadow-sm"><table className="min-w-full text-left"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Exam</th><th className="px-4 py-3">Class</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{exams.map((exam) => <tr key={exam.name} className="border-t"><td className="px-4 py-3">{exam.name}</td><td className="px-4 py-3">{exam.className}</td><td className="px-4 py-3">{exam.date}</td><td className="px-4 py-3">{exam.status}</td></tr>)}</tbody></table></div></main></ProtectedPage>;
}
