import apiClient from '../../../../../lib/axios/client';
import type { Review, CreateReviewDto, CreateReviewInteractionDto, ReviewInteraction } from '../../../../../types';

export const getReviews = async (): Promise<Review[]> => {
    const { data } = await apiClient.get<Review[]>('/reviews');
    return data;
};

export const getReviewById = async (id: string): Promise<Review> => {
    const { data } = await apiClient.get<Review>(`/reviews/${id}`);
    return data;
};

export const createReview = async (dto: CreateReviewDto): Promise<Review> => {
    const { data } = await apiClient.post<Review>('/reviews', dto);
    return data;
};

export const deleteReview = async (id: string): Promise<void> => {
    await apiClient.delete(`/reviews/${id}`);
};

export const createReviewInteraction = async (dto: CreateReviewInteractionDto): Promise<ReviewInteraction> => {
    const { data } = await apiClient.post<ReviewInteraction>('/review-interactions', dto);
    return data;
};

export const deleteReviewInteraction = async (id: string): Promise<void> => {
    await apiClient.delete(`/review-interactions/${id}`);
};
