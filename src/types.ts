export type TournamentStatus = 'open' | 'in_progress' | 'closed';

export type Tournament = {
    id_tournament: string;
    name: string;
    banner_url?: string;
    points_cost: number;
    max_slots: number;
    start_date: string;
    rules: string;
    status: TournamentStatus;
    creator_id?: string;
};

export type Registration = {
    id_registration?: string;
    user_id: string;
    tournament_id: string;
};

export type Announcement = {
    id_announcement: string;
    tournament_id: string;
    title: string;
    message: string;
    posted_at: string;
};

export type AuthUser = {
    id_user: string;
    name?: string;
    email?: string;
};
