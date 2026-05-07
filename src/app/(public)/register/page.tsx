'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from './services/register.service';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
        setError('Por favor completa todos los campos.');
        return;
    }
    if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.');
        return;
    }
    setError('');
    setLoading(true);
    try {
        await registerUser({ name, email, password });
        router.push('/login');
    } catch {
        setError('Error al crear la cuenta. El email puede estar en uso.');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-black relative flex items-center justify-center p-6 overflow-hidden">
            {/* Fondo Horizon */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -bottom-[30%] left-[-25%] w-[150%] h-[60vh] border-t border-[#333333] rounded-[100%] shadow-[0_-40px_120px_-20px_rgba(51,91,255,0.35)]" />
            </div>

            {/* Card */}
            <div className="w-full max-w-sm p-12 border border-[#2C2C2C] bg-[#121212]/90 backdrop-blur-sm rounded-[6px] relative z-10">
                <div className="flex flex-col items-center mb-10 text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter mb-2">Prizma</h1>
                    <p className="text-[#A1A1A1] text-[10px] uppercase font-bold tracking-widest pt-2 border-t border-white/5 w-full text-center">
                        Bienvenido al Ecosistema
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
    <div className="space-y-2">
        <label className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-widest">
            Nombre Completo
        </label>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nexus Commander"
            className="w-full bg-black border border-[#2C2C2C] rounded-[6px] px-4 py-3 text-sm text-white placeholder:text-[#A1A1A1] focus:border-white/40 focus:outline-none transition-colors"
        />
    </div>
    <div className="space-y-2">
        <label className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-widest">
            Email
        </label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@prizma.gg"
            className="w-full bg-black border border-[#2C2C2C] rounded-[6px] px-4 py-3 text-sm text-white placeholder:text-[#A1A1A1] focus:border-white/40 focus:outline-none transition-colors"
        />
    </div>
    <div className="space-y-2">
        <label className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-widest">
            Contraseña
        </label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-black border border-[#2C2C2C] rounded-[6px] px-4 py-3 text-sm text-white placeholder:text-[#A1A1A1] focus:border-white/40 focus:outline-none transition-colors"
        />
    </div>

    {error && (
        <p className="text-red-400 text-[11px] text-center uppercase tracking-widest">
            {error}
        </p>
    )}

    <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black font-bold py-3.5 rounded-[6px] text-[11px] uppercase tracking-widest mt-6 hover:bg-white/90 disabled:opacity-50 transition-all"
    >
        {loading ? 'Creando cuenta...' : 'Registrarse'}
    </button>

    <div className="border-t border-[#2C2C2C] my-2" />

    <p className="text-center">
        <Link
            href="/login"
            className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-widest hover:text-white transition-colors"
        >
            Volver al Log-In
        </Link>
    </p>
</form>
            </div>
        </div>
    );
}   