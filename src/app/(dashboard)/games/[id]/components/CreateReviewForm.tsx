'use client';

import { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import type { CreateReviewDto } from '@/types';

type CreateReviewFormProps = {
	gameId: number;
	userId: string;
	onSubmit: (dto: CreateReviewDto) => Promise<void>;
};

export default function CreateReviewForm({ gameId, userId, onSubmit }: CreateReviewFormProps) {
	const [rating, setRating] = useState(5);
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim()) return;
		setLoading(true);
		try {
			await onSubmit({ content, rating, game_id: gameId, user_id: userId });
			setContent('');
			setRating(5);
			setSuccess(true);
			setTimeout(() => setSuccess(false), 4000);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-8 border border-[#2C2C2C] bg-[#121212] rounded-md space-y-6 sticky top-40">
			<div className="border-b border-white/5 pb-4">
				<h3 className="text-md font-bold uppercase tracking-tight">Escribe una reseña</h3>
				<p className="text-[9px] uppercase font-bold tracking-widest text-neutral-500 mt-1">
					Comparte tu experiencia
				</p>
			</div>

			{success && (
				<div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-sm text-[10px] uppercase font-bold tracking-wider flex items-center gap-2">
					<CheckCircle2 className="w-4 h-4" />
					<span>¡Reseña publicada!</span>
				</div>
			)}

			<form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
				<div className="space-y-2">
					<label className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">
						Calificación
					</label>
					<div className="flex bg-black p-3 rounded-sm border border-[#2C2C2C] justify-between items-center">
						<span className="text-[11px] font-mono text-neutral-400">Rating:</span>
						<div className="flex gap-2">
							{[1, 2, 3, 4, 5].map((s) => (
								<button
									key={s}
									type="button"
									onClick={() => setRating(s)}
									className="p-1 hover:scale-125 transition-transform"
								>
									<Star
										className={`w-4 h-4 transition-all ${s <= rating ? 'fill-current text-[#335bff]' : 'text-neutral-700'}`}
									/>
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">
						Comentario
					</label>
					<textarea
						required
						rows={5}
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Escribe tu análisis del juego..."
						className="w-full bg-black border border-[#2C2C2C] rounded-sm p-4 text-xs focus:outline-none focus:border-[#335bff] transition-colors resize-none placeholder-neutral-700 text-white leading-relaxed"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-white text-black text-[10px] font-bold uppercase tracking-widest py-4 rounded-md hover:bg-neutral-200 transition-colors disabled:opacity-50"
				>
					{loading ? 'Publicando...' : 'Publicar en Prizma'}
				</button>
			</form>
		</div>
	);
}
