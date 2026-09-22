"use client";

import { FormEvent, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase';

type Props = {
  schoolId: string;
  studentId: string;
};

export default function ExamResultForm({ schoolId, studentId }: Props) {
  const [examId, setExamId] = useState('');
  const [subjectId, setSubjectId] = useState('subject_math');
  const [score, setScore] = useState('');
  const [teacherId, setTeacherId] = useState('teacher_001');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const publishExamResult = httpsCallable(functions, 'publishExamResult');
      const result = await publishExamResult({
        schoolId,
        studentId,
        examId,
        subjectId,
        score: Number(score),
        teacherId,
      });

      setMessage(`Result published successfully: ${(result.data as any).message}`);
      setExamId('');
      setScore('');
    } catch (error: any) {
      setMessage(error?.message || 'Unable to publish result');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Exam ID</label>
        <input
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="exam_001"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Subject ID</label>
        <input
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Score</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          min={0}
          max={100}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Teacher ID</label>
        <input
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-60"
      >
        {loading ? 'Publishing...' : 'Publish Result'}
      </button>

      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}
