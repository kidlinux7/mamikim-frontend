import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { UserProvider } from "@/components/UserProvider";
import UpcomingEventRibbon from "@/components/UpcomingEventRibbon";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mamikim Academy',
  description: 'Baking and culinary arts courses to empower learners worldwide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" sizes='10px' />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
          <div className="flex flex-col min-h-screen">
              <UpcomingEventRibbon />
            <NavBar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
            <ChatWidget />
          </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}