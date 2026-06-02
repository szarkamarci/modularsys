import React, { useEffect, useState } from 'react';

/**
 * InteractiveBackground
 *
 * Props:
 *  - variant: "hero" | "login"
 *    "hero"  = subtle, ambient for the landing page — full-viewport bleed with edge vignette
 *    "login" = fuller intensity for the /get-started page (default)
 *
 * Respects prefers-reduced-motion — falls back to static ambient circles only.
 */
const InteractiveBackground = ({ variant = 'login' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationFrameId;
    const handleMouseMove = (e) => {
      setIsHovering(true);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  const isHero = variant === 'hero';

  if (isHero) {
    // ── Hero variant ────────────────────────────────────────────────────────────
    // Renders at FIXED position covering the full viewport so it bleeds through
    // the max-w-7xl container edges. A multi-stop vignette mask on the outer
    // wrapper fades every edge to transparent, making it feel like an ambient
    // glow built into the page rather than a clipped rectangle.
    const spotlightSize = '650px';
    const parallaxStrength = 0.006;
    const parallaxX = (mousePosition.x - window.innerWidth / 2) * -parallaxStrength;
    const parallaxY = (mousePosition.y - window.innerHeight / 2) * -parallaxStrength;

    // Illuminated dot layer: visible only under the mouse spotlight
    const dotMask = prefersReducedMotion
      ? {}
      : {
          maskImage: `radial-gradient(${spotlightSize} circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(${spotlightSize} circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          opacity: isHovering ? 0.28 : 0.12,
          transition: 'opacity 0.5s ease-out',
        };

    // Outer vignette: fades all 4 edges to transparent so the grid dissolves
    // naturally into the surrounding page background without any hard crop.
    const outerVignette = {
      maskImage: `
        radial-gradient(
          ellipse 75% 65% at 50% 40%,
          black 0%,
          black 30%,
          rgba(0,0,0,0.6) 55%,
          rgba(0,0,0,0.2) 75%,
          transparent 100%
        )
      `,
      WebkitMaskImage: `
        radial-gradient(
          ellipse 75% 65% at 50% 40%,
          black 0%,
          black 30%,
          rgba(0,0,0,0.6) 55%,
          rgba(0,0,0,0.2) 75%,
          transparent 100%
        )
      `,
    };

    return (
      // Fixed, full-viewport, behind everything, pointer-events off
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={outerVignette}
        aria-hidden="true"
      >
        {/* Fine dot grid — always visible at very low opacity */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.10,
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(87, 73, 194, 0.6) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Mouse-illuminated overlay dot layer with parallax */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0"
            style={{
              ...dotMask,
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(87, 73, 194, 0.9) 1px, transparent 0)',
              backgroundSize: '28px 28px',
              willChange: 'transform',
            }}
          />
        )}

        {/* Soft ambient glow — top-left, very faint */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(87,73,194,0.07) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Soft ambient glow — bottom-right */}
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[50%] h-[50%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(112,74,154,0.05) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>
    );
  }

  // ── Login variant (default) ─────────────────────────────────────────────────
  const spotlightSize = '550px';
  const parallaxStrength = 0.015;
  const parallaxX = (mousePosition.x - window.innerWidth / 2) * -parallaxStrength;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * -parallaxStrength;

  const maskStyle = prefersReducedMotion
    ? {}
    : {
        maskImage: `radial-gradient(${spotlightSize} circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(${spotlightSize} circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        transition: 'opacity 0.4s ease-out',
        opacity: isHovering ? 0.60 : 0.50,
      };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base grid */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.15,
          backgroundImage:
            'linear-gradient(to right, rgba(87, 73, 194, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(87, 73, 194, 0.35) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Interactive illuminated dot layer */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-[-10%] w-[120%] h-[120%]"
          style={{
            ...maskStyle,
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(87, 73, 194, 0.5) 1px, transparent 0)',
            backgroundSize: '24px 24px',
            willChange: 'transform',
          }}
        />
      )}

      {/* Ambient blur circles */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
        style={{ background: 'rgba(87, 73, 194, 0.12)' }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
        style={{ background: 'rgba(112, 74, 154, 0.12)' }}
      />
    </div>
  );
};

export default InteractiveBackground;
