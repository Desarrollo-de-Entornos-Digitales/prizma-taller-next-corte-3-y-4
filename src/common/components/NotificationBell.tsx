'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Ghost } from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';

export default function NotificationBell() {
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 border border-[#2C2C2C] rounded-full hover:border-white transition-colors relative"
            >
                <Bell className="w-4 h-4 text-[#A1A1A1] hover:text-white transition-colors" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#335bff] text-black text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-black animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-80 bg-[#0A0A0A] border border-[#2C2C2C] rounded-[6px] shadow-2xl z-[100] overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-[#2C2C2C] bg-neutral-950 flex justify-between items-center">
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Notificaciones</h4>
                                <p className="text-[8px] text-neutral-500 uppercase tracking-widest">Centro de alertas</p>
                            </div>
                            {unreadCount > 0 && (
                                <span className="text-[8px] font-bold text-[#335bff] uppercase bg-[#335bff]/10 border border-[#335bff]/20 py-0.5 px-2 rounded font-mono">
                                    {unreadCount} pendientes
                                </span>
                            )}
                        </div>

                        <div className="max-h-72 overflow-y-auto divide-y divide-[#2C2C2C]">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center space-y-2">
                                    <Ghost className="w-5 h-5 mx-auto text-neutral-800" />
                                    <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Sin alertas nuevas</p>
                                </div>
                            ) : (
                                notifications.map((notif, index) => (
                                    <div key={notif.id_notification ?? index}
                                        className={`p-5 flex flex-col gap-1 transition-colors hover:bg-neutral-900/40 relative ${!notif.read ? 'bg-neutral-950/20' : ''}`}>
                                        {!notif.read && (
                                            <span className="absolute left-2.5 top-6 w-1.5 h-1.5 bg-[#335bff] rounded-full" />
                                        )}
                                        <div className="flex justify-between items-start pl-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                                                {notif.title}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-[#A1A1A1] pl-2 line-clamp-2">{notif.message}</p>
                                        {!notif.read && (
                                            <div className="text-right pt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => void markAsRead(notif.id_notification)}
                                                    className="text-[8px] font-bold text-[#335bff] hover:underline uppercase tracking-widest"
                                                >
                                                    Marcar leída
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="px-6 py-3 border-t border-[#2C2C2C] bg-neutral-950 text-center">
                            <button type="button" onClick={() => setIsOpen(false)}
                                className="text-[9px] font-bold text-white hover:text-[#335bff] uppercase tracking-widest transition-colors">
                                Cerrar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
