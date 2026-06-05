'use client';

import { useMemo } from 'react';

import type { AuthUser } from '@/types';

export type AuthState = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

export function useAuth(): AuthState {
    return useMemo(
        () => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        }),
        [],
    );
}
