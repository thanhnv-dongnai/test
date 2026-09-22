'use client';

import { FormEvent, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import ProtectedPage from '@/components/ProtectedPage';
import { functions } from '@/lib/firebase';

export default function AdmissionsPage() {
  const [form, setForm] = useState({ studentCode: '', firstName: '', lastName: '', gradeLevel: '', dateOfBirth: '', admissionDate: '' });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setMessage('');
    try {
      const createStudent = httpsCallable(functions, 'createStudentRecord');
      await createStudent({ schoolId: 'sch_001', ...form });
      setMessage('Admission created successfully.');
      setForm({ studentCode: '', firstName: '', lastName: '', gradeLevel: '', dateOfBirth: '', admissionDate: '' });
    } catch (error: any) { setMessage(error?.message || 'Unable to create admission.'); } finally { setSaving(false); }
  };

  return <ProtectedPage allowedRoles={['school_admin', 'receptionist']}><main className="p-8"><h1 className="mb-6 text-2xl font-bold">New Admission</h1><form onSubmit={submit} className="max-w-3xl space-y-6 rounded-xl bg-white p-6 shadow-sm"><div className="grid gap-4 md:grid-cols-2">{Object.entries(form).map(([key, value]) => <label key={key} className="text-sm font-medium"><span className="mb-1 block capitalize">{key.replace(/([A-Z])/g, ' $1')}</span><input required value={value} type={key.includes('Date') ? 'date' : 'text'} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} className="w-full rounded-md border border-slate-300 px-3 py-2" /></label>)}</div><button disabled={saving} className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white disabled:opacity-60">{saving ? 'Saving...' : 'Create admission'}</button>{message && <p className="text-sm text-slate-600">{message}</p>}</form></main></ProtectedPage>;
}
