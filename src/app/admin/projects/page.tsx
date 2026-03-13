'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
};

const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  imageUrl: '',
  githubUrl: '',
  liveUrl: '',
  featured: false,
  order: 0,
};

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  // ── FETCH ──
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      if (res.status === 401) { router.push('/admin'); return; }
      const data = await res.json();
      setProjects(data);
    } catch {
      console.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  // ── OPEN MODAL ──
  const openAdd = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      imageUrl: project.imageUrl ?? '',
      githubUrl: project.githubUrl ?? '',
      liveUrl: project.liveUrl ?? '',
      featured: project.featured,
      order: project.order,
    });
    setError('');
    setModalOpen(true);
  };

  // ── SUBMIT (ADD / EDIT) ──
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError('Title dan description wajib diisi.');
      return;
    }

    setSubmitting(true);
    setError('');

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean),
      imageUrl: form.imageUrl.trim() || null,
      githubUrl: form.githubUrl.trim() || null,
      liveUrl: form.liveUrl.trim() || null,
      featured: form.featured,
      order: Number(form.order),
    };

    try {
      const res = await fetch(
        editingProject ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects',
        {
          method: editingProject ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Terjadi kesalahan.');
        return;
      }

      setModalOpen(false);
      fetchProjects();
    } catch {
      setError('Gagal menyimpan project.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── DELETE ──
  const handleDelete = async (id: number) => {
    setDeleteId(id);
    try {
      await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch {
      console.error('Failed to delete');
    } finally {
      setDeleteId(null);
    }
  };

  // ── LOGOUT ──
  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {/* ── NAV ── */}
      <nav className="relative z-10 px-8 py-4 flex justify-between items-center border-b border-white/10 bg-white/5 backdrop-blur-2xl shadow-lg shadow-black/20">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-white/40 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
          </Link>
          <span className="text-white/20">/</span>
          <h1 className="text-base font-semibold text-white tracking-tight">Projects</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/60 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Logout
        </button>
      </nav>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Projects</h2>
            <p className="text-white/40 text-sm mt-1">
              {projects.length} project{projects.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold hover:bg-indigo-500/30 hover:border-indigo-500/50 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Project
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-indigo-400 animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 border border-white/10 rounded-2xl bg-white/5">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <p className="text-white/30 text-sm">Belum ada project. Klik "Add Project" untuk mulai.</p>
          </div>
        )}

        {/* Project List */}
        {!loading && projects.length > 0 && (
          <div className="flex flex-col gap-3">
            {projects.map(project => (
              <div
                key={project.id}
                className="group flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white truncate">{project.title}</h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold tracking-widest uppercase">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-white/40 text-xs line-clamp-1">{project.description}</p>
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-white/50 text-[10px]">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-white/30 text-[10px] self-center">+{project.techStack.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(project)}
                    className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all duration-200"
                    title="Edit"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deleteId === project.id}
                    className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50"
                    title="Delete"
                  >
                    {deleteId === project.id ? (
                      <div className="w-3.5 h-3.5 rounded-full border border-white/20 border-t-white/60 animate-spin" />
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL ADD / EDIT ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal box */}
          <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-sm font-semibold text-white">
                {editingProject ? 'Edit Project' : 'Add Project'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/30 hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 flex flex-col gap-4 max-h-[65vh] overflow-y-auto">

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {error}
                </div>
              )}

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 font-medium">Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. E-Commerce Platform"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 font-medium">Description <span className="text-red-400">*</span></label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Deskripsi singkat project..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all resize-none"
                />
              </div>

              {/* Tech Stack */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 font-medium">Tech Stack</label>
                <input
                  type="text"
                  value={form.techStack}
                  onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))}
                  placeholder="React, TypeScript, Next.js (pisahkan dengan koma)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 font-medium">Image URL</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              {/* GitHub & Live URL */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 font-medium">GitHub URL</label>
                  <input
                    type="text"
                    value={form.githubUrl}
                    onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 font-medium">Live URL</label>
                  <input
                    type="text"
                    value={form.liveUrl}
                    onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              {/* Order & Featured */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 font-medium">Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 font-medium">Featured</label>
                  <button
                    onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      form.featured
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                        : 'bg-white/5 border-white/10 text-white/40'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      form.featured ? 'border-indigo-400 bg-indigo-400' : 'border-white/20'
                    }`}>
                      {form.featured && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    {form.featured ? 'Yes' : 'No'}
                  </button>
                </div>
              </div>

            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold hover:bg-indigo-500/30 transition-all disabled:opacity-50"
              >
                {submitting && (
                  <div className="w-3.5 h-3.5 rounded-full border border-indigo-300/30 border-t-indigo-300 animate-spin" />
                )}
                {editingProject ? 'Save Changes' : 'Add Project'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}