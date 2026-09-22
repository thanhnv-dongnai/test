import ProtectedPage from '@/components/ProtectedPage';

const parents = [{ name: 'Nguyen Van B', relationship: 'Father', phone: '+84 909 333 444', children: 'An Nguyen' }, { name: 'Tran Thi C', relationship: 'Mother', phone: '+84 909 555 666', children: 'Binh Tran' }];

export default function ParentsPage() {
  return <ProtectedPage allowedRoles={['school_admin', 'academic_admin']}><main className="p-8"><h1 className="mb-6 text-2xl font-bold">Parents</h1><div className="overflow-hidden rounded-xl bg-white shadow-sm"><table className="min-w-full text-left"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Relationship</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Children</th></tr></thead><tbody>{parents.map((parent) => <tr key={parent.name} className="border-t"><td className="px-4 py-3">{parent.name}</td><td className="px-4 py-3">{parent.relationship}</td><td className="px-4 py-3">{parent.phone}</td><td className="px-4 py-3">{parent.children}</td></tr>)}</tbody></table></div></main></ProtectedPage>;
}
