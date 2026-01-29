// hooks/useTabAndInactivityRedirect.ts
'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Options {
    inactivityTimeoutMs?: number;   // e.g. 120_000 = 2 minutes
    redirectTo?: string;            // default '/'
    enabled?: boolean;
    showCountdown?: boolean;        // optional UI countdown
}

export function useTabAndInactivityRedirect({
    inactivityTimeoutMs = 120_000,   // 2 minutes
    redirectTo = '/',
    enabled = true,
    showCountdown = false,
}: Options = {}) {
    const router = useRouter();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastActivityRef = useRef(Date.now());
    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Reset inactivity timer
    const resetInactivityTimer = () => {
        if (!enabled) return;

        lastActivityRef.current = Date.now();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            router.replace(redirectTo);
        }, inactivityTimeoutMs);
    };

    // Handle tab visibility change
    const handleVisibilityChange = () => {
        if (!enabled) return;

        if (document.visibilityState === 'hidden') {
            // Tab hidden → redirect immediately
            router.replace(redirectTo);
        } else {
            // Tab visible again → reset inactivity timer
            resetInactivityTimer();
        }
    };

    // Update countdown display (optional)
    const updateCountdown = () => {
        if (!showCountdown) return;

        const timeLeft = Math.max(
            0,
            Math.round((inactivityTimeoutMs - (Date.now() - lastActivityRef.current)) / 1000)
        );

        const el = document.getElementById('inactivity-countdown');
        if (el) {
            el.textContent = `Redirect in ${timeLeft}s (stay active)`;
        }
    };

    useEffect(() => {
        if (!enabled) return;

        // Reset on mount
        resetInactivityTimer();

        // Activity listeners (mouse, keyboard, touch, scroll)
        const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll', 'click'];
        const onActivity = () => resetInactivityTimer();

        events.forEach(evt => {
            window.addEventListener(evt, onActivity, { passive: true });
        });

        // Tab visibility listener
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Optional countdown
        if (showCountdown) {
            countdownIntervalRef.current = setInterval(updateCountdown, 1000);
            updateCountdown();
        }

        // Cleanup
        return () => {
            events.forEach(evt => window.removeEventListener(evt, onActivity));
            document.removeEventListener('visibilitychange', handleVisibilityChange);

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        };
    }, [enabled, inactivityTimeoutMs, redirectTo]);
}