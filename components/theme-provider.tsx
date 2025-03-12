"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true); // Ensures theme is set before rendering
    }, []);

    if (!mounted) {
        return <div className="opacity-0 fixed inset-0 bg-white dark:bg-black" />;
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
