'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

import { createTournament } from '../services/tournament.service';

type FormData = {
    name: string;
    banner_url: string;
    points_cost: string;
    max_slots: string;
    start_date: string;
    rules: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function CreateTournamentPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        banner_url: '',
        points_cost: '100',
        max_slots: '32',
        start_date: '',
        rules: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
        if (!formData.start_date) newErrors.start_date = 'La fecha es obligatoria';
        if (!formData.rules.trim()) newErrors.rules = 'El reglamento es obligatorio';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        if (!user) return;
        setLoading(true);
        setGlobalError('');
        try {
            await createTournament({
                name: formData.name,
                points_cost: Number(formData.points_cost),
                max_slots: Number(formData.max_slots),
                start_date: formData.start_date,
                rules: formData.rules,
                banner_url: formData.banner_url || undefined,
                creator_id: user.id_user,
            });
            router.push('/tournaments');
        } catch {
            setGlobalError('Error al crear el torneo. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 md:p-24 max-w-screen-xl mx-auto space-y-16 bg-black text-white min-h-screen"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#2C2C2C]">
                <div className="space-y-3">
                    <span className="text-[10px] text-[#A1A1A1] font-bold uppercase tracking-[0.3em]">Workstation</span>
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
                        Crear Torneo
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="self-start border border-[#2C2C2C] text-[#A1A1A1] text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 rounded-[6px] hover:border-[#335bff] hover:text-white transition-all"
                >
                    Cancelar
                </button>
            </div>

            {globalError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-[4px] text-[10px] uppercase font-bold tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{globalError}</span>
                </div>
            )}

            <form onSubmit={(e) => void handleSubmit(e)} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Columna izquierda */}
                <div className="lg:col-span-7 space-y-8">
                    <h3 className="text-md font-bold uppercase text-white pb-3 border-b border-white/5 tracking-wider">
                        Parámetros
                    </h3>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">
                            Nombre *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej. Elden Ring Championship"
                            className="w-full bg-[#121212] border border-[#2C2C2C] rounded-[6px] px-4 py-3.5 text-xs focus:outline-none focus:border-[#335bff] transition-colors text-white"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider">{errors.name}</p>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">
                                Costo XP *
                            </label>
                            <input
                                type="number"
                                name="points_cost"
                                value={formData.points_cost}
                                onChange={handleChange}
                                min="0"
                                className="w-full bg-[#121212] border border-[#2C2C2C] rounded-[6px] px-4 py-3.5 text-xs focus:outline-none focus:border-[#335bff] transition-colors text-white font-mono"
                            />
                            {errors.points_cost && (
                                <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider">
                                    {errors.points_cost}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">
                                Cupos *
                            </label>
                            <input
                                type="number"
                                name="max_slots"
                                value={formData.max_slots}
                                onChange={handleChange}
                                min="4"
                                max="256"
                                className="w-full bg-[#121212] border border-[#2C2C2C] rounded-[6px] px-4 py-3.5 text-xs focus:outline-none focus:border-[#335bff] transition-colors text-white font-mono"
                            />
                            {errors.max_slots && (
                                <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider">
                                    {errors.max_slots}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">
                            Fecha de inicio *
                        </label>
                        <input
                            type="date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-[#2C2C2C] rounded-[6px] px-4 py-3.5 text-xs focus:outline-none focus:border-[#335bff] transition-colors text-white"
                        />
                        {errors.start_date && (
                            <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider">
                                {errors.start_date}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">
                            Reglamento *
                        </label>
                        <textarea
                            name="rules"
                            rows={6}
                            value={formData.rules}
                            onChange={handleChange}
                            placeholder="Indica formato, reglas y sanciones..."
                            className="w-full bg-[#121212] border border-[#2C2C2C] rounded-[6px] px-4 py-3.5 text-xs focus:outline-none focus:border-[#335bff] transition-colors text-white resize-none leading-relaxed"
                        />
                        {errors.rules && (
                            <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider">
                                {errors.rules}
                            </p>
                        )}
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="lg:col-span-5 space-y-8">
                    <h3 className="text-md font-bold uppercase text-white pb-3 border-b border-white/5 tracking-wider">
                        Visuales
                    </h3>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1]">
                            URL del Banner
                        </label>
                        <input
                            type="url"
                            name="banner_url"
                            value={formData.banner_url}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full bg-[#121212] border border-[#2C2C2C] rounded-[6px] px-4 py-3.5 text-xs focus:outline-none focus:border-[#335bff] transition-colors text-white"
                        />
                    </div>

                    {/* Preview */}
                    <div className="aspect-video relative rounded-[6px] border border-[#2C2C2C] overflow-hidden bg-black flex items-center justify-center">
                        {formData.banner_url && (
                            <img
                                src={formData.banner_url}
                                alt="Preview"
                                className="absolute inset-0 w-full h-full object-cover opacity-60"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                        <div className="relative z-20 p-6 text-center space-y-2">
                            <span className="text-[#335bff] text-[8px] font-bold uppercase tracking-[0.2em]">
                                Preview
                            </span>
                            <p className="text-sm font-bold uppercase">{formData.name || 'Nombre del torneo'}</p>
                            <p className="text-[9px] font-mono text-neutral-500 uppercase">
                                {formData.start_date || 'Fecha'}
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black text-[10px] font-bold uppercase tracking-widest py-4 rounded-[6px] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        <span>Lanzar Torneo</span>
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
