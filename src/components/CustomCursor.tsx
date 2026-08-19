import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const activeTargetRef = useRef<HTMLElement | null>(null);

  // Cache the page-relative bounding box of the active target to prevent layout thrashing
  const targetPageRectRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    // Only initialize custom cursor on devices that support a fine pointer (like a mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const cursorEl = cursorRef.current;
    const dotEl = dotRef.current;
    if (!cursorEl || !dotEl) return;

    // Use GSAP's quickTo for high-performance, smooth cursor lagging/following
    const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.15, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      // Toggle visibility directly on the DOM node to bypass React rendering cycles
      cursorEl.classList.add('is-visible');

      const activeTarget = activeTargetRef.current;
      const pageRect = targetPageRectRef.current;

      if (activeTarget && pageRect) {
        // Convert page-relative coordinates back to viewport-relative coords to check against clientX/Y
        const left = pageRect.left - window.scrollX;
        const top = pageRect.top - window.scrollY;
        const right = left + pageRect.width;
        const bottom = top + pageRect.height;
        const padding = 0; // padding outside target element bounds before releasing

        const isInside =
          e.clientX >= left - padding &&
          e.clientX <= right + padding &&
          e.clientY >= top - padding &&
          e.clientY <= bottom + padding;

        if (isInside) {
          // Target centers
          const cx = left + pageRect.width / 2;
          const cy = top + pageRect.height / 2;

          // Mouse offset from target center
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;

          // Magnetic pull: offset cursor center slightly towards the mouse
          const pullFactor = 0.15;
          const targetX = cx + dx * pullFactor;
          const targetY = cy + dy * pullFactor;

          xTo(targetX);
          yTo(targetY);
        } else {
          // Mouse moved sufficiently out: release target
          activeTargetRef.current = null;
          targetPageRectRef.current = null;

          // "Boink" back to a circular shape
          gsap.to(dotEl, {
            width: 10,
            height: 10,
            borderRadius: '9999px',
            duration: 0.6,
            ease: 'elastic.out(1.1, 0.4)',
            overwrite: 'auto',
          });

          // Resume standard tracking
          xTo(e.clientX);
          yTo(e.clientY);
        }
      } else {
        // Standard mouse tracking
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    // Event delegation to check if hovering interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, [role="button"], input, select, textarea, .interactive'
      ) as HTMLElement;

      if (interactiveEl) {
        if (activeTargetRef.current !== interactiveEl) {
          activeTargetRef.current = interactiveEl;

          const rect = interactiveEl.getBoundingClientRect();
          // Store page-relative coordinates so they are independent of viewport scrolling,
          // avoiding calling getBoundingClientRect() in handleMouseMove.
          targetPageRectRef.current = {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height,
          };

          // Read custom padding from data-cursor-padding attribute (defaults to 10px)
          const paddingAttr = interactiveEl.getAttribute('data-cursor-padding');
          const cursorPadding = paddingAttr !== null ? parseFloat(paddingAttr) : 10;

          // Morph dot to match target element dimensions with padding and a perfect pill shape
          gsap.to(dotEl, {
            width: rect.width + cursorPadding,
            height: rect.height + cursorPadding,
            borderRadius: '9999px',
            duration: 0.35,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      }
    };

    // Handle mouse leaving and entering the browser window
    const handleMouseLeave = () => {
      cursorEl.classList.remove('is-visible');
    };

    const handleMouseEnter = () => {
      cursorEl.classList.add('is-visible');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      // Clean up running animations
      gsap.killTweensOf(dotEl);
      gsap.killTweensOf(cursorEl);
    };
  }, []); // Empty dependency array ensures we only bind listeners once on mount

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
};

export default CustomCursor;

