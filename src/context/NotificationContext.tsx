'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/axios/client';

type RawNotification = {
    id?: string;
    id_notification?: string;
    title: string;
    message: string;
    type: string;
    read: boolean;
    user_id: string;
};

type Notification = {
    id_notification: string;
    title: string;
    message: string;
    type: string;
    read: boolean;
    user_id: string;
};

type NotificationContextType = {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: string) => Promise<void>;
    refresh: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const { user, isAuthenticated } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotifications = async () => {
        if (!isAuthenticated || !user) return;
        const userId = user.id_user ?? (user as unknown as { id: string }).id;
        if (!userId) return;
        try {
            const { data } = await apiClient.get<RawNotification[]>(`/notifications/user/${userId}`);
            const list = Array.isArray(data) ? data : (data as { data?: RawNotification[] }).data ?? [];
            const normalized: Notification[] = list.map((n) => ({
                ...n,
                id_notification: n.id_notification ?? n.id ?? '',
            }));
            setNotifications(normalized);
        } catch {
            setNotifications([]);
        }
    };

    useEffect(() => {
        void fetchNotifications();
    }, [isAuthenticated, user]);

    const markAsRead = async (id: string): Promise<void> => {
        if (!id) return;
        try {
            await apiClient.post(`/notifications/${id}/mark-as-read`);
            setNotifications((prev) =>
                prev.map((n) => (n.id_notification === id ? { ...n, read: true } : n))
            );
        } catch {
            // silencioso
        }
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, refresh: fetchNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = (): NotificationContextType => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotifications must be used within a NotificationProvider');
    return ctx;
};
