import { cn } from '@/lib/utils';
import Providers from '@/components/Providers';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/Toaster';
import { Roboto } from 'next/font/google';
import Footer from '@/components/Footer';

// import { YMInitializer } from 'react-yandex-metrika';
import Ym from '@/components/Ym';
import Script from 'next/script';

export const metadata = {
  title: 'GetSpy.ru ',
  description: 'Блог о программировании',
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
          <Script id="metrika-counter" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(95082773, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true
              });`}
          </Script>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}

          <div className="container  max-w-7xl mx-auto pt-6 min-h-[100vh]">
            {children}
          </div>
          <Footer />
        </Providers>
        <Toaster />

        <Ym />
      </body>
    </html>
  );
}
