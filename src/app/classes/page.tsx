import ProtectedPage from '@/components/ProtectedPage';

const classes = [
  { name: 'Grade 5A', teacher: 'Lan Tran', room: 'Room 101', students: 32, status: 'Active' },
  { name: 'Grade 5B', teacher: 'Hoa Le', room: 'Room 102', students: 30, status: 'Active' },
  { name: 'Grade 6A', teacher: 'Minh Pham', room: 'Room 201', students: 35, status: 'Active' },
];

export default function ClassesPage() {
  return (
    <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher']}>
      <main className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Classes</h1>
        <div className="grid gap-6 md:grid-cols-3">{classes.map((item) => <div key={item.name} className="rounded-xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">{item.name}</h2><dl className="mt-4 space-y-2 text-sm"><div className="flex justify-between"><dt className="text-slate-500">Class teacher</dt><dd>{item.teacher}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Room</dt><dd>{item.room}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Students</dt><dd>{item.students}</dd></div></dl><span className="mt-4 inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-700">{item.status}</span></div>)}</div>
      </main>
    </ProtectedPage>
  );
}
