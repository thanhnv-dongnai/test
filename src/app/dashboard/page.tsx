import Sidebar from '@/components/sidebar';
import ProtectedPage from '@/components/ProtectedPage';

const summaryCards = [
  { label: 'Total Students', value: '1,240', trend: '+8.2%' },
  { label: 'Total Teachers', value: '84', trend: '+3.1%' },
  { label: 'Outstanding Fees', value: '$42.5K', trend: '-2.4%' },
  { label: 'Attendance', value: '96.2%', trend: '+1.1%' },
];

const activity = [
  { title: 'New student admitted', detail: 'An Nguyen joined Grade 5A' },
  { title: 'Attendance submitted', detail: 'Grade 5A attendance is complete for today' },
  { title: 'Fee reminder sent', detail: 'Pending invoices reminder sent to parents' },
  { title: 'Exam published', detail: 'Mid-term results are now visible to teachers' },
];

export default function DashboardPage() {
  return (
    <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher', 'accountant', 'parent']}>
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Overview</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">School Dashboard</h1>
            </div>

            <div className="rounded-lg bg-white px-4 py-2 shadow-sm">
              <span className="text-sm text-slate-600">Academic year:</span>
              <span className="ml-2 font-semibold text-slate-900">2026-2027</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div key={card.label} className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{card.label}</p>
                <div className="mt-4 flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-slate-900">{card.value}</h3>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    {card.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Recent Activity</h2>

              <div className="space-y-4">
                {activity.map((item) => (
                  <div key={item.title} className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Quick Actions</h2>

              <div className="space-y-3">
                <button className="w-full rounded-md bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white hover:bg-blue-700">
                  Add New Student
                </button>
                <button className="w-full rounded-md bg-green-600 px-4 py-3 text-left text-sm font-medium text-white hover:bg-green-700">
                  Mark Attendance
                </button>
                <button className="w-full rounded-md bg-violet-600 px-4 py-3 text-left text-sm font-medium text-white hover:bg-violet-700">
                  Publish Exam
                </button>
                <button className="w-full rounded-md bg-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-300">
                  Send Notice
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedPage>
  );
}
