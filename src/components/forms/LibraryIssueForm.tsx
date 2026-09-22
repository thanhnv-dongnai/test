"use client";

import { FormEvent, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase';

type Props = {
  schoolId: string;
  studentId: string;
};

export default function LibraryIssueForm({ schoolId, studentId }: Props) {
  const [bookId, setBookId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const issueBook = httpsCallable(functions, 'issueLibraryBook');
      const result = await issueBook({
        schoolId,
        studentId,
        bookId,
        dueDate,
      });

      setMessage(`Book issued successfully: ${(result.data as any).message}`);
      setBookId('');
      setDueDate('');
    } catch (error: any) {
      setMessage(error?.message || 'Unable to issue book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Book ID</label>
        <input
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="book_001"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-violet-600 px-4 py-2 font-medium text-white disabled:opacity-60"
      >
        {loading ? 'Processing...' : 'Issue Book'}
      </button>

      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}
