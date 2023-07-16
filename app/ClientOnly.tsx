'use client'

import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { SafeUser } from './types';

interface ClientOnlyProps {
  children?: React.ReactNode;
  currentUser?: SafeUser | null;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children, currentUser }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const session = currentUser
    ? {
        user: { ...currentUser },
        expires: (Math.floor(Date.now() / 1000) + 3600).toString(), 
      }
    : null;

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ClientOnly;
