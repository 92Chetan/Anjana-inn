import type { Metadata } from 'next';
import '@/styles/globals.css';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { ThemeProvider } from '@/components/provider/theme-provider';
import Navbar from '@/components/layout/nav/Navbar';
import Footer from '@/components/layout/Footer';
import QueryProvider from '@/components/provider/QueryProvider';
import NextSessionProvider from '@/components/provider/SessionProvider';
import QuickContactModal from '@/components/contact/QuickContactModal';
import ToasterProvider from '@/components/provider/ToasterProvider';
import TermsModal from '@/components/utils/TermsModal';

export const metadata: Metadata = {
  title: 'Anjana inn',
  description: 'Find your room'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextSessionProvider>
            <ToasterProvider />
            <QueryProvider>
              <Navbar />
              <main className="flex-grow">{children}</main> <QuickContactModal />
              <Footer />
              <TermsModal />
            </QueryProvider>
          </NextSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
