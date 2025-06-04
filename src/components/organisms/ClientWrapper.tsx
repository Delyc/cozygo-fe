'use client';

import { useEffect, useState } from 'react';
import { SocketProvider } from '@/context/SocketContext';
import { decodeToken } from '@/helpers/decodeToken';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = decodeToken(storedToken);
      if (decoded?.userId) {
        setUserId(decoded.userId);
      }
    }
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // wait for localStorage to load

  if (!userId) return <>{children}</>;

  return <SocketProvider userId={userId}>{children}</SocketProvider>;
}
