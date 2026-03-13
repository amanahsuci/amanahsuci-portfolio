'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type Skill = {
  id: number;
  name: string;
  imageUrl: string | null;
};

const emptyForm = {
  name: '',
  imageUrl: '',
};

export default function AdminSkills() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  // ── FETCH ──
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/skills');
      if (res.status === 401) { router.push('/admin'); return; }
      const data = await res.json();
      setSkills(data);
    } catch {
      console.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  // ── OPEN MODAL ──
  const openAdd = () => {
    setEditingSkill(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      imageUrl: skill.imageUrl ?? '',
    });
    setError('');
    setModalOpen(true);
  };

  // ── SUBMIT (ADD / EDIT) ──
  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setError('Nama skill wajib diisi.');
      return;
    }

    setSubmitting(true);
    setError('');

    const payload = {
      name: form.name.trim(),
      imageUrl: form.imageUrl.trim() || null,
    };

    try {
      const res = await fetch(
        editingSkill ? `/api/admin/skills/${editingSkill.id}` : '/api/admin/skills',
        {
          method: editingSkill ? 'PUT' : 'POST',
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
      fetchSkills();
    } catch {
      setError('Gagal menyimpan skill.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── DELETE ──
  const handleDelete = async (id: number) => {
    setDeleteId(id);
    try {
      await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      setSkills(prev => prev.filter(s => s.id !== id));
    } catch {
      console.error('Failed to delete');
    } finally {
      setDeleteId(null);
    }
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
          <h1 className="text-base font-semibold text-white tracking-tight">Skills</h1>
        </div>
        <button
          onClick={() => router.push('/')}
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
            <h2 className="text-2xl font-bold text-white tracking-tight">Skills</h2>
            <p className="text-white/40 text-sm mt-1">
              {skills.length} skill{skills.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-semibold hover:bg-violet-500/30 hover:border-violet-500/50 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Skill
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-violet-400 animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && skills.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 border border-white/10 rounded-2xl bg-white/5">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
              </svg>
            </div>
            <p className="text-white/30 text-sm">Belum ada skill. Klik "Add Skill" untuk mulai.</p>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && skills.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skills.map(skill => (
              <div
                key={skill.id}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200"
              >
                {/* Icon / Image */}
                <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  {skill.imageUrl ? (
                    <Image
                      src={skill.imageUrl}
                      alt={skill.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <span className="text-lg font-black text-white/20">
                      {skill.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Name */}
                <p className="text-xs font-semibold text-white/70 text-center truncate w-full">
                  {skill.name}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => openEdit(skill)}
                    className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all"
                    title="Edit"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    disabled={deleteId === skill.id}
                    className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                    title="Delete"
                  >
                    {deleteId === skill.id ? (
                      <div className="w-3 h-3 rounded-full border border-white/20 border-t-white/60 animate-spin" />
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <div className="relative w-full max-w-sm bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-sm font-semibold text-white">
                {editingSkill ? 'Edit Skill' : 'Add Skill'}
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
            <div className="px-6 py-5 flex flex-col gap-4">

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {error}
                </div>
              )}

              {/* Preview image */}
              {form.imageUrl && (
                <div className="flex justify-center">
                  <div className="relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                    <Image
                      src={form.imageUrl}
                      alt="preview"
                      fill
                      className="object-contain p-2"
                      onError={() => setForm(f => ({ ...f, imageUrl: '' }))}
                    />
                  </div>
                </div>
              )}

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 font-medium">
                  Nama Skill <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. React, TypeScript, Node.js"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 font-medium">Image URL</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://... (ikon skill)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                />
                <p className="text-[10px] text-white/20">
                  Tip: pakai URL dari{' '}
                  <a href="https://devicons.railway.app" target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">
                    devicons.railway.app
                  </a>
                </p>
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
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-semibold hover:bg-violet-500/30 transition-all disabled:opacity-50"
              >
                {submitting && (
                  <div className="w-3.5 h-3.5 rounded-full border border-violet-300/30 border-t-violet-300 animate-spin" />
                )}
                {editingSkill ? 'Save Changes' : 'Add Skill'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}