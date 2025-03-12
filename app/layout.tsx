import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: {
    template: '%s | Task App',
    default: 'Task App',
  },
  description: 'App for tracking my daily activities.',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  // icons: {
  //   icon: 'https://cdn-icons-png.flaticon.com/512/2098/2098402.png',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
