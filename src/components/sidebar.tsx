import Link from 'next/link';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/students', label: 'Students' },
  { href: '/teachers', label: 'Teachers' },
  { href: '/classes', label: 'Classes' },
  { href: '/attendance', label: 'Attendance' },
  { href: '/exams', label: 'Exams' },
  { href: '/fees', label: 'Fees' },
  { href: '/library', label: 'Library' },
  { href: '/payroll', label: 'Payroll' },
  { href: '/notices', label: 'Notices' },
  { href: '/parents', label: 'Parents' },
  { href: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-72 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-5">
        <h2 className="text-xl font-bold">K12 ERP</h2>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
          School System
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10 border-t border-slate-700 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">System</p>
        <div className="mt-3 space-y-2">
          <Link href="/reports" className="block text-sm text-slate-300 hover:text-white">
            Reports
          </Link>
          <Link href="/parent-portal" className="block text-sm text-slate-300 hover:text-white">
            Parent Portal
          </Link>
        </div>
      </div>
    </aside>
  );
}
