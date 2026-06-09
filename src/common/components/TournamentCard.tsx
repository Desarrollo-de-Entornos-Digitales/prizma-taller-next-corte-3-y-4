'use client';

import type { Tournament } from '@/types';

type TournamentCardProps = {
    tournament: Tournament;
    onClick: (id: string) => void;
};

const statusStyles: Record<string, string> = {
    open: 'text-emerald-400',
    in_progress: 'text-amber-400',
    closed: 'text-red-400',
};

const statusLabels: Record<string, string> = {
    open: 'Inscripciones Abiertas',
    in_progress: 'En Progreso',
    closed: 'Cerrado',
};

export default function TournamentCard({ tournament, onClick }: TournamentCardProps) {
    return (
        <div
            onClick={() => onClick(tournament.id_tournament ?? (tournament as unknown as { id: string }).id)}
            className="overflow-hidden relative flex flex-col justify-between h-80 border border-[#2C2C2C] hover:border-[#335bff] hover:scale-[1.02] transition-all duration-500 bg-black rounded-[6px] cursor-pointer group"
        >
            {tournament.banner_url && (
                <img
                    src={tournament.banner_url}
                    alt={tournament.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

            <div className="relative z-20 p-8 space-y-2 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${statusStyles[tournament.status] ?? 'text-[#A1A1A1]'}`}
                    >
                        {statusLabels[tournament.status] ?? tournament.status}
                    </span>
                    <span className="text-[9px] text-[#A1A1A1] font-mono uppercase bg-white/5 px-2 py-1 rounded">
                        {new Date(tournament.start_date).toLocaleDateString()}
                    </span>
                </div>
                <h4 className="text-2xl font-bold uppercase tracking-tighter leading-none">{tournament.name}</h4>

                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                    <div className="space-y-1">
                        <p className="text-[9px] text-white/60 uppercase font-bold">Costo de entrada</p>
                        <p className="text-lg font-bold text-[#335bff] font-mono">{tournament.points_cost} XP</p>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-[9px] text-white/60 uppercase font-bold">Cupos</p>
                        <p className="text-sm font-bold font-mono">{tournament.max_slots}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
