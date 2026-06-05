'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Notification } from '@/types';
import apiClient from '@/lib/axios/client';
import { useAuth } from '@/context/AuthContext';

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
        try {
            const { data } = await apiClient.get<Notification[]>(`/notifications/user/${user.id_user}`);
            setNotifications(data);
        } catch {
            setNotifications([]);
        }
    };

    useEffect(() => {
        void fetchNotifications();
    }, [isAuthenticated, user]);

    const markAsRead = async (id: string): Promise<void> => {
        await apiClient.post(`/notifications/${id}/mark-as-read`);
        setNotifications((prev) =>
            prev.map((n) => (n.id_notification === id ? { ...n, read: true } : n))
        );
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