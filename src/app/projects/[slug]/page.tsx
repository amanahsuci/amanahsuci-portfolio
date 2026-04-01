// import { notFound } from "next/navigation";
// import Link from "next/link";
// import ImageCarousel from "@/src/components/ImageCarousel";
// import { prisma } from "@/src/lib/prisma";

// type Project = {
//   id: string;
//   slug: string;
//   title: string;
//   description: string;
//   background: string | null;
//   method: string | null;
//   result: string | null;
//   images: string[];
//   organization: string | null;
//   startDate: string | null;
//   endDate: string | null;
//   techStack: string[];
//   githubUrl: string | null;
//   liveUrl: string | null;
//   featured: boolean;
// };

// async function getProject(slug: string): Promise<Project | null> {
//   try {
//     const project = await prisma.projects.findUnique({
//       where: { slug },
//     });
//     return project as Project | null;
//   } catch {
//     return null;
//   }
// }

// export default async function ProjectDetailPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const project = await getProject(slug);
//   if (!project) return notFound();

//   return (
//     <main className="min-h-screen bg-[#0a0f1a] text-white">
//       <div className="max-w-6xl mx-auto px-6 py-12">

//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-white/40 mb-10">
//           <Link href="/" className="hover:text-white transition-colors">Home</Link>
//           <span>/</span>
//           <Link href="/#projects" className="hover:text-white transition-colors">Projects</Link>
//           <span>/</span>
//           <span className="text-white">{project.title}</span>
//         </div>

//         {/* Hero */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
//           {/* Kiri */}
//           <div className="flex flex-col justify-center">
//             <h1 className="text-4xl font-bold mb-3">{project.title}</h1>

//             {(project.organization || project.startDate) && (
//               <p className="text-white/40 text-sm mb-4">
//                 {project.organization && <span>{project.organization}</span>}
//                 {project.organization && project.startDate && <span> • </span>}
//                 {project.startDate && <span>{project.startDate}</span>}
//                 {project.endDate && <span> - {project.endDate}</span>}
//               </p>
//             )}

//             <p className="text-white/70 leading-relaxed mb-6">{project.description}</p>

//             <div className="flex gap-3 flex-wrap">
//               {project.githubUrl && (
//                 <a
//                   href={project.githubUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-5 py-2.5 rounded-xl border border-white/20 text-white/80 text-sm font-medium hover:bg-white/10 transition-all"
//                 >
//                   GitHub Repository
//                 </a>
//               )}
//               {project.liveUrl && (
//                 <a
//                   href={project.liveUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
//                 >
//                   Live Demo
//                 </a>
//               )}
//             </div>
//           </div>

//           {/* Kanan: Carousel */}
//           <ImageCarousel images={project.images} />
//         </div>

//         {/* Detail + Tech Stack */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

//           {/* Kiri: Background, Method, Result */}
//           <div className="lg:col-span-2 flex flex-col gap-10">
//             {project.background && (
//               <section>
//                 <h2 className="text-lg font-semibold mb-3">Background</h2>
//                 <p className="text-white/60 leading-relaxed">{project.background}</p>
//               </section>
//             )}
//             {project.method && (
//               <section>
//                 <h2 className="text-lg font-semibold mb-3">Method / Strategy</h2>
//                 <p className="text-white/60 leading-relaxed">{project.method}</p>
//               </section>
//             )}
//             {project.result && (
//               <section>
//                 <h2 className="text-lg font-semibold mb-3">Result / Output</h2>
//                 <p className="text-white/60 leading-relaxed">{project.result}</p>
//               </section>
//             )}
//           </div>

//           {/* Kanan: Tech Stack */}
//           {project.techStack.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold mb-6">Tech Stack</h2>
//               <div className="flex flex-wrap gap-2">
//                 {project.techStack.map((tech) => (
//                   <span
//                     key={tech}
//                     className="px-3 py-1.5 rounded-full border border-white/20 text-white/70 text-sm"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Back */}
//         <div className="border-t border-white/10 mt-16 pt-8">
//           <Link
//             href="/#projects"
//             className="text-sm text-white/40 hover:text-white transition-colors"
//           >
//             ← Back to Projects
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }


import { notFound } from "next/navigation";
import Link from "next/link";
import ImageCarousel from "@/src/components/ImageCarousel";
import { prisma } from "@/src/lib/prisma";

type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  background: string | null;
  method: string | null;
  result: string | null;
  images: string[];
  organization: string | null;
  startDate: string | null;
  endDate: string | null;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
};

async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await prisma.projects.findUnique({
      where: { slug },
    });
    return project as Project | null;
  } catch {
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.05)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/30 mb-12 font-[family-name:var(--font-dm)] tracking-wide">
          <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[#c9a84c] transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-white/60">{project.title}</span>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          {/* Kiri */}
          <div className="flex flex-col justify-center">

            {/* Label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#c9a84c]/50" />
              <p className="text-xs text-[#c9a84c]/70 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)]">
                Project Detail
              </p>
            </div>

            <h1 className="font-[family-name:var(--font-cinzel)] text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-tight leading-tight mb-3">
              {project.title}
            </h1>

            {(project.organization || project.startDate) && (
              <p className="text-white/40 text-sm mb-5 font-[family-name:var(--font-dm)]">
                {project.organization && <span>{project.organization}</span>}
                {project.organization && project.startDate && <span> • </span>}
                {project.startDate && <span>{project.startDate}</span>}
                {project.endDate && <span> – {project.endDate}</span>}
              </p>
            )}

            <p className="text-white/60 leading-[1.8] mb-8 font-[family-name:var(--font-dm)] text-sm">
              {project.description}
            </p>

            <div className="flex gap-3 flex-wrap">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white/70 text-sm font-[family-name:var(--font-dm)] font-medium hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c9a84c] text-[#0f0f0f] text-sm font-[family-name:var(--font-dm)] font-bold hover:bg-[#c9a84c]/90 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Kanan: Carousel */}
          <ImageCarousel images={project.images} />
        </div>

        {/* Detail + Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Kiri: Background, Method, Result */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            {project.background && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px bg-[#c9a84c]/50" />
                  <h2 className="text-xs text-[#c9a84c]/70 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)]">
                    Background
                  </h2>
                </div>
                <p className="text-white/50 leading-[1.9] font-[family-name:var(--font-dm)] text-sm">
                  {project.background}
                </p>
              </section>
            )}
            {project.method && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px bg-[#c9a84c]/50" />
                  <h2 className="text-xs text-[#c9a84c]/70 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)]">
                    Method / Strategy
                  </h2>
                </div>
                <p className="text-white/50 leading-[1.9] font-[family-name:var(--font-dm)] text-sm">
                  {project.method}
                </p>
              </section>
            )}
            {project.result && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px bg-[#c9a84c]/50" />
                  <h2 className="text-xs text-[#c9a84c]/70 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)]">
                    Result / Output
                  </h2>
                </div>
                <p className="text-white/50 leading-[1.9] font-[family-name:var(--font-dm)] text-sm">
                  {project.result}
                </p>
              </section>
            )}
          </div>

          {/* Kanan: Tech Stack */}
          {project.techStack.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-[#c9a84c]/50" />
                <h2 className="text-xs text-[#c9a84c]/70 tracking-[0.2em] uppercase font-[family-name:var(--font-dm)]">
                  Tech Stack
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] text-white/50 font-[family-name:var(--font-dm)] font-medium tracking-wide hover:border-[#c9a84c]/30 hover:text-[#c9a84c]/70 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Back */}
        <div className="border-t border-white/[0.06] mt-20 pt-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-white/30 font-[family-name:var(--font-dm)] hover:text-[#c9a84c] transition-colors duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>
    </main>
  );
}