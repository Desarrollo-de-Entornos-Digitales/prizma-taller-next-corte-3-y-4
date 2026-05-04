import type { Metadata } from 'next';

import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/common/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
    title: 'Prizma Gaming Platform',
    description: 'Plataforma de gaming — reseñas, juegos y comunidad',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className="min-h-screen bg-base-100">
                <AuthProvider>
                    <Navbar />
                    <main className="pt-16 min-h-screen bg-base-100">{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
