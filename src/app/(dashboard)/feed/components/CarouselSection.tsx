'use client';

import { useState } from 'react';
import type { Game } from '@/types';

type CarouselSectionProps = {
    title: string;
    games: Game[];
    onGameClick: (id: number) => void;
};

const CARDS_PER_PAGE = 4;

export default function CarouselSection({ title, games, onGameClick }: CarouselSectionProps) {
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(games.length / CARDS_PER_PAGE);
    const visible = games.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

    if (games.length === 0) return null;

    return (
        <section className="space-y-8">
            {/* Header de sección */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-white">
                        {title}
                    </h3>
                    {/* Indicadores de página */}
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <span
                                key={i}
                                className={`h-0.5 transition-all duration-300 ${
                                    i === page ? 'w-6 bg-[#335bff]' : 'w-3 bg-[#2C2C2C]'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Botones prev/next */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="w-8 h-8 border border-[#2C2C2C] rounded-[6px] flex items-center justify-center text-[#A1A1A1] hover:border-[#335bff] hover:text-white disabled:opacity-30 transition-all"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={page === totalPages - 1}
                        className="w-8 h-8 border border-[#2C2C2C] rounded-[6px] flex items-center justify-center text-[#A1A1A1] hover:border-[#335bff] hover:text-white disabled:opacity-30 transition-all"
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Cards — GameCard se importará cuando esté listo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {visible.map((game) => (
                    <div
                        key={game.id_game}
                        onClick={() => onGameClick(game.id_game)}
                        className="cursor-pointer border border-[#2C2C2C] rounded-[6px] bg-[#121212] hover:border-[#335bff] hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                    >
                        {/* Imagen */}
                        <div className="h-40 w-full overflow-hidden bg-[#0A0A0A]">
                            {game.cover_url ? (
                                <img
                                    src={game.cover_url}
                                    alt={game.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Sin imagen</span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-4 space-y-1">
                            <p className="text-[#335bff] text-[10px] font-bold uppercase tracking-widest">
                                {game.origin_platform}
                            </p>
                            <p className="text-white font-bold uppercase tracking-tighter leading-none text-sm">
                                {game.title}
                            </p>
                            <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">
                                Género: {game.genre}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
