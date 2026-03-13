import Image from 'next/image';
import prisma from '@/src/lib/prisma';

type Skill = {
    id: number;
    name: string;
    imageUrl: string | null;
};

async function getSkills(): Promise<Skill[]> {
    try {
        return await  prisma.skill.findMany({
            orderBy: { id : "asc" },
        })
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function Skills() {
    const skills = await getSkills();

    return (
        <section id="skills" className="relative px-6 md:px-16 py-24 overflow-hidden">

        {/* ── BACKGROUND GLOW ── */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.07)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="w-full max-w-7xl mx-auto">

                {/* ── SECTION LABEL ── */}
                <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-[#c9a84c]/50" />
                <p className="text-xs text-[#c9a84c]/70 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)]">
                    What I work with
                </p>
                </div>

                {/* ── HEADING ── */}
                <h2 className="font-[family-name:var(--font-cinzel)] text-[clamp(2rem,4vw,3rem)] font-black tracking-tight leading-tight mb-14">
                Tech<span className="text-[#c9a84c]">Stack</span>
                </h2>

                {/* ── EMPTY STATE ── */}
                {skills.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-4 border border-white/[0.06] rounded-2xl bg-white/[0.02]">
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
                    </svg>
                    </div>
                    <p className="text-sm text-white/30 font-[family-name:var(--font-dm)]">
                    No skills added yet. Please check back later!
                    </p>
                </div>
                )}

                {/* ── SKILLS GRID ── */}
                {skills.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/[0.05] transition-all duration-300 cursor-default"
                        >
                            {/* Icon */}
                            <div className="relative w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center overflow-hidden group-hover:border-[#c9a84c]/20 transition-all duration-300">
                            {skill.imageUrl ? (
                                <Image
                                src={skill.imageUrl}
                                alt={skill.name}
                                fill
                                className="object-contain p-2.5"
                                />
                            ) : (
                                // Fallback: huruf pertama nama skill
                                <span className="text-lg font-black text-[#c9a84c]/40 group-hover:text-[#c9a84c]/70 transition-colors duration-300">
                                {skill.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                            </div>

                            {/* Name */}
                            <p className="text-xs font-semibold text-white/50 text-center leading-tight group-hover:text-white/80 transition-colors duration-300 font-[family-name:var(--font-dm)]">
                            {skill.name}
                            </p>
                        </div>
                    ))}
                </div>
                )}

            </div>
        </section>
    );
}