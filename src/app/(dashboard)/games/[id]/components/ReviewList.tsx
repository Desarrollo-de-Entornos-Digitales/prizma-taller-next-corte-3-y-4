'use client';

import { Star, ThumbsUp, ThumbsDown, User, Ghost } from 'lucide-react';
import type { Review, ReviewInteraction } from '@/types';

type ReviewListProps = {
	reviews: Review[];
	interactions: ReviewInteraction[];
	onVote: (reviewId: string, voteType: boolean) => Promise<void>;
};

export default function ReviewList({ reviews, interactions, onVote }: ReviewListProps) {
	const getUserVote = (reviewId: string): boolean | null => {
		const found = interactions.find((i) => i.review_id === reviewId);
		return found ? found.vote_type : null;
	};

	if (reviews.length === 0) {
		return (
			<div className="py-20 border border-dashed border-[#2C2C2C] rounded-[6px] flex flex-col items-center justify-center text-center space-y-4">
				<Ghost className="w-8 h-8 text-neutral-800" />
				<p className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[0.3em]">
					No hay reseñas para este juego aún
				</p>
				<p className="text-[9px] text-neutral-600 uppercase tracking-widest">
					Sé el primero en compartir tu experiencia
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{reviews.map((review) => {
				const userVote = getUserVote(review.id_review);
				return (
					<div
						key={review.id_review}
						className="p-6 border border-[#2C2C2C] rounded-[6px] bg-[#121212]/40 space-y-4 hover:border-neutral-700 transition-colors"
					>
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-neutral-900 border border-[#2C2C2C] flex items-center justify-center">
									<User className="w-3.5 h-3.5 text-[#335bff]" />
								</div>
								<div>
									<p className="text-xs font-bold uppercase text-white tracking-wider">
										{review.user?.name ?? 'Usuario'}
									</p>
									<p className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
										{new Date(review.published_at).toLocaleDateString()}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-0.5 text-[#335bff]">
								{Array.from({ length: 5 }).map((_, idx) => (
									<Star
										key={idx}
										className={`w-3 h-3 ${idx < review.rating ? 'fill-current text-[#335bff]' : 'text-neutral-800'}`}
									/>
								))}
							</div>
						</div>

						<p className="text-xs text-[#A1A1A1] leading-relaxed">{review.content}</p>

						<div className="flex justify-between items-center pt-2 border-t border-white/5">
							<span className="text-[8px] text-neutral-600 uppercase font-bold tracking-widest">
								¿Te resultó útil?
							</span>
							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={() => void onVote(review.id_review, true)}
									className={`flex items-center gap-1.5 text-[10px] font-bold transition-colors hover:text-white ${userVote === true ? 'text-emerald-400' : 'text-[#A1A1A1]'}`}
								>
									<ThumbsUp className="w-3 h-3" />
								</button>
								<button
									type="button"
									onClick={() => void onVote(review.id_review, false)}
									className={`flex items-center gap-1.5 text-[10px] font-bold transition-colors hover:text-white ${userVote === false ? 'text-red-400' : 'text-[#A1A1A1]'}`}
								>
									<ThumbsDown className="w-3 h-3" />
								</button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
