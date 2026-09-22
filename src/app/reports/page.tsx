import ProtectedPage from '@/components/ProtectedPage';

export default function ReportsPage() {
  return <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'accountant']}><main className="p-8"><h1 className="mb-6 text-2xl font-bold">Reports</h1><div className="grid gap-6 md:grid-cols-3"><div className="rounded-xl bg-white p-6 shadow-sm"><p className="text-sm text-slate-500">Attendance rate</p><p className="mt-2 text-3xl font-bold">96.2%</p></div><div className="rounded-xl bg-white p-6 shadow-sm"><p className="text-sm text-slate-500">Fee collection</p><p className="mt-2 text-3xl font-bold">85.4%</p></div><div className="rounded-xl bg-white p-6 shadow-sm"><p className="text-sm text-slate-500">Exam pass rate</p><p className="mt-2 text-3xl font-bold">89.6%</p></div></div></main></ProtectedPage>;
}
