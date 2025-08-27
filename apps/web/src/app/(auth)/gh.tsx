'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to login page by default
        router.replace('/log-in');
    }, [router]);

    return null; // No need to render anything as we're redirecting
}
