import apiClient from '@/lib/axios/client';
import type { Tournament, Registration, Announcement } from '@/types';

export const getTournaments = async (): Promise<Tournament[]> => {
    const { data } = await apiClient.get<Tournament[]>('/tournaments');
    return data;
};

export const getTournamentById = async (id: string): Promise<Tournament> => {
    const { data } = await apiClient.get<Tournament>(`/tournaments/${id}`);
    return data;
};

export const createTournament = async (dto: {
    name: string;
    points_cost: number;
    max_slots: number;
    start_date: string;
    rules: string;
    banner_url?: string;
    creator_id: string;
}): Promise<Tournament> => {
    const { data } = await apiClient.post<Tournament>('/tournaments', dto);
    return data;
};

export const getAnnouncements = async (): Promise<Announcement[]> => {
    const { data } = await apiClient.get<Announcement[]>('/announcements');
    return data;
};

export const getRegistrations = async (): Promise<Registration[]> => {
    const { data } = await apiClient.get<Registration[]>('/registrations');
    return data;
};

export const createRegistration = async (dto: {
    user_id: string;
    tournament_id: string;
}): Promise<Registration> => {
    const { data } = await apiClient.post<Registration>('/registrations', dto);
    return data;
};

