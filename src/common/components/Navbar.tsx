'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-black/95 backdrop-blur-md border-b border-[#2C2C2C]">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-24 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/feed" className="text-white font-bold text-xl uppercase tracking-tighter">
                    Prizma
                </Link>

                {/* Nav Links — solo si está autenticado */}
                {isAuthenticated && (
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/feed"
                            className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors border-b border-transparent hover:border-[#335bff] pb-0.5"
                        >
                            Feed
                        </Link>
                        <Link
                            href="/feed"
                            className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors"
                        >
                            Biblioteca
                        </Link>
                        <Link
                            href="/feed"
                            className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors"
                        >
                            Torneos
                        </Link>
                    </nav>
                )}

                {/* Placeholder derecha */}
                <p className="text-[#A1A1A1] text-[10px]">Avatar pendiente</p>
            </div>
        </header>
    );
}
