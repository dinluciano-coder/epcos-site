'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    fetch(`/api/likes/${postId}`)
      .then(r => r.json())
      .then(data => setLiked(data.liked))
      .catch(() => {});
  }, [postId]);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    setLoading(true);

    // Spawn heart particles
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30,
      y: Math.random() * -60 - 10,
    }));
    setParticles(p => [...p, ...newParticles]);
    setTimeout(() => setParticles(p => p.filter(pt => !newParticles.find(np => np.id === pt.id))), 800);

    try {
      const res = await fetch(`/api/likes/${postId}`, { method: 'POST' });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(data.liked);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Particles */}
      {particles.map(p => (
        <span
          key={p.id}
          className="pointer-events-none absolute text-base select-none"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${p.x}px, ${p.y}px)`,
            animation: 'particle-float 0.8s ease-out forwards',
            opacity: 0,
          }}
        >
          ❤️
        </span>
      ))}

      <button
        onClick={handleLike}
        disabled={loading}
        title={liked ? 'Descurtir' : 'Curtir este post'}
        className={`
          group flex items-center gap-2 px-5 py-3 rounded-full border font-semibold text-sm
          transition-all duration-300 select-none
          ${liked
            ? 'bg-[#7B2D3B] border-[#7B2D3B] text-white shadow-lg shadow-[#7B2D3B]/30'
            : 'bg-white/5 border-white/10 text-[#9A9A9A] hover:border-[#7B2D3B]/60 hover:text-white'}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
          className={`w-5 h-5 transition-transform duration-300 ${liked ? 'scale-110' : 'group-hover:scale-110'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        <span>{likes}</span>
      </button>

      <style jsx>{`
        @keyframes particle-float {
          0%   { transform: translate(var(--tx, 0), var(--ty, 0)); opacity: 1; }
          100% { transform: translate(var(--tx, 0), calc(var(--ty, 0) - 40px)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
