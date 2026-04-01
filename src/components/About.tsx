"use client";

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-16 py-24 overflow-hidden"
    >

      {/* ── BACKGROUND GLOW ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto">

        {/* ── SECTION LABEL ── */}
        <div className="flex items-center gap-3 mb-3 animate-[fadeInLeft_0.8s_0.1s_ease_both]">
          <span className="w-8 h-px bg-[#c9a84c]/50" />
          <p className="text-xs text-[#c9a84c]/70 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)]">
            Get to know me
          </p>
        </div>

        {/* ── HEADING ── */}
        <h2
          className="font-[family-name:var(--font-cinzel)] text-[clamp(2rem,4vw,3rem)] font-black tracking-tight leading-tight mb-14 animate-[fadeInLeft_0.8s_0.15s_ease_both]"
        >
          About <span className="text-[#c9a84c]">Me</span>
        </h2>

        {/* ── GRID CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── LEFT: DESKRIPSI (3 col) ── */}
          <div className="lg:col-span-3 flex flex-col gap-6 animate-[fadeInLeft_0.8s_0.2s_ease_both]">

            {/* Paragraf */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-white/50 font-[family-name:var(--font-dm)] leading-[1.95]">
                Hi! I'm <span className="text-white font-semibold">Suci</span>, I am an aspiring software engineer with a store manager background experienced in leading store operations who taught me to track data, optimize processes, and satisfaction goals. 
                That operational mindset naturally evolved into a passion for building efficient digital systems, leading me to transition into software engineering through an intensive bootcamp experience.
              </p>
              <p className="text-sm text-white/50 font-[family-name:var(--font-dm)] leading-[1.95]">
                During my Software Engineering bootcamp, I rely on JavaScript, Next.js, NestJS, PostgreSQL, Prisma ORM to craft responsive, high-performance applications with clean, maintainable component-based architectures and deliberate state management.
                I am committed to continuous learning and to 
                applying my technical skills to solve real-world problems and deliver value in every project.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#c9a84c]/20 to-transparent" />

            {/* Info rows */}
            <div className="flex flex-col gap-4">

              {/* Lokasi */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#c9a84c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-[family-name:var(--font-dm)]">Location</p>
                  <p className="text-sm text-white/70 font-[family-name:var(--font-dm)] font-medium">
                    Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#c9a84c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-[family-name:var(--font-dm)]">Education</p>
                  <p className="text-sm text-white/70 font-[family-name:var(--font-dm)] font-medium">
                    Full-Stack Software Engineering Program - RevoU
                  </p>
                  <p className="text-xs text-white/30 font-[family-name:var(--font-dm)]">
                    Feb 2025 - Aug 2025
                  </p>
                  <p className="text-sm text-white/70 font-[family-name:var(--font-dm)] font-medium">
                    Sastra Inggris - Indonesia Open University
                  </p>
                  <p className="text-xs text-white/30 font-[family-name:var(--font-dm)]">
                    2022 - present
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT: CARDS (2 col) ── */}
          <div className="lg:col-span-2 flex flex-col gap-3 animate-[fadeInRight_0.8s_0.2s_ease_both]">

            {/* Card Status */}
            <div className="p-5 rounded-2xl border border-[#c9a84c]/15 bg-[#c9a84c]/[0.04] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                <p className="text-xs text-[#c9a84c]/70 uppercase tracking-widest font-[family-name:var(--font-dm)]">
                  Status
                </p>
              </div>
              <p className="text-sm text-white/60 font-[family-name:var(--font-dm)] leading-relaxed">
                Available and ready to take on new challenges — full-time, freelance, or collaborative projects. Let's talk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}