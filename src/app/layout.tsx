import { Inter } from 'next/font/google';
import React from 'react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Book My Food Truck',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' style={{ height: '100%' }}>
      <body
        className={inter.className}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <main style={{ flex: 1 }}>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
