import Image from 'next/image';

type Project = {
    id: number;
    title: string;
    description: string; 
    techStack: string[];
    imageUrl: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    featured: boolean;  
    order: number;
    createdAt: string;
};

async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function Projects() {
    const projects = await getProjects();

    return (
        <section id="projects" className="relative px-6 md:px-16 py-24 overflow-hidden">

        {/* ── BACKGROUND GLOW ── */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.06)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto">

                {/* ── HEADER ── */}
                <div className="mb-14">
                <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-px bg-[#c9a84c]/50" />
                    <p className="text-xs text-[#c9a84c]/70 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)]">
                    My Work
                    </p>
                </div>
                <h2 className="font-[family-name:var(--font-cinzel)] text-[clamp(2rem,4vw,3rem)] font-black tracking-tight leading-tight">
                    Selected{" "}
                    <span className="text-[#c9a84c]">Projects</span>
                </h2>
                </div>

                {/* ── EMPTY STATE ── */}
                {projects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-4 border border-white/[0.06] rounded-2xl bg-white/[0.02]">
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="3" width="20" height="14" rx="2"/>
                            <path d="M8 21h8M12 17v4"/>
                        </svg>
                    </div>
                    <p className="text-sm text-white/30 font-[family-name:var(--font-dm)]">
                    No projects to show yet. Please check back later!
                    </p>
                </div>
                )}

                {/* ── PROJECT GRID ── */}
                {projects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((project, i) => (
                    <article
                        key={project.id}
                        className="group relative flex flex-col bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-[#c9a84c]/30 hover:bg-white/[0.05] transition-all duration-500"
                        style={{ animationDelay: `${i * 80}ms` }}
                    >

                        {/* Thumbnail */}
                        <div className="relative w-full h-44 bg-[#161616] overflow-hidden">
                        {project.imageUrl ? (
                            <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        ) : (
                            // Placeholder jika tidak ada gambar
                            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)]">
                            <svg className="w-10 h-10 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <path d="M21 15l-5-5L5 21"/>
                            </svg>
                            </div>
                        )}

                        {/* Featured badge */}
                        {project.featured && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#c9a84c] text-[#0f0f0f] text-[10px] font-black tracking-widest uppercase">
                            Featured
                            </div>
                        )}

                        {/* Gold line on hover */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-3 p-5 flex-1">

                        <h3 className="font-[family-name:var(--font-cinzel)] text-base font-bold tracking-tight text-white group-hover:text-[#c9a84c] transition-colors duration-300">
                            {project.title}
                        </h3>

                        <p className="text-xs text-white/40 font-[family-name:var(--font-dm)] leading-[1.8] line-clamp-3 flex-1">
                            {project.description}
                        </p>

                        {/* Tech stack */}
                        {project.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.techStack.map((tech) => (
                                <span
                                key={tech}
                                className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] text-white/50 font-[family-name:var(--font-dm)] font-medium tracking-wide"
                                >
                                {tech}
                                </span>
                            ))}
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex gap-3 pt-2 border-t border-white/[0.06] mt-auto">
                            {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors duration-200 font-[family-name:var(--font-dm)]"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                GitHub
                            </a>
                            )}
                            {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors duration-200 font-[family-name:var(--font-dm)]"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                Live Demo
                            </a>
                            )}
                        </div>

                        </div>
                    </article>
                    ))}
                </div>
                )}
            </div>
        </section>
    );
}