import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { LibraryProvider } from '@/context/LibraryContext';
import Navbar from '@/common/components/Navbar';
import './globals.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Prizma Gaming Platform',
    description: 'Plataforma de gaming — reseñas, juegos y comunidad',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" className={poppins.variable}>
            <body className="pt-16 min-h-screen bg-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <AuthProvider>
                    <LibraryProvider>
                        <Navbar />
                        <main>
                            {children}
                        </main>
                    </LibraryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
