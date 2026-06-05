'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import type { ExternalAccount, Platform, PointsHistory } from '@/types';
import {
    getPlatforms,
    getExternalAccounts,
    linkExternalAccount,
    unlinkExternalAccount,
    getPointsHistory,
} from './services/profile.service';

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const { notifications, markAsRead } = useNotifications();
    const router = useRouter();

    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [accounts, setAccounts] = useState<ExternalAccount[]>([]);
    const [pointsHistory, setPointsHistory] = useState<PointsHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) router.push('/login');
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (!user) return;
        const fetch = async () => {
            try {
                const [p, a, ph] = await Promise.all([
                    getPlatforms(),
                    getExternalAccounts(),
                    getPointsHistory(user.id_user),
                ]);
                setPlatforms(p);
                setAccounts(a.filter((acc) => acc.user_id === user.id_user));
                setPointsHistory(ph.slice(0, 10));
            } catch {
                // silencioso
            } finally {
                setLoading(false);
            }
        };
        void fetch();
    }, [user]);

    const isLinked = (platformId: string) =>
        accounts.some((a) => a.platform_id === platformId);

    const getAccount = (platformId: string) =>
        accounts.find((a) => a.platform_id === platformId);

    const handleUnlink = async (platformId: string) => {
        const account = getAccount(platformId);
        if (!account) return;
        await unlinkExternalAccount(account.id_external_account);
        setAccounts((prev) => prev.filter((a) => a.id_external_account !== account.id_external_account));
    };

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
            className="p-12 md:p-24 space-y-24 max-w-screen-xl mx-auto bg-black text-white min-h-screen"
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

            {/* Plataformas externas */}
            <section className="space-y-10">
                <h3 className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[0.3em] pb-4 border-b border-white/5">
                    Sincronización de Plataformas
                </h3>
                {platforms.length === 0 ? (
                    <p className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">No hay plataformas disponibles</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {platforms.map((p) => {
                            const linked = isLinked(p.id_platform);
                            return (
                                <div key={p.id_platform}
                                    className="p-8 border border-[#2C2C2C] rounded-[6px] bg-[#121212]/30 flex flex-col justify-between h-44 hover:border-[#335bff] transition-colors">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-lg uppercase tracking-tight">{p.name}</h4>
                                        {linked ? (
                                            <span className="text-emerald-400 flex items-center gap-1 text-[8px] uppercase font-bold tracking-widest bg-emerald-500/5 px-2 py-1 border border-emerald-500/20 rounded">
                                                <CheckCircle2 className="w-3 h-3" /> Activo
                                            </span>
                                        ) : (
                                            <span className="text-[#A1A1A1] text-[8px] uppercase font-bold tracking-widest bg-white/5 px-2 py-1 rounded">
                                                Desconectado
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[#A1A1A1] text-[10px] line-clamp-2">{p.description}</p>
                                    <button
                                        type="button"
                                        onClick={() => linked ? void handleUnlink(p.id_platform) : undefined}
                                        className="text-[9px] font-bold uppercase tracking-widest text-[#335bff] hover:underline flex items-center gap-1"
                                    >
                                        <LinkIcon className="w-3 h-3" />
                                        {linked ? 'Desvincular' : 'Vincular'}
                                    </button>
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
                                className="flex justify-between items-center p-4 border border-[#2C2C2C] rounded-[6px] bg-[#121212]/30 hover:border-neutral-700 transition-colors">
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
                                className="flex justify-between items-start p-4 border border-[#335bff]/30 rounded-[6px] bg-[#335bff]/5">
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
