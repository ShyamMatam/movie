'use client'

import { ThemeProvider } from 'next-themes';
import { MediaProvider } from '@/contexts/MediaContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import Loading from './loading';

export default function RootLayout({ children }) {  
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <MediaProvider>
            <div className="bg-white dark:bg-gray-800 text-black dark:text-white white:text-black">
            <Navbar />
            <main className="container mx-auto py-8 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </MediaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
