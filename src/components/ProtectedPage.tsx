"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedPage({ children, allowedRoles = [] }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          router.push('/login');
          return;
        }

        const userData = userSnap.data();

        if (allowedRoles.length > 0 && !allowedRoles.includes(userData.role)) {
          router.push('/dashboard');
          return;
        }

        setAuthorized(true);
      } catch (error) {
        router.push('/login');
        return;
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-700">
        Loading...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
