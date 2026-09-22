"use client";

import { FormEvent, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase';

type Props = {
  schoolId: string;
  studentId: string;
};

export default function PaymentForm({ schoolId, studentId }: Props) {
  const [invoiceId, setInvoiceId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank_transfer');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const processPayment = httpsCallable(functions, 'processPayment');
      const result = await processPayment({
        schoolId,
        studentId,
        invoiceId,
        amount: Number(amount),
        method,
        referenceNumber,
      });

      setMessage(`Payment recorded successfully: ${(result.data as any).message}`);
      setInvoiceId('');
      setAmount('');
      setReferenceNumber('');
    } catch (error: any) {
      setMessage(error?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Invoice ID</label>
        <input
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="invoice_001"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="1000000"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        >
          <option value="bank_transfer">Bank Transfer</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="mobile_wallet">Mobile Wallet</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Reference Number</label>
        <input
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="BANK-12345"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white disabled:opacity-60"
      >
        {loading ? 'Processing...' : 'Record Payment'}
      </button>

      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}
