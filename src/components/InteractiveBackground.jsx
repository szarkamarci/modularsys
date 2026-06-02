import React, { useEffect, useState } from 'react';

const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      setIsHovering(true);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const maskStyle = {
    maskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
    transition: 'opacity 0.3s ease-out',
    opacity: isHovering ? 1 : 0.5,
  };

  // Parallax calculations based on mouse position relative to center of screen
  const parallaxX = (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * -0.015;
  const parallaxY = (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * -0.015;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(87, 73, 194, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(87, 73, 194, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Interactive Dot Layer with Parallax and Illumination Mask */}
      <div 
        className="absolute inset-[-10%] w-[120%] h-[120%] opacity-60"
        style={{
          ...maskStyle,
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(87, 73, 194, 0.4) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          willChange: 'transform, mask-image',
        }}
      />

      {/* Ambient static blur circles for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default InteractiveBackground;
