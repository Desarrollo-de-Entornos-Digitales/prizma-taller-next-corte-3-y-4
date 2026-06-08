'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserAvatar from '@/common/components/UserAvatar';
import NotificationBell from '@/common/components/NotificationBell';

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-black border-b border-[#2C2C2C]">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-24 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/feed" className="text-white font-bold text-xl uppercase tracking-tighter shrink-0">
                    Prizma
                </Link>

                {/* Nav Links desktop — solo si está autenticado */}
                {isAuthenticated && (
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/feed" className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors border-b border-transparent hover:border-[#335bff] pb-0.5">
                            Feed
                        </Link>
                        <Link href="/library" className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors border-b border-transparent hover:border-[#335bff] pb-0.5">
                            Biblioteca
                        </Link>
                        <Link href="/tournaments" className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors border-b border-transparent hover:border-[#335bff] pb-0.5">
                            Torneos
                        </Link>
                    </nav>
                )}

                {/* Sección derecha */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            {/* Barra de búsqueda — solo desktop */}
                            <div className="hidden md:flex items-center gap-2 bg-transparent border border-[#2C2C2C] rounded-[6px] px-3 py-1.5">
                                <svg className="w-3.5 h-3.5 text-[#A1A1A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input type="text" placeholder="Buscar..." className="bg-transparent text-[11px] text-[#A1A1A1] placeholder:text-[#A1A1A1] outline-none w-24" />
                            </div>

                            {/* Campana */}
                            <NotificationBell />

                            {/* Avatar */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="w-8 h-8 rounded-full bg-[#335bff] flex items-center justify-center text-white text-xs font-bold uppercase hover:opacity-80 transition-opacity"
                            >
                                {user?.name?.charAt(0) || 'U'}
                            </button>

                            {/* Hamburguesa — solo mobile */}
                            <button
                                onClick={() => setMobileMenuOpen((prev) => !prev)}
                                className="md:hidden p-2 text-[#A1A1A1] hover:text-white transition-colors"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors">
                                Iniciar Sesión
                            </Link>
                            <Link href="/register" className="text-[10px] font-bold uppercase tracking-widest bg-white text-black px-4 py-2 rounded-[6px] hover:bg-white/90 transition-all">
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {isAuthenticated && mobileMenuOpen && (
                <div className="md:hidden bg-black border-b border-[#2C2C2C] px-8 py-4 flex flex-col gap-4">
                    <Link href="/feed" onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors">Feed</Link>
                    <Link href="/library" onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors">Biblioteca</Link>
                    <Link href="/tournaments" onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] hover:text-white transition-colors">Torneos</Link>
                </div>
            )}

            {/* Sidebar Modal de Perfil */}
            {sidebarOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/85" onClick={() => setSidebarOpen(false)} />
                    <div className="fixed top-0 right-0 h-full w-80 z-50 bg-black border-l border-[#2C2C2C] flex flex-col">
                        <div className="flex items-center justify-between px-6 h-16 border-b border-[#2C2C2C] shrink-0">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">Perfil</span>
                            <button onClick={() => setSidebarOpen(false)} className="text-[#A1A1A1] hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="px-6 pt-8 pb-6 flex flex-col gap-4 border-b border-[#2C2C2C] shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="ring-2 ring-[#335bff] ring-offset-2 ring-offset-black rounded-full">
                                    <UserAvatar name={user?.name || 'U'} size="lg" />
                                </div>
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <p className="text-white font-bold text-base leading-tight truncate">{user?.name || 'Usuario'}</p>
                                    <p className="text-[#A1A1A1] text-[10px] truncate">{user?.email || ''}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#335bff]/10 border border-[#335bff]/30 rounded-[6px] px-3 py-1.5 w-fit">
                                <svg className="w-3 h-3 text-[#335bff]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-[#335bff] text-[10px] font-bold uppercase tracking-widest">
                                    {user?.total_points?.toLocaleString() || 0} XP
                                </span>
                            </div>
                        </div>

                        <div className="flex-1" />

                        <div className="px-6 pb-3 shrink-0">
                            <Link
                                href="/profile"
                                onClick={() => setSidebarOpen(false)}
                                className="w-full border border-[#2C2C2C] text-[#A1A1A1] text-[10px] font-bold uppercase tracking-widest py-3 rounded-[6px] hover:border-[#335bff] hover:text-white transition-all text-center block"
                            >
                                Ver Perfil Completo
                            </Link>
                        </div>

                        <div className="px-6 py-6 shrink-0">
                            <button
                                onClick={() => { logout(); setSidebarOpen(false); router.push('/login'); }}
                                className="w-full border border-[#2C2C2C] text-[#A1A1A1] text-[10px] font-bold uppercase tracking-widest py-3 rounded-[6px] hover:border-red-500/50 hover:text-red-400 transition-all"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
