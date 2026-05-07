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
