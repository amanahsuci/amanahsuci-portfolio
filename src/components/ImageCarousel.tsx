'use client'

import { useState } from 'react';

export default function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <span className="text-white/20 text-sm">No images</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
        <img
          src={images[current]}
          alt={`Project image ${current + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-white' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
