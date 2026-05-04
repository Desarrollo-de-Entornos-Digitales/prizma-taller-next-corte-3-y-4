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

                {/* Placeholder nav links */}
                <p className="text-[#A1A1A1] text-[10px]">Links pendientes</p>

                {/* Placeholder derecha */}
                <p className="text-[#A1A1A1] text-[10px]">Avatar pendiente</p>
            </div>
        </header>
    );
}
