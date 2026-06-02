'use client';

import './globals.css';
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { LocaleProvider } from '../lib/locales/LocaleProvider';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="hu" suppressHydrationWarning>
      <head>
        <title>Platform Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
      </head>
      <body className={`${plusJakartaSans.variable} ${manrope.variable} font-body antialiased`}>
        <QueryClientProvider client={queryClient}>
          <LocaleProvider>
            {children}
          </LocaleProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
