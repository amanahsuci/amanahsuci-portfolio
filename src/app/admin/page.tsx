'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleLogin() {
        setIsLoading(true);
        setError('');
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            router.push('/admin/dashboard');
        } else {
            setError('Invalid password');
            setPassword('');
        }
        setIsLoading(false);
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black">
            <div className="relative z-10 w-full max-w-sm mx-4 p-10 rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Backstage</h1>
                    <p className="text-white/40 text-sm mt-1">Enter your password to continue</p>
                </div>
                <label className="block text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/10 text-white placeholder-white/30 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-slate-500/70 focus:ring-2 focus:ring-indigo-500/20"
                />
                {error && (
                    <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="2" />
                            <path d="M12 8v4m0 4h.01" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Divider */}
                <div className="border-t border-white/[0.07] my-6" />

                {/* Button */}
                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="relative w-full py-3 rounded-xl font-semibold text-sm text-slate-600 tracking-wide bg-gradient-to-r from-gray-600 to-zinc-400 shadow-lg shadow-slate-500/40 hover:-translate-y-0.5 hover:shadow-zinc-500/60 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group"
                >
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Logging in...
                        </span>
                    ) : (
                        'Login'
                    )}
                </button>
                <p className="text-center text-white/20 text-xs mt-6 tracking-wide">
                    Protected area — unauthorized access is prohibited
                </p>
            </div>
        </div>
    );
}