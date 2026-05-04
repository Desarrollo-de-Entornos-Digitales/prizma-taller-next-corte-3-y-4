'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../../../context/AuthContext';
import CarouselSection from './components/CarouselSection';
import { filterByPlatform } from './utils/chunk';

import { getGames } from './services/game.service';

type TrendingGame = {
    id_game: number;
    title: string;
    genre: string;
    origin_platform: string;
    banner_url?: string;
};

export default function FeedPage() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [games, setGames] = useState<TrendingGame[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, authLoading, router]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getGames();
                setGames(data);
            } catch (err) {
                console.error('Error fetching games:', err);
            } finally {
                setLoading(false);
            }
        };

        void fetchGames();
    }, []);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Cargando...</span>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Banner Trending */}
            {games.length > 0 ? (
                <section className="relative h-[55vh] md:h-[70vh] w-full flex items-center border-b border-[#2C2C2C] overflow-hidden">
                    {games[0].banner_url ? (
                        <img
                            src={games[0].banner_url}
                            alt={games[0].title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#121212] to-[#335bff]/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                    <div className="relative px-8 md:px-24 z-20 max-w-xl">
                        <span className="text-[10px] text-[#335bff] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#335bff] inline-block" />
                            Trending Now
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold uppercase leading-[0.85] my-6 tracking-tighter">
                            {games[0].title}
                        </h2>
                        <div className="flex gap-8 mb-8">
                            <div>
                                <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Género</p>
                                <p className="text-white font-bold uppercase text-sm tracking-tight">{games[0].genre}</p>
                            </div>
                            <div>
                                <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Plataforma</p>
                                <p className="text-white font-bold uppercase text-sm tracking-tight">{games[0].origin_platform}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push(`/games/${games[0].id_game}`)}
                            className="bg-white text-black font-bold px-10 py-3.5 rounded-[6px] uppercase text-[11px] tracking-widest hover:bg-white/90 transition-all"
                        >
                            Explorar Juego
                        </button>
                    </div>
                </section>
            ) : (
                <div className="h-[55vh] flex items-center justify-center border-b border-[#2C2C2C]">
                    <div className="text-center space-y-4">
                        <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">
                            No hay juegos disponibles
                        </p>
                    </div>
                </div>
            )}

            {/* Carousels */}
            <div className="px-8 md:px-24 py-20 space-y-24 max-w-screen-2xl mx-auto">
                <CarouselSection
                    title="Todos"
                    games={games}
                    onGameClick={(id) => router.push(`/games/${id}`)}
                />
                <CarouselSection
                    title="PC"
                    games={filterByPlatform(games, 'PC')}
                    onGameClick={(id) => router.push(`/games/${id}`)}
                />
                <CarouselSection
                    title="Mobile"
                    games={filterByPlatform(games, 'Mobile')}
                    onGameClick={(id) => router.push(`/games/${id}`)}
                />
            </div>
        </div>
    );
}
