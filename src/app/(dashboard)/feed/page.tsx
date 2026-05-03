'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getGames } from './services/game.service';
import type { Game } from '@/types';

export default function FeedPage() {
	const { isAuthenticated, isLoading: authLoading } = useAuth();
	const [games, setGames] = useState<Game[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (!authLoading && !isAuthenticated) {
			router.push('/login');
		}
	}, [isAuthenticated, authLoading, router]);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const data = await getGames();
				setGames(data);
			} catch (err) {
				console.error('Error fetching games:', err);
			} finally {
				setLoading(false);
			}
		};
		fetchGames();
	}, []);

	if (authLoading || loading) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Cargando...</span>
			</div>
		);
	}

	return (
		<div className="bg-black text-white min-h-screen">
			{/* Banner placeholder */}
			<p className="text-[#A1A1A1] p-8">Banner pendiente</p>

			{/* Carousels placeholder */}
			<p className="text-[#A1A1A1] p-8">Carousels pendientes — {games.length} juegos cargados</p>
		</div>
	);
}
