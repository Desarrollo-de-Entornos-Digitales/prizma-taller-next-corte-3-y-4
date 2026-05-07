'use client';

import type { ChangeEvent } from 'react';

type InputProps = {
    label?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
};

export default function Input({
    label,
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    className = '',
}: InputProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-widest">
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full bg-black border ${error ? 'border-red-500' : 'border-[#2C2C2C]'} rounded-[6px] px-4 py-3 text-sm text-white placeholder:text-[#A1A1A1] focus:border-white/40 focus:outline-none transition-colors disabled:opacity-50 ${className}`.trim()}
            />

            {error && (
                <p className="text-red-400 text-[11px] uppercase tracking-widest">{error}</p>
            )}
        </div>
    );
}
