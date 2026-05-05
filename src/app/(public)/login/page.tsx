'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from './services/login.service';
import { loginUser, getUserByEmail } from './services/login.service';
import { useState, useEffect } from 'react';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const { isAuthenticated, isLoading: authLoading } = useAuth();

useEffect(() => {
    if (!authLoading && isAuthenticated) {
        router.push('/feed');
    }
}, [isAuthenticated, authLoading, router]);

if (authLoading) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest">Cargando...</span>
        </div>
    );
}

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        setError('Por favor completa todos los campos.');
        return;
    }
    setError('');
    setLoading(true);
   try {
    const { access_token } = await loginUser({ email, password });
    // Guardar token temporal para poder hacer el segundo request
    localStorage.setItem('token', access_token);
    const user = await getUserByEmail(email);
    login(access_token, user);
    router.push('/feed');
} catch {
    setError('Email o contraseña incorrectos.');
}
    return (
        <div className="min-h-screen bg-black relative flex items-center justify-center p-6 overflow-hidden">
            {/* Fondo Horizon */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -bottom-[30%] left-[-25%] w-[150%] h-[60vh] border-t border-[#333333] rounded-[100%] shadow-[0_-40px_120px_-20px_rgba(51,91,255,0.35)]" />
            </div>

            {/* Card */}
            <div className="w-full max-w-sm p-12 border border-[#2C2C2C] bg-[#121212]/90 backdrop-blur-sm rounded-[6px] relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter mb-2">Prizma</h1>
                    <p className="text-[#A1A1A1] text-[10px] uppercase font-bold tracking-widest pt-2 border-t border-white/5 w-full text-center">
                        Plataforma Profesional
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>


    {/* Campo Email */}
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

    {/* Campo Password */}
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

   {/* Mensaje de error global */}
{error && (
    <p className="text-red-400 text-[11px] text-center uppercase tracking-widest">
        {error}
    </p>
)}

{/* Botón submit */}
<button
    type="submit"
    disabled={loading}
    className="w-full bg-white text-black font-bold py-3.5 rounded-[6px] text-[11px] uppercase tracking-widest mt-4 hover:bg-white/90 disabled:opacity-50 transition-all"
>
    {loading ? 'Iniciando...' : 'Iniciar Sesión'}
</button>

{/* Divider */}
<div className="border-t border-[#2C2C2C] my-2" />

{/* Link a registro */}
<p className="text-center">
    <Link
        href="/register"
        className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-widest hover:text-white transition-colors"
    >
        Registrarse Ahora
    </Link>
</p>
</form>
            </div>
        </div>
    );
}   

}