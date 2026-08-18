import React, { useEffect, useRef, useState } from 'react';
import './AsciiImage.css';

interface AsciiImageProps {
  url: string;
  charSet?: string;
  resolution?: number; // Kept for interface compatibility
  scale?: number;      // Scales the size of cells (resolution multiplier)
  color?: boolean;
  invert?: boolean;
  className?: string;
  avoidanceRadius?: number;
}

interface Particle {
  x0: number;
  y0: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
  active: boolean;
}

interface ColorGroup {
  colorStr: string;
  particles: Particle[];
}

export const AsciiImage: React.FC<AsciiImageProps> = ({
  url,
  charSet = ' .:-=+*#%@',
  scale = 1,
  color = false,
  invert = false,
  className = '',
  avoidanceRadius = 100,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    let particles: Particle[] = [];
    let colorGroups: ColorGroup[] = [];
    let animationFrameId: number;

    const mouse = { x: -9999, y: -9999 };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;

    // Helper to generate the character grid particles based on image details and size
    const regenerateParticles = (cols: number, rows: number, cellWidth: number, cellHeight: number) => {
      if (!img.complete || img.width === 0) return;

      const offscreen = document.createElement('canvas');
      offscreen.width = cols;
      offscreen.height = rows;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      const containerAspect = width / height;
      const imgAspect = img.width / img.height;
      let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

      if (containerAspect > imgAspect) {
        sHeight = img.width / containerAspect;
        sy = (img.height - sHeight) / 2;
      } else {
        sWidth = img.height * containerAspect;
        sx = (img.width - sWidth) / 2;
      }

      offCtx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      const charList = charSet.split('');
      const maxCharIdx = charList.length - 1;
      const tempParticles: Particle[] = [];
      const groupsMap = new Map<string, Particle[]>();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = (r * cols + c) * 4;
          const red = imgData[index];
          const green = imgData[index + 1];
          const blue = imgData[index + 2];
          const alpha = imgData[index + 3];

          let brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
          if (alpha === 0) {
            brightness = 1.0;
          }

          let charIdx = Math.round((1.0 - brightness) * maxCharIdx);
          if (invert) {
            charIdx = maxCharIdx - charIdx;
          }
          const char = charList[charIdx] || ' ';

          if (char === ' ') continue;

          const x0 = c * cellWidth + cellWidth / 2;
          const y0 = r * cellHeight + cellHeight / 2;

          const qRed = Math.round(red / 12) * 12;
          const qGreen = Math.round(green / 12) * 12;
          const qBlue = Math.round(blue / 12) * 12;
          const qColor = `rgb(${qRed},${qGreen},${qBlue})`;

          const p: Particle = {
            x0,
            y0,
            x: x0,
            y: y0,
            vx: 0,
            vy: 0,
            char,
            color: qColor,
            active: false,
          };

          tempParticles.push(p);

          if (!groupsMap.has(qColor)) {
            groupsMap.set(qColor, []);
          }
          groupsMap.get(qColor)!.push(p);
        }
      }

      particles = tempParticles;

      const tempGroups: ColorGroup[] = [];
      groupsMap.forEach((pList, colorStr) => {
        tempGroups.push({ colorStr, particles: pList });
      });
      colorGroups = tempGroups;
    };

    img.onload = () => {
      const cellWidth = Math.max(6, Math.round(10 * scale));
      const cellHeight = Math.max(8, Math.round(14 * scale));
      const cols = Math.ceil(width / cellWidth);
      const rows = Math.ceil(height / cellHeight);

      regenerateParticles(cols, rows, cellWidth, cellHeight);
      setIsLoaded(true);

      if (!animationFrameId) {
        animate();
      }
    };

    // 3. Render and Physics loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const cellHeight = Math.max(8, Math.round(14 * scale));
      ctx.font = `bold ${cellHeight - 2}px 'Courier New', Courier, monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      const radiusSq = avoidanceRadius * avoidanceRadius;

      // 3a. Update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx0 = p.x0 - mouse.x;
        const dy0 = p.y0 - mouse.y;
        const distSq0 = dx0 * dx0 + dy0 * dy0;

        if (distSq0 < radiusSq) {
          p.active = true;
        }

        if (p.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            if (dist > 0) {
              const force = (avoidanceRadius - dist) / avoidanceRadius;
              const repulsionPower = force * 6.5;
              p.vx += (dx / dist) * repulsionPower;
              p.vy += (dy / dist) * repulsionPower;
            }
          }

          const ax = (p.x0 - p.x) * 0.08;
          const ay = (p.y0 - p.y) * 0.08;
          p.vx += ax;
          p.vy += ay;

          p.vx *= 0.85;
          p.vy *= 0.85;

          p.x += p.vx;
          p.y += p.vy;

          const homeDx = p.x - p.x0;
          const homeDy = p.y - p.y0;
          const distToHomeSq = homeDx * homeDx + homeDy * homeDy;

          if (distToHomeSq < 0.01 && (p.vx * p.vx + p.vy * p.vy) < 0.01) {
            p.x = p.x0;
            p.y = p.y0;
            p.vx = 0;
            p.vy = 0;
            p.active = false;
          }
        }
      }

      // 3b. Batched drawing (snapping render coordinates to integer pixels to avoid text blur)
      if (color) {
        for (let g = 0; g < colorGroups.length; g++) {
          const group = colorGroups[g];
          ctx.fillStyle = group.colorStr;
          for (let i = 0; i < group.particles.length; i++) {
            const p = group.particles[i];
            ctx.fillText(p.char, Math.round(p.x), Math.round(p.y));
          }
        }
      } else {
        const themeColor = getComputedStyle(container).getPropertyValue('--text-muted').trim() || '#52525b';
        ctx.fillStyle = themeColor;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.fillText(p.char, Math.round(p.x), Math.round(p.y));
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
    };

    const handleTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Resize Observer for robust initial sizing and container reflow tracking
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const { width: entryW, height: entryH } = entry.contentRect;

      width = entryW || container.clientWidth || window.innerWidth;
      height = entryH || container.clientHeight || window.innerHeight;

      // Fit layout to device resolution scaling
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const cellWidth = Math.max(6, Math.round(10 * scale));
      const cellHeight = Math.max(8, Math.round(14 * scale));
      const cols = Math.ceil(width / cellWidth);
      const rows = Math.ceil(height / cellHeight);

      if (img.complete && img.width > 0) {
        regenerateParticles(cols, rows, cellWidth, cellHeight);
      }
    });

    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [url, charSet, scale, color, invert, avoidanceRadius]);

  return (
    <div
      ref={containerRef}
      className={`ascii-image-container ${isLoaded ? 'loaded' : ''} ${className}`}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default AsciiImage;
