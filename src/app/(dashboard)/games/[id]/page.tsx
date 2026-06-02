'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Game, Review, ReviewInteraction, CreateReviewDto } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useLibrary } from '@/context/LibraryContext';
import {
    getReviews,
    createReview,
    createReviewInteraction,
    deleteReviewInteraction,
} from './services/review.service';
import ReviewList from './components/ReviewList';
import CreateReviewForm from './components/CreateReviewForm';
import apiClient from '@/lib/axios/client';

export default function GameDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { isInLibrary, addToLibrary } = useLibrary();

    const [game, setGame] = useState<Game | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [myInteractions, setMyInteractions] = useState<ReviewInteraction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gameRes, allReviews, allInteractions] = await Promise.all([
                    apiClient.get<Game>(`/games/${id}`),
                    getReviews(),
                    isAuthenticated
                        ? apiClient.get<ReviewInteraction[]>('/review-interactions').then((r) => r.data)
                        : Promise.resolve([]),
                ]);
                setGame(gameRes.data);
                setReviews(allReviews.filter((r) => r.game_id === Number(id)));
                if (user) {
                    setMyInteractions(
                        (allInteractions as ReviewInteraction[]).filter((i) => i.user_id === user.id_user)
                    );
                }
            } catch {
                // manejo silencioso
            } finally {
                setLoading(false);
            }
        };
        void fetchData();
    }, [id, isAuthenticated, user]);

    const handleCreateReview = async (dto: CreateReviewDto) => {
        const newReview = await createReview(dto);
        setReviews((prev) => [newReview, ...prev]);
    };

    const handleVote = async (reviewId: string, voteType: boolean) => {
        const existing = myInteractions.find((i) => i.review_id === reviewId);
        if (existing) {
            await deleteReviewInteraction(existing.id_interaction);
            setMyInteractions((prev) => prev.filter((i) => i.id_interaction !== existing.id_interaction));
        } else {
            const created = await createReviewInteraction({ vote_type: voteType, review_id: reviewId });
            setMyInteractions((prev) => [...prev, created]);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Cargando...</span>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Juego no encontrado</span>
            </div>
        );
    }

    const gameId = game.id_game ?? (game as unknown as { id: number }).id;
    const inLibrary = isInLibrary(gameId);

    return (
        <div className="pb-20 bg-black text-white min-h-screen">
            {/* Barra de navegación back */}
            <div className="bg-black/80 backdrop-blur sticky top-16 z-30 border-b border-[#2C2C2C] px-8 md:px-24 py-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#A1A1A1] hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 text-[#335bff]" />
                    <span>Volver</span>
                </button>
            </div>

            {/* Hero Banner */}
            <section className="relative h-[70vh] w-full flex items-end border-b border-[#2C2C2C] overflow-hidden bg-black">
                {game.banner_url && (
                    <img
                        src={game.banner_url}
                        alt={game.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
                <div className="relative w-full px-8 md:px-24 pb-16 z-20 max-w-2xl space-y-6">
                    <span className="text-[10px] text-[#335bff] font-bold uppercase tracking-[0.3em] bg-[#335bff]/10 border border-[#335bff]/20 px-3 py-1.5 rounded-[4px]">
                        {game.origin_platform}
                    </span>
                    <h1 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
                        {game.title}
                    </h1>
                    <div className="flex gap-8 pt-4">
                        <div className="space-y-1">
                            <span className="text-[9px] text-[#A1A1A1] uppercase font-bold tracking-widest">Género</span>
                            <p className="text-xs font-bold uppercase text-[#A1A1A1]">{game.genre}</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        {inLibrary ? (
                            <button
                                disabled
                                className="border border-[#2C2C2C] text-neutral-500 text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-[6px] opacity-60 cursor-not-allowed"
                            >
                                Ya en biblioteca
                            </button>
                        ) : (
                            <button
                                onClick={() => void addToLibrary(gameId)}
                                className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-[6px] hover:bg-neutral-200 transition-all"
                            >
                                Agregar a Biblioteca
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Contenido: reseñas + formulario */}
            <div className="px-8 md:px-24 py-16 max-w-screen-2xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-16">
                <div className="xl:col-span-7 space-y-10">
                    <div className="border-b border-white/5 pb-4">
                        <h3 className="text-xl font-bold uppercase tracking-tighter">Reseñas de la comunidad</h3>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mt-1">
                            Lo que opinan otros jugadores
                        </p>
                    </div>
                    <ReviewList reviews={reviews} interactions={myInteractions} onVote={handleVote} />
                </div>
                {isAuthenticated && (
                    <div className="xl:col-span-5">
                        <CreateReviewForm gameId={gameId} onSubmit={handleCreateReview} />
                    </div>
                )}
            </div>
        </div>
    );
}
