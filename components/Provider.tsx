'use client'
import { ProviderProps } from '@/types';
import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }: ProviderProps) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider;