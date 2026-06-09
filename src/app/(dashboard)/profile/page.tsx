'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { useLibrary } from '@/context/LibraryContext';
import GameCard from '@/common/components/GameCard';
import type { PointsHistory } from '@/types';
import { getPointsHistory } from './services/profile.service';

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const { notifications, markAsRead } = useNotifications();
    const { library } = useLibrary();
    const router = useRouter();

    const [pointsHistory, setPointsHistory] = useState<PointsHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) router.push('/login');
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (!user) return;
        const userId = user.id_user ?? user.id;
        if (!userId) return;
        const fetch = async () => {
            try {
                const ph = await getPointsHistory(userId);
                setPointsHistory(ph.slice(0, 10));
            } catch {
                // silencioso
            } finally {
                setLoading(false);
            }
        };
        void fetch();
    }, [user]);

    if (isLoading || loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Cargando...</span>
            </div>
        );
    }

    const unreadNotifications = notifications.filter((n) => !n.read);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 md:p-24 space-y-24 max-w-7xl mx-auto bg-black text-white min-h-screen"
        >
            {/* Header de identidad */}
            <header className="flex flex-col md:flex-row gap-12 items-center md:items-start pb-16 border-b border-white/5">
                <div className="w-32 h-32 rounded-full border-2 border-[#335bff] flex items-center justify-center bg-[#121212] text-4xl font-bold uppercase text-[#335bff]">
                    {user?.name?.charAt(0) ?? 'U'}
                </div>
                <div className="flex-1 text-center md:text-left space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
                            {user?.name}
                        </h1>
                        <p className="text-[#A1A1A1] text-xs uppercase font-bold tracking-[0.3em]">{user?.email}</p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-10 pt-4">
                        <div className="space-y-1">
                            <p className="text-[10px] text-[#A1A1A1] uppercase font-bold tracking-widest">Total XP</p>
                            <p className="text-2xl font-bold text-[#335bff] font-mono">
                                {user?.total_points?.toLocaleString() ?? 0} XP
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Estado</p>
                            <p className="text-xl font-bold uppercase text-emerald-400">{user?.account_status}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Biblioteca del usuario */}
            <section className="space-y-10">
                <h3 className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[0.3em] pb-4 border-b border-white/5">
                    Mi Biblioteca ({library.length} {library.length === 1 ? 'juego' : 'juegos'})
                </h3>
                {library.length === 0 ? (
                    <div className="py-12 border border-dashed border-[#2C2C2C] rounded-[6px] flex flex-col items-center justify-center space-y-3">
                        <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest font-bold">Tu biblioteca está vacía</p>
                        <button
                            onClick={() => router.push('/feed')}
                            className="text-[9px] font-bold uppercase tracking-widest text-[#335bff] hover:underline"
                        >
                            Explorar juegos
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {library.map((entry) => {
                            if (!entry.game) return null;
                            return (
                                <div key={entry.id_library} className="shrink-0 w-64">
                                    <GameCard
                                        game={entry.game}
                                        onClick={(id) => router.push(`/games/${id ?? entry.game_id}`)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Historial de XP */}
            <section className="space-y-8">
                <h3 className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[0.3em] pb-4 border-b border-white/5">
                    Historial de XP (últimos 10)
                </h3>
                {pointsHistory.length === 0 ? (
                    <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Sin movimientos aún</p>
                ) : (
                    <div className="space-y-3">
                        {pointsHistory.map((ph) => (
                            <div key={ph.id_movement}
                                className="flex justify-between items-center p-4 border border-[#2C2C2C] rounded-md bg-[#121212]/30 hover:border-neutral-700 transition-colors">
                                <div>
                                    <p className="text-xs font-bold uppercase text-white">{ph.reason}</p>
                                    <p className="text-[9px] text-[#A1A1A1] uppercase tracking-widest">{ph.type}</p>
                                </div>
                                <span className={`text-sm font-bold font-mono ${ph.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {ph.amount >= 0 ? '+' : ''}{ph.amount} XP
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Notificaciones pendientes */}
            {unreadNotifications.length > 0 && (
                <section className="space-y-8">
                    <h3 className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[0.3em] pb-4 border-b border-white/5">
                        Notificaciones Pendientes ({unreadNotifications.length})
                    </h3>
                    <div className="space-y-3">
                        {unreadNotifications.map((n) => (
                            <div key={n.id_notification}
                                className="flex justify-between items-start p-4 border border-[#335bff]/30 rounded-md bg-[#335bff]/5">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold uppercase text-white">{n.title}</p>
                                    <p className="text-[10px] text-[#A1A1A1]">{n.message}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => void markAsRead(n.id_notification)}
                                    className="text-[9px] font-bold text-[#335bff] hover:underline uppercase tracking-widest shrink-0 ml-4"
                                >
                                    Leída
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </motion.div>
    );
}
