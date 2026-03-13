'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');

        router.push('/')
    }
    return (
        <div className="relative min-h-screen bg-black overflow-hidden">

            {/* Glowing orbs
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600 opacity-20 blur-[120px] animate-pulse" />
            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-pink-600 opacity-15 blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} /> */}

            {/* Navbar */}
            <nav className="relative z-10 px-8 py-4 flex justify-between items-center border-b border-white/10 bg-white/5 backdrop-blur-2xl shadow-lg shadow-black/20">
                <div className="flex items-center gap-3">
                    <h1 className="text-base font-semibold text-white tracking-tight">Backstage</h1>
                </div>

                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <button onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm text-white/40 hover:text-slate-400/50 transition-colors duration-200"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Logout
                </button>
            </nav>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard</h2>
                    <p className="text-white/40 text-sm mt-1">Manage Your Content Portofolio</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/admin/projects">
                        <div className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/20 mb-4 group-hover:bg-indigo-500/30 transition-colors duration-300">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#818cf8" strokeWidth="1.8" />
                                    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#818cf8" strokeWidth="1.8" />
                                    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#818cf8" strokeWidth="1.8" />
                                    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#818cf8" strokeWidth="1.8" />
                                </svg>
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1">Projects</h3>
                            <p className="text-white/40 text-sm">Manage Your Project Portofolio</p>
                        </div>
                    </Link>

                    <Link href="/admin/skills">
                        <div className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/20 mb-4 group-hover:bg-violet-500/30 transition-colors duration-300">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="#a78bfa" strokeWidth="1.8" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1">Skills</h3>
                            <p className="text-white/40 text-sm">Manage Your Skills</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}