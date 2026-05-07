'use client';

import type { ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    onClick,
    type = 'button',
    className = '',
}: ButtonProps) {
    const variantClass = {
        primary: 'bg-white text-black hover:bg-white/90',
        secondary: 'border border-[#2C2C2C] text-white hover:border-[#335bff]',
        danger: 'border border-red-500/50 text-red-400 hover:bg-red-500/10',
        ghost: 'text-[#A1A1A1] hover:text-white',
    }[variant];

    const sizeClass = {
        sm: 'px-4 py-2 text-[10px]',
        md: 'px-6 py-3 text-[11px]',
        lg: 'px-10 py-3.5 text-[11px]',
    }[size];

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`font-bold uppercase tracking-widest rounded-[6px] transition-all disabled:opacity-50 ${variantClass} ${sizeClass} ${fullWidth ? 'w-full' : ''} ${className}`.trim()}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
}
