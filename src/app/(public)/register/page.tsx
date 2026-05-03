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

                {/* Placeholder campos */}
                <p className="text-[#A1A1A1] text-center text-sm">Campos pendientes</p>
            </div>
        </div>
    );
}