import apiClient from '@/lib/axios/client';
import type { LoginDto, AuthResponse, User } from '@/types';

export const loginUser = async (credentials: LoginDto): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return data;
};

export const getUserByEmail = async (email: string): Promise<User> => {
    const { data } = await apiClient.get<User>(`/users/email/${email}`);
    return data;
};