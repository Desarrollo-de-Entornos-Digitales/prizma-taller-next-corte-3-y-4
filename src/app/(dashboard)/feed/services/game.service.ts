import apiClient from '@/lib/axios/client';
import type { Game } from '@/types';

type RawGame = Omit<Game, 'id_game'> & { id: number };

const normalizeGame = (raw: RawGame): Game => ({
    ...raw,
    id_game: raw.id,
});

export const getGames = async (): Promise<Game[]> => {
    const { data } = await apiClient.get<RawGame[]>('/games');
    return data.map(normalizeGame);
};

export const getGameById = async (id: number): Promise<Game> => {
    const { data } = await apiClient.get<RawGame>(`/games/${id}`);
    return normalizeGame(data);
};
