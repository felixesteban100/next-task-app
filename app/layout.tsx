import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    template: '%s | Task App',
    default: 'Task App',
  },
  description: 'App for tracking my daily activities.',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  icons: {
    icon: "https://img.icons8.com/?size=100&id=KBhpl0Y7pupX&format=png&color=000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex flex-col gap-10 w-[98vw]">
              <Navbar />
              <div className="flex flex-col gap-2 mt-10 py-10 justify-center items-center mb-10">
                {children}
              </div>
            </main>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
