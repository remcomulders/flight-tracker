import './globals.css';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const neueFrutiger = localFont({
  src: [
    {
      path: './_fonts/NeueFrutigerBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './_fonts/NeueFrutigerMedium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './_fonts/NeueFrutigerLight.woff2',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--font-neue-frutiger',
});

export const metadata: Metadata = {
  title: 'Flight Tracker',
  description: 'Track your flights based on their airport.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${neueFrutiger.variable} light antialiased`}>{children}</body>
    </html>
  );
}
