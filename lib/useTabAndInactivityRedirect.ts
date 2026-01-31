// hooks/useTabAndInactivityRedirect.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface InactivityOptions {
    inactivityTimeoutMs?: number;
    redirectTo?: string;
    enabled?: boolean;
    disabled?: boolean;
    onBeforeRedirect?: () => Promise<void> | void;  // ← NEW: runs before redirect
}

export function useTabAndInactivityRedirect({
    inactivityTimeoutMs = 120_000,
    redirectTo = '/',
    enabled = true,
    disabled = false,
    onBeforeRedirect,
}: InactivityOptions = {}) {
    const router = useRouter();

    useEffect(() => {
        if (!enabled || disabled) return;

        let inactivityTimer: NodeJS.Timeout | null = null;

        const redirect = async () => {
            if (onBeforeRedirect) {
                try {
                    await onBeforeRedirect();  // Wait for save to complete
                } catch (err) {
                    console.error("Auto-save failed before redirect:", err);
                    // Optional: show toast error here
                }
            }
            router.replace(redirectTo);
        };

        const resetTimer = () => {
            if (inactivityTimer) clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(redirect, inactivityTimeoutMs);
        };

        const onActivity = () => resetTimer();

        const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll', 'click'];
        events.forEach(evt => window.addEventListener(evt, onActivity, { passive: true }));

        const handleVisibility = () => {
            if (document.visibilityState === 'hidden') {
                redirect();  // Immediate redirect on tab leave
            } else {
                resetTimer();
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        resetTimer();

        return () => {
            events.forEach(evt => window.removeEventListener(evt, onActivity));
            document.removeEventListener('visibilitychange', handleVisibility);
            if (inactivityTimer) clearTimeout(inactivityTimer);
        };
    }, [enabled, disabled, inactivityTimeoutMs, redirectTo, router, onBeforeRedirect]);
}