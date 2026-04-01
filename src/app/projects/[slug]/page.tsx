// import { notFound } from "next/navigation";
// import Link from "next/link";
// import ImageCarousel from "@/src/components/ImageCarousel";

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
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${slug}`,
//       { cache: "no-store" }
//     );
//     if (!res.ok) return null;
//     return res.json();
//   } catch {
//     return null;
//   }
// }

// export default async function ProjectDetailPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const project = await getProject(params.slug);
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

//           {/* right: Carousel */}
//           <ImageCarousel images={project.images} />
//         </div>

//         {/* Detail + Tech Stack */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

//           {/* left: Background, Method, Result */}
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

//           {/* right: Tech Stack */}
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
    <main className="min-h-screen bg-[#0a0f1a] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-white transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-white">{project.title}</span>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Kiri */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-3">{project.title}</h1>

            {(project.organization || project.startDate) && (
              <p className="text-white/40 text-sm mb-4">
                {project.organization && <span>{project.organization}</span>}
                {project.organization && project.startDate && <span> • </span>}
                {project.startDate && <span>{project.startDate}</span>}
                {project.endDate && <span> - {project.endDate}</span>}
              </p>
            )}

            <p className="text-white/70 leading-relaxed mb-6">{project.description}</p>

            <div className="flex gap-3 flex-wrap">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-white/80 text-sm font-medium hover:bg-white/10 transition-all"
                >
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
                >
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
          <div className="lg:col-span-2 flex flex-col gap-10">
            {project.background && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Background</h2>
                <p className="text-white/60 leading-relaxed">{project.background}</p>
              </section>
            )}
            {project.method && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Method / Strategy</h2>
                <p className="text-white/60 leading-relaxed">{project.method}</p>
              </section>
            )}
            {project.result && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Result / Output</h2>
                <p className="text-white/60 leading-relaxed">{project.result}</p>
              </section>
            )}
          </div>

          {/* Kanan: Tech Stack */}
          {project.techStack.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-6">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full border border-white/20 text-white/70 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Back */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <Link
            href="/#projects"
            className="text-sm text-white/40 hover:text-white transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </main>
  );
}