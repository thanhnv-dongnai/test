import ProtectedPage from '@/components/ProtectedPage';

const books = [{ code: 'LIB-001', title: 'Science Explorer', borrower: 'An Nguyen', due: '27 Sep 2026', status: 'Issued' }, { code: 'LIB-002', title: 'English Grammar', borrower: 'Available', due: '-', status: 'Available' }];

export default function LibraryPage() {
  return <ProtectedPage allowedRoles={['school_admin', 'librarian']}><main className="p-8"><h1 className="mb-6 text-2xl font-bold">Library</h1><div className="overflow-hidden rounded-xl bg-white shadow-sm"><table className="min-w-full text-left"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Title</th><th className="px-4 py-3">Borrower</th><th className="px-4 py-3">Due date</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{books.map((book) => <tr key={book.code} className="border-t"><td className="px-4 py-3">{book.code}</td><td className="px-4 py-3">{book.title}</td><td className="px-4 py-3">{book.borrower}</td><td className="px-4 py-3">{book.due}</td><td className="px-4 py-3">{book.status}</td></tr>)}</tbody></table></div></main></ProtectedPage>;
}
