'use client';

import type { Game } from '@/types';

type GameCardProps = {
    game: Game;
    onClick: (id: number) => void;
};

export default function GameCard({ game, onClick }: GameCardProps) {
    return (
        <div
            onClick={() => onClick(game.id_game)}
            className="cursor-pointer group border border-[#2C2C2C] rounded-[6px] bg-[#121212] hover:border-[#335bff] hover:scale-[1.02] transition-all duration-300 overflow-hidden min-w-[280px] h-80 flex flex-col"
        >
            <div className="relative flex-1 overflow-hidden bg-[#0A0A0A]">
                {game.cover_url ? (
                    <img
                        src={game.cover_url}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-end justify-start p-4 bg-gradient-to-br from-[#0A0A0A] to-[#121212]">
                        <div className="flex flex-col items-end gap-1">
                            <p className="text-[#335bff] text-[10px] font-bold uppercase tracking-[0.3em]">
                                Prizma System
                            </p>
                            <p className="text-[#A1A1A1] text-xs font-bold uppercase tracking-tighter text-right">
                                {game.title}
                            </p>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
            </div>

            <div className="p-4 flex items-end justify-between gap-2 bg-[#121212]">
                <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-[#335bff] text-[10px] font-bold uppercase tracking-widest truncate">
                        {game.origin_platform}
                    </p>
                    <p className="text-white font-bold uppercase tracking-tighter leading-none text-base truncate">
                        {game.title}
                    </p>
                    <div className="flex flex-col gap-0.5 mt-1">
                        <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Género</p>
                        <p className="text-white text-[11px] font-bold uppercase tracking-tight truncate">
                            {game.genre}
                        </p>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(game.id_game);
                    }}
                    className="shrink-0 border border-[#2C2C2C] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-[6px] hover:border-[#335bff] hover:bg-[#335bff]/10 transition-all"
                >
                    Jugar
                </button>
            </div>
        </div>
    );
}
