import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RainbowKit from '@/components/rainbowkit';
import { Toaster } from '@/components/ui/toaster';
import 'react-datepicker/dist/react-datepicker.css';
import { ThemeProvider } from '@/components/theme-provider';

const roboto = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'OctaSwap',
  description: 'OctaSwap Launchpad for your next project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={roboto.className}>
        <RainbowKit>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RainbowKit>
        <Toaster />
      </body>
    </html>
  );
}
