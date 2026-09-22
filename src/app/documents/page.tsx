import ProtectedPage from '@/components/ProtectedPage';

const documents = [{ name: 'Student handbook.pdf', type: 'School document', updated: '22 Sep 2026' }, { name: 'Grade 5A roster.xlsx', type: 'Class document', updated: '20 Sep 2026' }, { name: 'Fee policy.pdf', type: 'Finance document', updated: '01 Sep 2026' }];

export default function DocumentsPage() { return <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher', 'accountant']}><main className="p-8"><h1 className="mb-6 text-2xl font-bold">Documents</h1><div className="grid gap-4 md:grid-cols-3">{documents.map((document) => <div key={document.name} className="rounded-xl bg-white p-5 shadow-sm"><p className="font-semibold">{document.name}</p><p className="mt-2 text-sm text-slate-500">{document.type}</p><p className="mt-1 text-xs text-slate-400">Updated {document.updated}</p><button className="mt-4 text-sm font-medium text-blue-600 hover:underline">View document</button></div>)}</div></main></ProtectedPage>; }
