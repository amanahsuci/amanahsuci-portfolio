"use client";

import Image from "next/image";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center px-6 md:px-16 pt-24 pb-16 overflow-hidden"
        >

        {/* ── BACKGROUND GLOW ── */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.12)_0%,transparent_70%)] blur-3xl" />
            <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_70%)] blur-3xl" />
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)] blur-3xl" />
        </div>

        {/* ── GRID 2 COL ── */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">

            {/* ── LEFT: TEXT ── */}
            <div className="flex flex-col gap-6 animate-[fadeInLeft_0.8s_0.1s_ease_both]">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/[0.06]">
                <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="text-xs text-[#c9a84c]/80 font-medium tracking-widest uppercase font-[family-name:var(--font-dm)]">
                    Available for work
                </span>
            </div>
            <div>
                <p className="text-sm text-white/40 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)] mb-2">
                    Hi, I'm
                </p>
                <h1 className="font-[family-name:var(--font-cinzel)] text-[clamp(2.8rem,5.5vw,4.5rem)] font-black leading-[1.05] tracking-tight">
                    <span className="text-[#c9a84c]">Suci</span>
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#c9a84c]/50" />
                    <p className="text-base text-white/60 font-[family-name:var(--font-dm)] font-medium tracking-wide">
                    Junior Full-Stack Developer
                    </p>
            </div>
            <p className="text-sm text-white/40 font-[family-name:var(--font-dm)] leading-[1.9] max-w-md">
            Crafting clean, performant, and delightful web experiences. Always eager to learn something new every single day.
            </p>
            <div className="flex gap-3 flex-wrap pt-2">
                <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#c9a84c] text-[#0f0f0f] text-sm font-bold hover:bg-[#e8c97a] transition-colors duration-300"
                >
                    View Projects
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </a>
            </div>

            </div>
            <div className="flex justify-center md:justify-end items-end animate-[fadeInRight_0.8s_0.15s_ease_both]">
                <div className="relative flex justify-center">

                    {/* round glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.2)_0%,transparent_65%)] blur-2xl -z-10" />

                    {/* ring */}
                    <div className="absolute inset-0 rounded-full border border-[#c9a84c]/10 scale-110 -z-10" />
                    <div className="absolute inset-0 rounded-full border border-[#c9a84c]/05 scale-125 -z-10" />
                    <Image
                        src="/images/me.png"
                        alt="Your Name"
                        width={120}
                        height={200}
                        priority
                        className="
                            relative z-10
                            w-[180px] md:w-[220px] lg:w-[260px]
                            object-contain object-bottom
                            drop-shadow-[0_0_80px_rgba(201,168,76,0.3)]
                            animate-[floatChar_6s_ease-in-out_infinite]
                        "
                    />

                    {/* Floor glow */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[180px] h-5 bg-[radial-gradient(ellipse,rgba(201,168,76,0.45)_0%,transparent_70%)] blur-lg" />

                </div>
            </div>

        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fadeInUp_0.8s_0.6s_ease_both]">
            <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)]">
                scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-[#c9a84c]/40 to-transparent animate-pulse" />
        </div>

        </section>
    );
}