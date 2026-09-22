import ProtectedPage from '@/components/ProtectedPage';
import { getStudentDetail, getStudentInvoices, getStudentResults } from '@/services/student-detail.service';
import PaymentForm from '@/components/forms/PaymentForm';
import ExamResultForm from '@/components/forms/ExamResultForm';
import LibraryIssueForm from '@/components/forms/LibraryIssueForm';

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const schoolId = 'sch_001';
  const student = await getStudentDetail(schoolId, params.id);

  if (!student) {
    return (
      <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher']}>
        <main className="p-8">
          <h1 className="text-2xl font-bold">Student not found</h1>
        </main>
      </ProtectedPage>
    );
  }

  const invoices = await getStudentInvoices(schoolId, params.id);
  const results = await getStudentResults(schoolId, params.id);

  return (
    <ProtectedPage allowedRoles={['school_admin', 'academic_admin', 'teacher', 'accountant']}>
      <main className="space-y-8 p-8">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-500">Student Profile</p>
              <h1 className="mt-2 text-3xl font-bold">
                {student.fullName || `${student.firstName} ${student.lastName}`}
              </h1>
            </div>

            <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              {student.status}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Student Code</p>
              <p className="mt-1 font-medium">{student.studentCode}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Grade</p>
              <p className="mt-1 font-medium">{student.gradeLevel}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Date of Birth</p>
              <p className="mt-1 font-medium">{student.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="mt-1 font-medium">{student.phone || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-1 font-medium">{student.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Address</p>
              <p className="mt-1 font-medium">{student.address || '-'}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-2">
            <h2 className="mb-4 text-xl font-bold">Recent Results</h2>

            <table className="min-w-full text-left">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3">Exam</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Grade</th>
                </tr>
              </thead>

              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                      No results available
                    </td>
                  </tr>
                ) : (
                  results.map((item: any) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-4 py-3">{item.examId}</td>
                      <td className="px-4 py-3">{item.subjectId}</td>
                      <td className="px-4 py-3">{item.score}</td>
                      <td className="px-4 py-3">{item.grade}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Invoices</h2>

            {invoices.length === 0 ? (
              <p className="text-slate-500">No invoices found</p>
            ) : (
              <div className="space-y-3">
                {invoices.map((invoice: any) => (
                  <div key={invoice.id} className="rounded-lg border border-slate-200 p-3">
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Total: {invoice.total} • Balance: {invoice.balance}
                    </p>
                    <p className="mt-1 text-xs uppercase text-slate-500">{invoice.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Payment</h2>
            <PaymentForm schoolId={schoolId} studentId={params.id} />
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Exam Result</h2>
            <ExamResultForm schoolId={schoolId} studentId={params.id} />
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Library Issue</h2>
            <LibraryIssueForm schoolId={schoolId} studentId={params.id} />
          </div>
        </section>
      </main>
    </ProtectedPage>
  );
}
