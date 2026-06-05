'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

import { getTournaments } from './services/tournament.service';

import type { Tournament } from '@/types';
import { useAuth } from '@/context/AuthContext';
import TournamentCard from '@/common/components/TournamentCard';

type StatusFilter = 'all' | 'open' | 'in_progress' | 'closed';

export default function TournamentsPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [filter, setFilter] = useState<StatusFilter>('all');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) router.push('/login');
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getTournaments();
                setTournaments(data);
            } catch {
                // silencioso
            } finally {
                setLoading(false);
            }
        };
        void fetch();
    }, []);

    const filtered = filter === 'all' ? tournaments : tournaments.filter((t) => t.status === filter);
    const tabs: { key: StatusFilter; label: string }[] = [
        { key: 'all', label: 'Todos' },
        { key: 'open', label: 'Abiertos' },
        { key: 'in_progress', label: 'En Curso' },
        { key: 'closed', label: 'Cerrados' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-20 pb-20 bg-black text-white min-h-screen"
        >
            {/* Hero Banner */}
            <section className="h-[60vh] md:h-[75vh] relative flex items-center border-b border-[#2C2C2C] overflow-hidden bg-black">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1920"
                        className="w-full h-full object-cover"
                        alt="Tournaments"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
                </div>
                <div className="relative w-full px-8 md:px-24 z-20">
                    <div className="max-w-xl space-y-8">
                        <span className="text-[#335bff] text-[11px] font-bold uppercase tracking-[0.4em]">
                            Global Circuit
                        </span>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">
                            Domina el Escenario <br /> Profesional
                        </h2>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => router.push('/tournaments/create')}
                                className="border border-[#2C2C2C] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 rounded-[6px] hover:border-[#335bff] hover:text-[#335bff] transition-all flex items-center gap-2 bg-black/45"
                            >
                                <Plus className="w-3.5 h-3.5 text-[#335bff]" />
                                <span>Crear Torneo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtros + Grid */}
            <div className="px-8 md:px-24 space-y-12 max-w-screen-xl mx-auto">
                {/* Tabs de filtro */}
                <div className="flex gap-2 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-[6px] border transition-all ${
                                filter === tab.key
                                    ? 'bg-white text-black border-white'
                                    : 'border-[#2C2C2C] text-[#A1A1A1] hover:border-[#335bff] hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Cargando...</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 border border-dashed border-[#2C2C2C] rounded-[6px] flex flex-col items-center justify-center space-y-4">
                        <p className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[0.3em]">
                            No hay torneos en esta categoría
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {filtered.map((t) => (
                            <TournamentCard
                                key={t.id_tournament}
                                tournament={t}
                                onClick={(id) => router.push(`/tournaments/${id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
