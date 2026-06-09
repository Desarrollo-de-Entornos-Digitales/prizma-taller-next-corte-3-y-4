import apiClient from '@/lib/axios/client';
import type { User, ExternalAccount, Platform, PointsHistory } from '@/types';

export const updateUser = async (id: string, dto: { name?: string }): Promise<User> => {
    const { data } = await apiClient.put<User>(`/users/${id}`, dto);
    return data;
};

export const getPlatforms = async (): Promise<Platform[]> => {
    const { data } = await apiClient.get('/platforms');
    return Array.isArray(data) ? data : [];
};

export const getExternalAccounts = async (): Promise<ExternalAccount[]> => {
    const { data } = await apiClient.get('/external-accounts');
    return Array.isArray(data) ? data : [];
};

export const linkExternalAccount = async (dto: {
    external_user_id: string;
    platform_id: string;
    user_id: string;
}): Promise<ExternalAccount> => {
    const { data } = await apiClient.post<ExternalAccount>('/external-accounts', {
        ...dto,
        connection_status: 'active',
        linked_at: new Date().toISOString(),
    });
    return data;
};

export const unlinkExternalAccount = async (id: string): Promise<void> => {
    await apiClient.delete(`/external-accounts/${id}`);
};

export const getPointsHistory = async (userId: string): Promise<PointsHistory[]> => {
    const { data } = await apiClient.get(`/points-history/user/${userId}`);
    return Array.isArray(data) ? data : [];
};
