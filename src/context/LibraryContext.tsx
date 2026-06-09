'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserLibrary } from '@/types';
import apiClient from '@/lib/axios/client';
import { useAuth } from '@/context/AuthContext';

type LibraryContextType = {
    library: UserLibrary[];
    isInLibrary: (gameId: number) => boolean;
    addToLibrary: (gameId: number) => Promise<void>;
    removeFromLibrary: (libraryId: string) => Promise<void>;
    loading: boolean;
    refresh: () => Promise<void>;
};

const LibraryContext = createContext<LibraryContextType | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
    const { user, isAuthenticated } = useAuth();
    const [library, setLibrary] = useState<UserLibrary[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLibrary = async () => {
        if (!isAuthenticated || !user) return;
        setLoading(true);
        try {
            const { data } = await apiClient.get<UserLibrary[]>('/user-libraries');
            const list = Array.isArray(data) ? data : [];
            const mine = list.filter((entry) => entry.user_id === (user.id_user ?? user.id));
            setLibrary(mine);
        } catch {
            setLibrary([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchLibrary();
    }, [isAuthenticated, user]);

    const isInLibrary = (gameId: number): boolean =>
        library.some((entry) => entry.game_id === gameId);

    const addToLibrary = async (gameId: number): Promise<void> => {
        if (!user) return;
        await apiClient.post('/user-libraries', { game_id: gameId, user_id: user.id_user ?? user.id });
        await fetchLibrary();
    };

    const removeFromLibrary = async (libraryId: string): Promise<void> => {
        await apiClient.delete(`/user-libraries/${libraryId}`);
        setLibrary((prev) => prev.filter((e) => e.id_library !== libraryId));
    };

    return (
        <LibraryContext.Provider value={{ library, isInLibrary, addToLibrary, removeFromLibrary, loading, refresh: fetchLibrary }}>
            {children}
        </LibraryContext.Provider>
    );
}

export const useLibrary = (): LibraryContextType => {
    const ctx = useContext(LibraryContext);
    if (!ctx) throw new Error('useLibrary must be used within a LibraryProvider');
    return ctx;
};
