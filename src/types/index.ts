// ─── Auth ─────────────────────────────────────────────────────────────────────

export type LoginDto = {
    email: string;
    password: string;
};

export type AuthResponse = {
    access_token: string;
};

// ─── Users ────────────────────────────────────────────────────────────────────

export type CreateUserDto = {
    name: string;
    email: string;
    password: string;
};

export type User = {
    id_user: string;
    name: string;
    email: string;
    total_points: number;
    account_status: string;
    role_id: number;
};

// ─── Games ────────────────────────────────────────────────────────────────────

export type Game = {
    id?: number;
    id_game?: number;
    title: string;
    genre: string;
    origin_platform: string;
    created_at: string;
    banner_url?: string | null;
    cover_url?: string | null;
    thumbnail_url?: string | null;
};

export type CreateGameDto = {
    title: string;
    genre: string;
    origin_platform: string;
};

// ─── Reviews ──────────────────────────────────────────────────────────────────

export type Review = {
    id_review: string;
    content: string;
    rating: number;
    published_at: string;
    user_id: string;
    game_id: number;
    user?: User;
};

export type CreateReviewDto = {
    content: string;
    rating: number;
    game_id: number;
};

export type UpdateReviewDto = {
    content?: string;
    rating?: number;
};

// ─── Review Interactions ──────────────────────────────────────────────────────

export type ReviewInteraction = {
    id_interaction: string;
    vote_type: boolean;
    user_id: string;
    review_id: string;
};

export type CreateReviewInteractionDto = {
    vote_type: boolean;
    review_id: string;
};

// ─── Shared ───────────────────────────────────────────────────────────────────

export type ApiError = {
    message: string | string[];
    statusCode: number;
    error?: string;
};

// ─── Tournaments ───────────────────────────────────────────────────────────────

export type Tournament = {
    id_tournament: string;
    name: string;
    points_cost: number;
    max_slots: number;
    status: 'open' | 'closed' | 'in_progress';
    rules: string;
    start_date: string;
    banner_url?: string;
    creator_id: string;
};

export type Registration = {
    id_registration: string;
    registration_date: string;
    final_position: number | null;
    payment_status: string;
    user_id: string;
    tournament_id: string;
};

export type Announcement = {
    id_announcement: string;
    title: string;
    message: string;
    posted_at: string;
    tournament_id: string;
};

export type TournamentPrize = {
    id_prize: string;
    description: string;
    redemption_code: string;
    delivery_status: string;
    tournament_id: string;
    winner_id: string;
};

// ─── Library ──────────────────────────────────────────────────────────────────

export type UserLibrary = {
    id_library: string;
    play_time_minutes: number;
    generated_points: number;
    last_sync: string;
    user_id: string;
    game_id: number;
    game?: Game;
};

export type CreateUserLibraryDto = {
    game_id: number;
    user_id: string;
};

// ─── Notifications ────────────────────────────────────────────────────────────

export type Notification = {
    id_notification: string;
    title: string;
    message: string;
    type: string;
    read: boolean;
    user_id: string;
};

// ─── External Accounts ────────────────────────────────────────────────────────

export type ExternalAccount = {
    id_external_account: string;
    external_user_id: string;
    connection_status: string;
    platform_id: string;
    user_id: string;
    platform?: Platform;
};

export type Platform = {
    id_platform: string;
    name: string;
    description: string;
};

// ─── Points History ───────────────────────────────────────────────────────────

export type PointsHistory = {
    id_movement: string;
    amount: number;
    type: string;
    reason: string;
    user_id: string;
    created_at?: string;
};
