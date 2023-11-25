import { Inter } from 'next/font/google';

import { Toaster } from 'sonner';

import { Navbar } from '@/components/navbar';
import { AuthProvider } from '@/providers/auth-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Heladeria - UDI',
    description: 'Sistema para crear ventas',
};

export default function RootLayout({ children }) {
    return (
        <html lang='es'>
            <body className={inter.className}>
                <AuthProvider>
                    <Navbar />
                    {children}
                    <Toaster richColors closeButton position='top-center' />
                </AuthProvider>
            </body>
        </html>
    );
}
