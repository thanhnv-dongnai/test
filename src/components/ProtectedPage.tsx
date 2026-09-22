'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

type Props = {
  children: React.ReactNode;
  allowedRoles?: readonly string[];
};

export default function ProtectedPage({ children, allowedRoles = [] }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      try {
        const snapshot = await getDoc(doc(db, 'users', user.uid));
        if (!snapshot.exists()) {
          router.replace('/login');
          return;
        }

        const profile = snapshot.data();
        const active = profile.status === 'active';
        const roleAllowed = allowedRoles.length === 0 || allowedRoles.includes(profile.role);

        if (!active || !roleAllowed) {
          router.replace('/dashboard');
          return;
        }

        if (mounted) setAuthorized(true);
      } catch {
        router.replace('/login');
      } finally {
        if (mounted) setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [router, allowedRoles]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-700">Loading...</div>;
  }

  return authorized ? <>{children}</> : null;
}
