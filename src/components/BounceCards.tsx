"use client"

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface BounceCardsProps {
  className?: string;
  images?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  className = '',
  images = [],
  enableHover = false
}: BounceCardsProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(120);

  // ✅ Responsive spread (stable)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      let value = 50; // mobile (tighter = better centering)
      if (w >= 640) value = 80;
      if (w >= 768) value = 120;
      if (w >= 1024) value = 160;
      if (w >= 1280) value = 200;

      setSpread(value);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ✅ FIX: compute transforms ONCE per render (not inside loops)
  const mid = (images.length - 1) / 2;

  const transforms = images.map((_, i) => {
    const pos = i - mid;

    return `
      rotate(${pos * -5}deg)
      translate(${pos * spread}px)
    `;
  });

  // Entry animation
  useEffect(() => {
    if (!images || images.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: 0.06,
          ease: 'elastic.out(1, 0.8)',
          delay: 0.5
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [images]);

  // Helpers
  const getNoRotationTransform = (t: string) =>
    t.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');

  const getPushedTransform = (base: string, offset: number) => {
    const match = base.match(/translate\(([-0-9.]+)px\)/);

    if (!match) return `${base} translate(${offset}px)`;

    const current = parseFloat(match[1]);
    return base.replace(
      /translate\(([-0-9.]+)px\)/,
      `translate(${current + offset}px)`
    );
  };

  // ✅ Hover
  const pushSiblings = (hovered: number) => {
    if (!enableHover) return;

    const q = gsap.utils.selector(containerRef);
    const offset = spread * 0.8;

    images.forEach((_, i) => {
      const el = q(`.card-${i}`);
      gsap.killTweensOf(el);

      const base = transforms[i];

      if (i === hovered) {
        gsap.to(el, {
          transform: getNoRotationTransform(base),
          duration: 0.4,
          ease: 'back.out(1.4)',
        });
      } else {
        const dir = i < hovered ? -offset : offset;

        gsap.to(el, {
          transform: getPushedTransform(base, dir),
          duration: 0.4,
          ease: 'back.out(1.4)',
        });
      }
    });
  };

  // ✅ FIX: reset uses SAME transforms source
  const resetSiblings = () => {
    if (!enableHover) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const el = q(`.card-${i}`);

      gsap.to(el, {
        transform: transforms[i],
        duration: 0.4,
        ease: 'back.out(1.4)',
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx} absolute
            w-[130px]
            sm:w-[180px]
            md:w-[220px]
            lg:w-[280px]
            xl:w-[340px]
            aspect-square
            border-8 border-white
            rounded-[30px]
            overflow-hidden`}
          style={{
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            transform: transforms[idx]
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img
            src={src}
            className="w-full h-full object-cover"
            alt={`card-${idx}`}
          />
        </div>
      ))}
    </div>
  );
}