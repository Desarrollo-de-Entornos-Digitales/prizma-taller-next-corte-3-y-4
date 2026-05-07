import apiClient from '../../../../lib/axios/client';
import type { CreateUserDto, User } from '../../../../types';

export const registerUser = async (userData: CreateUserDto): Promise<User> => {
    const { data } = await apiClient.post<User>('/users', userData);
    return data;
};
