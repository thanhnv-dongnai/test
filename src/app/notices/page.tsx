import ProtectedPage from '@/components/ProtectedPage';

const notices = [{ title: 'Parent Meeting Schedule', content: 'The parent meeting will be held on Friday at 09:00 AM.', audience: 'Parents and teachers', status: 'Published' }, { title: 'School Trip Registration', content: 'Registration is open until 25 September.', audience: 'Students and parents', status: 'Active' }];

export default function NoticesPage() {
  return <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher']}><main className="p-8"><h1 className="mb-6 text-2xl font-bold">Notices</h1><div className="space-y-4">{notices.map((notice) => <article key={notice.title} className="rounded-xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl font-semibold">{notice.title}</h2><span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">{notice.status}</span></div><p className="mt-3 text-slate-600">{notice.content}</p><p className="mt-3 text-xs text-slate-500">Audience: {notice.audience}</p></article>)}</div></main></ProtectedPage>;
}
