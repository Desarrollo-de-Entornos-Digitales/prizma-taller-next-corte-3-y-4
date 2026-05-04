'use client';

import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

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

                {/* Sección derecha */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            {/* Barra de búsqueda */}
                            <div className="hidden md:flex items-center gap-2 bg-transparent border border-[#2C2C2C] rounded-[6px] px-3 py-1.5">
                                <svg
                                    className="w-3.5 h-3.5 text-[#A1A1A1]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="bg-transparent text-[11px] text-[#A1A1A1] placeholder:text-[#A1A1A1] outline-none w-24"
                                />
                            </div>

                            {/* Avatar placeholder — sidebar se agrega luego */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="w-8 h-8 rounded-full bg-[#335bff] flex items-center justify-center text-white text-xs font-bold uppercase hover:opacity-80 transition-opacity"
                            >
                                {user?.name?.charAt(0) || 'U'}
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register"
                                className="text-[10px] font-bold uppercase tracking-widest bg-white text-black px-4 py-2 rounded-[6px] hover:bg-white/90 transition-all"
                            >
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {/* Sidebar Modal de Perfil */}
            {sidebarOpen && (
                <>
                    {/* Overlay con blur */}
                    <div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />

                    {/* Panel lateral */}
                    <div className="fixed top-0 right-0 h-full w-80 z-50 bg-[#0A0A0A] border-l border-[#2C2C2C] p-12 flex flex-col gap-8">
                        {/* Cerrar */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="self-end text-[#A1A1A1] hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        {/* Info usuario */}
                        <div className="flex flex-col gap-2">
                            <div className="w-12 h-12 rounded-full bg-[#335bff] flex items-center justify-center text-white text-lg font-bold uppercase">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <p className="text-white font-bold uppercase tracking-tighter text-xl mt-2">
                                {user?.name || 'Usuario'}
                            </p>
                            <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">{user?.email || ''}</p>
                            <p className="text-[#335bff] text-[10px] font-bold uppercase tracking-widest mt-1">
                                {user?.total_points || 0} XP
                            </p>
                        </div>
                        {/* Divider */}
                        <div className="border-t border-[#2C2C2C]" />
                        {/* Mini biblioteca placeholder */}
                        <div className="flex flex-col gap-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">
                                Mi Biblioteca
                            </p>
                            <p className="text-[#A1A1A1] text-xs">Sin juegos aún</p>
                        </div>
                        {/* Spacer */}
                        <div className="flex-1" />
                        {/* Logout */}
                        <button
                            onClick={() => {
                                logout();
                                setSidebarOpen(false);
                                router.push('/login');
                            }}
                            className="w-full border border-[#2C2C2C] text-[#A1A1A1] text-[10px] font-bold uppercase tracking-widest py-3 rounded-[6px] hover:border-red-500/50 hover:text-red-400 transition-all"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </>
            )}
        </header>
    );
}
