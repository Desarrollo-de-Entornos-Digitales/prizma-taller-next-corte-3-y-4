'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Bell, Shield, Ghost } from 'lucide-react';

import type { Tournament, Announcement, Registration } from '@/types';
import { useAuth } from '@/context/AuthContext';

import {
    getTournamentById,
    getAnnouncements,
    getRegistrations,
    createRegistration,
} from '../services/tournament.service';

const statusStyles: Record<string, string> = {
    open: 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-400',
    in_progress: 'bg-amber-500/15 border border-amber-500/35 text-amber-400',
    closed: 'bg-red-500/15 border border-red-500/35 text-red-500',
};

export default function TournamentDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [t, allAnnouncements, allRegistrations] = await Promise.all([
                    getTournamentById(id),
                    getAnnouncements(),
                    isAuthenticated ? getRegistrations() : Promise.resolve([]),
                ]);
                setTournament(t);
                setAnnouncements(allAnnouncements.filter((a) => a.tournament_id === id));
                if (user) {
                    setIsRegistered(
                        (allRegistrations as Registration[]).some(
                            (r) => r.tournament_id === id && r.user_id === user.id_user,
                        ),
                    );
                }
            } catch {
                // silencioso
            } finally {
                setLoading(false);
            }
        };
        void fetch();
    }, [id, isAuthenticated, user]);

    const handleRegister = async () => {
        if (!user || !tournament) return;
        setRegistering(true);
        try {
            const tournamentId = tournament.id_tournament ?? (tournament as unknown as { id: string }).id;
            await createRegistration({ user_id: user.id_user ?? user.id, tournament_id: tournamentId });
            setIsRegistered(true);
        } catch {
            // silencioso
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Cargando...</span>
            </div>
        );
    }

    if (!tournament) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Torneo no encontrado</span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-20 bg-black text-white min-h-screen"
        >
            {/* Back bar */}
            <div className="bg-black/85 backdrop-blur sticky top-16 z-30 border-b border-[#2C2C2C] px-8 md:px-24 py-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#A1A1A1] hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 text-[#335bff]" />
                    <span>Volver a Torneos</span>
                </button>
            </div>

            {/* Hero */}
            <section className="relative h-[65vh] w-full flex items-end border-b border-[#2C2C2C] overflow-hidden bg-black">
                {tournament.banner_url && (
                    <img
                        src={tournament.banner_url}
                        alt={tournament.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
                <div className="relative w-full px-8 md:px-24 pb-16 z-20 max-w-2xl space-y-6">
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-[4px] ${statusStyles[tournament.status] ?? 'bg-neutral-800 text-neutral-400'}`}
                        >
                            {tournament.status}
                        </span>
                        <span className="text-[#A1A1A1] text-[10px] font-mono uppercase bg-white/5 py-1 px-3 border border-white/10 rounded">
                            {new Date(tournament.start_date).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
                        {tournament.name}
                    </h1>
                    <div className="flex flex-wrap gap-x-12 gap-y-4 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                            <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">
                                Entry Fee
                            </span>
                            <p className="text-xs font-mono font-bold text-[#335bff]">{tournament.points_cost} XP</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Cupos</span>
                            <p className="text-xs font-mono font-bold text-white">{tournament.max_slots}</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        {isRegistered ? (
                            <div className="w-fit bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-[6px] flex items-center gap-2">
                                <Check className="w-4 h-4" /> <span>✓ Inscrito</span>
                            </div>
                        ) : (
                            <button
                                onClick={() => void handleRegister()}
                                disabled={registering || tournament.status === 'closed'}
                                className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-[6px] hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {registering ? 'Inscribiendo...' : `Inscribirse por ${tournament.points_cost} XP`}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Contenido */}
            <div className="px-8 md:px-24 py-16 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-7 space-y-8">
                    <div className="border-b border-white/5 pb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#335bff]" />
                        <h3 className="text-lg font-bold uppercase tracking-wide">Reglamento</h3>
                    </div>
                    <div className="bg-[#121212] border border-[#2C2C2C] p-8 rounded-[6px]">
                        <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">
                            {tournament.rules}
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-8">
                    <div className="border-b border-white/5 pb-4 flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#335bff]" />
                        <h3 className="text-lg font-bold uppercase tracking-wide">Anuncios</h3>
                    </div>
                    {announcements.length === 0 ? (
                        <div className="p-8 border border-dashed border-[#2C2C2C] rounded-[6px] text-center space-y-2">
                            <Ghost className="w-5 h-5 mx-auto text-neutral-800" />
                            <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                                Sin anuncios aún
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {announcements.map((item) => (
                                <div
                                    key={item.id_announcement}
                                    className="p-6 border border-[#2C2C2C] rounded-[6px] bg-[#121212]/30 space-y-2 hover:border-neutral-700 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-xs font-bold uppercase tracking-tight text-white">
                                            {item.title}
                                        </h4>
                                        <span className="text-[8px] font-mono text-neutral-600 bg-white/5 px-1.5 py-0.5 rounded">
                                            {new Date(item.posted_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-neutral-400 leading-relaxed">{item.message}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
