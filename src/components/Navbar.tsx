'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
    { label: "Home",     href: "#home",      id: "home" },
    { label: "About",    href: "#about",     id: "about" },
    { label: "Projects", href: "#projects",  id: "projects" },
    { label: "Skills",   href: "#skills",    id: "skills" },
];

export default function Navbar() {
    const [scrolled, setScrolled]     = useState(false);
    const [menuOpen, setMenuOpen]     = useState(false);
    const [activeLink, setActiveLink] = useState("Home");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // detect when section is roughly in the middle of the viewport
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentLink = NAV_LINKS.find(link => link.href === entry.target.id);
                    if (currentLink) {
                        setActiveLink(currentLink.label);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // observe each section corresponding to nav links
        NAV_LINKS.forEach((link) => {
            const element = document.getElementById(link.href);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

  // navbar background change while scrolling
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

  // lock body scroll while mobile menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <header
                className={`
                    fixed top-0 left-0 right-0 z-50
                    flex items-center justify-between
                    px-6 md:px-10
                    transition-all duration-500 ease-in-out
                    ${scrolled
                        ? "py-1 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                        :"py-3 bg-transparent"
                    }
                `}
            >
            {/* ── LOGO ── */}
                <Link
                    href="home"
                    className="flex items-center gap-2.5 group"
                    onClick={() => setActiveLink("Home")}
                >
                    <Image 
                        src="/images/name_logo(2).png"
                        alt="amanahsuci_logo"
                        width={200}
                        height={50}
                        className="object-contain w-[120px]"
                        priority
                    />
                </Link>

            {/* ── DESKTOP NAV ── */}
                <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-1.5 backdrop-blur-md">
                    {NAV_LINKS.map(({ label, href }) => {
                        const isActive = activeLink === label;
                        return (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setActiveLink(label)}
                                className={`
                                    relative px-5 py-1.5 rounded-full text-sm font-semibold
                                    transition-all duration-300
                                    ${isActive
                                        ? "text-[#0f0f0f] bg-[#c9a84c]"
                                        : "text-white/50 hover:text-white hover:bg-white/[0.07]"
                                    }
                                `}
                            >
                            {label}
                            </Link>
                        );
                    })}
                </nav>

            {/* ── RIGHT SIDE ── */}
                <div className="flex items-center gap-2.5">
            {/* CTA button — desktop only */}
                    {/* <Link
                        href="/cv.pdf"
                        download
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#c9a84c]/50 text-[#c9a84c] text-sm font-bold hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] transition-all duration-300"
                    >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Resume
                    </Link> */}

            {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        className="md:hidden w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex flex-col items-center justify-center gap-[5px] hover:bg-white/[0.09] transition-colors"
                    >
                        <span
                            className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                                menuOpen ? "translate-y-[6px] rotate-45" : ""
                            }`}
                        />
                        <span
                            className={`block w-5 h-px bg-white transition-all duration-300 ${
                                menuOpen ? "opacity-0 scale-x-0" : ""
                            }`}
                        />
                        <span
                            className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                            }`}
                        />
                    </button>
                </div>
            </header>

        {/* ── MOBILE MENU OVERLAY ── */}
            <div
                className={`
                    fixed inset-0 z-40 flex flex-col
                    bg-[#0f0f0f]/95 backdrop-blur-2xl
                    transition-all duration-400 ease-in-out
                    md:hidden
                    ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
            >
            {/* Gold line accent top */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mt-[72px]" />

                <nav className="flex flex-col items-center justify-center gap-2 flex-1">
                    {NAV_LINKS.map(({ label, href }, i) => {
                        const isActive = activeLink === label;
                        return (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => { setActiveLink(label); setMenuOpen(false); }}
                                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
                                className={`
                                    text-3xl font-black tracking-tight
                                    transition-all duration-300
                                    ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                                    ${isActive ? "text-[#c9a84c]" : "text-white/70 hover:text-white"}
                                    py-2
                                `}
                            >
                                {label}
                            </Link>
                        );
                    })}

                {/* Mobile resume button */}
                    {/* <Link
                        href="/cv.pdf"
                        download
                        style={{ transitionDelay: menuOpen ? "280ms" : "0ms" }}
                        className={`
                            mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full
                            border border-[#c9a84c]/50 text-[#c9a84c] font-bold
                            hover:bg-[#c9a84c]/10 transition-all duration-300
                            ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                        `}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download Resume
                    </Link> */}
                </nav>

            {/* Bottom social links */}
                <div
                    style={{ transitionDelay: menuOpen ? "320ms" : "0ms" }}
                    className={`
                        flex justify-center gap-4 pb-12
                        transition-all duration-300
                        ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                    `}
                >
                    {[
                        { label: "Email",  href: "mailto:aaamanahsc@gmail.com" },
                        { label: "GitHub",   href: "https://github.com/amanahsuci" },
                        { label: "LinkedIn", href: "https://linkedin.com/in/amanahsuci/" },
                    ].map(({ label, href }) => (
                        <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-white/30 hover:text-[#c9a84c] tracking-widest uppercase font-semibold transition-colors"
                        >
                        {label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}