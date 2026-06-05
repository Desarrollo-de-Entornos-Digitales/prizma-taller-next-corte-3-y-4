import type { Tournament, Registration, Announcement } from '@/types';

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Network response was not ok');
    }
    return response.json() as Promise<T>;
};

export const getTournaments = async (): Promise<Tournament[]> => {
    const response = await fetch('/tournaments');
    return handleResponse<Tournament[]>(response);
};

export const getTournamentById = async (id: string): Promise<Tournament> => {
    const response = await fetch(`/tournaments/${id}`);
    return handleResponse<Tournament>(response);
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
    const response = await fetch('/tournaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    });
    return handleResponse<Tournament>(response);
};

export const getAnnouncements = async (): Promise<Announcement[]> => {
    const response = await fetch('/announcements');
    return handleResponse<Announcement[]>(response);
};

export const getRegistrations = async (): Promise<Registration[]> => {
    const response = await fetch('/registrations');
    return handleResponse<Registration[]>(response);
};

export const createRegistration = async (dto: { user_id: string; tournament_id: string }): Promise<Registration> => {
    const response = await fetch('/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    });
    return handleResponse<Registration>(response);
};
