import React, { useEffect, useRef } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

export function ParallaxBackground({ children }: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbs = [
    { color: 'from-purple-600/30 to-indigo-600/30', size: 'w-96 h-96', speed: 0.03 },
    { color: 'from-indigo-600/20 to-violet-600/20', size: 'w-80 h-80', speed: 0.02 },
    { color: 'from-violet-600/20 to-fuchsia-600/20', size: 'w-72 h-72', speed: 0.04 },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll('.parallax-orb');
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height } = container.getBoundingClientRect();
      mouseX = (clientX / width - 0.5) * 2;
      mouseY = (clientY / height - 0.5) * 2;
    };

    const animate = () => {
      orbs.forEach((orb, index) => {
        const speed = parseFloat(orb.getAttribute('data-speed') || '0');
        currentX += (mouseX * speed - currentX) * 0.1;
        currentY += (mouseY * speed - currentY) * 0.1;
        orb.style.transform = `translate(${currentX * 100}px, ${currentY * 100}px)`;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`parallax-orb absolute rounded-full bg-gradient-to-br ${orb.color} ${orb.size} blur-3xl opacity-40 transition-transform duration-100 ease-out`}
          style={{
            left: `${(index + 1) * 25}%`,
            top: `${(index + 1) * 20}%`,
            transform: 'translate(-50%, -50%)',
          }}
          data-speed={orb.speed}
        />
      ))}
      {children}
    </div>
  );
}