import React, { useEffect, useState } from 'react';

/**
 * InteractiveBackground
 *
 * Props:
 *  - variant: "hero" | "login"
 *    "hero"  = subtle, ambient for the landing page
 *    "login" = fuller intensity for the /get-started page (default)
 *
 * Respects prefers-reduced-motion — falls back to static ambient circles.
 */
const InteractiveBackground = ({ variant = 'login' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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

  // ── Variant-specific tuning ────────────────────────────────────────────────
  const isHero = variant === 'hero';

  // Spotlight radius: hero is more diffuse, login is tighter and punchier
  const spotlightSize = isHero ? '700px' : '550px';
  // Dot layer overall opacity
  const dotLayerOpacity = isHero ? 0.30 : 0.60;
  // Base grid opacity
  const gridOpacity = isHero ? 0.07 : 0.15;
  // How aggressively the dot layer fades when not hovering
  const idleOpacity = isHero ? 0.25 : 0.50;
  // Parallax movement strength
  const parallaxStrength = isHero ? 0.008 : 0.015;
  // Ambient circle opacity
  const ambientOpacity = isHero ? 0.06 : 0.12;

  // Parallax
  const parallaxX = (mousePosition.x - window.innerWidth / 2) * -parallaxStrength;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * -parallaxStrength;

  const maskStyle = prefersReducedMotion
    ? {}
    : {
        maskImage: `radial-gradient(${spotlightSize} circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(${spotlightSize} circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        transition: 'opacity 0.4s ease-out',
        opacity: isHovering ? dotLayerOpacity : idleOpacity,
      };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base grid */}
      <div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
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
        style={{ background: `rgba(87, 73, 194, ${ambientOpacity})` }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
        style={{ background: `rgba(112, 74, 154, ${ambientOpacity})` }}
      />
    </div>
  );
};

export default InteractiveBackground;
