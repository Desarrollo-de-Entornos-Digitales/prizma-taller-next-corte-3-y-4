'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Ghost } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLibrary } from '@/context/LibraryContext';
import GameCard from '@/common/components/GameCard';

export default function LibraryPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const { library, loading } = useLibrary();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Cargando...</span>
            </div>
        );
    }

    return (
        <div className="p-12 md:p-24 space-y-20 max-w-screen-2xl mx-auto bg-black text-white min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/10">
                <div className="space-y-3">
                    <h2 className="text-sm font-bold text-[#A1A1A1] uppercase tracking-[0.3em]">Workstation</h2>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">Biblioteca</h1>
                </div>
                <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest font-bold">
                    {library.length} {library.length === 1 ? 'juego' : 'juegos'}
                </p>
            </div>

            {/* Contenido */}
            {library.length === 0 ? (
                <div className="py-20 border border-dashed border-[#2C2C2C] flex flex-col items-center justify-center text-center space-y-4 rounded-[6px]">
                    <Ghost className="w-8 h-8 text-neutral-800 animate-bounce" />
                    <p className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[0.3em]">
                        No tienes juegos en tu biblioteca
                    </p>
                    <button
                        onClick={() => router.push('/feed')}
                        className="border border-[#2C2C2C] text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-[6px] hover:border-[#335bff] hover:text-white text-[#A1A1A1] transition-all"
                    >
                        Explorar juegos
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {library.map((entry) => {
                        if (!entry.game) return null;
                        return (
                            <GameCard
                                key={entry.id_library}
                                game={entry.game}
                                onClick={(id) => router.push(`/games/${id}`)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
