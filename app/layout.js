import { Inter } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/navbar';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Heladeria - UDI',
    description: 'Sistema para crear ventas',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Navbar />
                {children}
                <Toaster richColors />
            </body>
        </html>
    );
}
