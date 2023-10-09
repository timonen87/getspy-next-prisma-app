import { cn } from '@/lib/utils';
import Providers from '@/components/Providers';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/Toaster';
import { Roboto } from 'next/font/google';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'GetSpy.ru',
  description: 'GetSpy.ru',
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={cn(
        'bg-white text-slate-900 antialiased light',
        roboto.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}

          <div className="container max-w-7xl mx-auto pt-6 min-h-[80vh]">
            {children}
          </div>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
