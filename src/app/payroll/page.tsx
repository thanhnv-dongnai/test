import ProtectedPage from '@/components/ProtectedPage';

const payroll = [{ employee: 'Lan Tran', period: 'Sep 2026', net: '13,500,000 VND', status: 'Processed' }, { employee: 'Minh Pham', period: 'Sep 2026', net: '12,800,000 VND', status: 'Processed' }];

export default function PayrollPage() {
  return <ProtectedPage allowedRoles={['school_admin', 'hr_manager']}><main className="p-8"><h1 className="mb-6 text-2xl font-bold">Payroll</h1><div className="overflow-hidden rounded-xl bg-white shadow-sm"><table className="min-w-full text-left"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Employee</th><th className="px-4 py-3">Period</th><th className="px-4 py-3">Net salary</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{payroll.map((record) => <tr key={record.employee} className="border-t"><td className="px-4 py-3">{record.employee}</td><td className="px-4 py-3">{record.period}</td><td className="px-4 py-3">{record.net}</td><td className="px-4 py-3">{record.status}</td></tr>)}</tbody></table></div></main></ProtectedPage>;
}
