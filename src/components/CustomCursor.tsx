import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

// Custom cursor tooltip component registry.
// Map keys used in `data-cursor-tooltip` to any React functional component.
const TOOLTIP_REGISTRY: Record<string, React.ReactNode> = {
  // 'resume-preview': (
  //   <div className="tooltip-resume">
  //     <div className="tooltip-title">Resume.pdf</div>
  //     <div className="tooltip-desc">View CV (ML & Systems)</div>
  //   </div>
  // ),
  'contact-email': (
    <div className="tooltip-contact">
      <span className="tooltip-icon">✉</span> vishanksinghh@gmail.com
    </div>
  ),
};

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipInnerRef = useRef<HTMLDivElement>(null);
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null);

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
    const tooltipEl = tooltipRef.current;
    const tooltipInnerEl = tooltipInnerRef.current;
    if (!cursorEl || !dotEl || !tooltipEl || !tooltipInnerEl) return;

    // Use GSAP's quickTo for high-performance, smooth cursor lagging/following
    const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.15, ease: 'power3.out' });

    // Animate the tooltip wrapper in lockstep with the cursor position
    const tooltipXTo = gsap.quickTo(tooltipEl, 'x', { duration: 0.15, ease: 'power3.out' });
    const tooltipYTo = gsap.quickTo(tooltipEl, 'y', { duration: 0.15, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      // Toggle visibility directly on the DOM nodes to bypass React rendering cycles
      cursorEl.classList.add('is-visible');
      tooltipEl.classList.add('is-visible');

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
          tooltipXTo(targetX);
          tooltipYTo(targetY);
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

          // Fade out the tooltip content smoothly and return it to default offset
          gsap.to(tooltipInnerEl, {
            x: 10 / 2 + 16, // circle default position (21px offset)
            yPercent: -50,
            scale: 0.92,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => {
              setTooltipContent(null);
            },
          });

          // Resume standard tracking
          xTo(e.clientX);
          yTo(e.clientY);
          tooltipXTo(e.clientX);
          tooltipYTo(e.clientY);
        }
      } else {
        // Standard mouse tracking
        xTo(e.clientX);
        yTo(e.clientY);
        tooltipXTo(e.clientX);
        tooltipYTo(e.clientY);
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
          const targetWidth = rect.width + cursorPadding;
          const targetHeight = rect.height + cursorPadding;

          // Morph dot to match target element dimensions with padding and a perfect pill shape
          gsap.to(dotEl, {
            width: targetWidth,
            height: targetHeight,
            borderRadius: '9999px',
            duration: 0.35,
            ease: 'power3.out',
            overwrite: 'auto',
          });

          // 1. Read local custom tooltip element if defined on the "div side" (child selector)
          const localTooltip = interactiveEl.querySelector('.cursor-tooltip');
          let hasTooltip = false;

          if (localTooltip) {
            setTooltipContent(
              <div dangerouslySetInnerHTML={{ __html: localTooltip.innerHTML }} />
            );
            hasTooltip = true;
          } else {
            // 2. Fallback: read and map tooltip content from global registry or raw data-attribute
            const tooltipAttr = interactiveEl.getAttribute('data-cursor-tooltip');
            if (tooltipAttr) {
              if (tooltipAttr in TOOLTIP_REGISTRY) {
                setTooltipContent(TOOLTIP_REGISTRY[tooltipAttr]);
              } else {
                setTooltipContent(tooltipAttr);
              }
              hasTooltip = true;
            }
          }

          if (hasTooltip) {
            // Calculate correct offset dynamically relative to the target's expanded width
            const offsetLeft = targetWidth / 2 + 16;

            // GSAP handles coordinates, centering, and scale/opacity in sync
            gsap.to(tooltipInnerEl, {
              x: offsetLeft,
              yPercent: -50,
              scale: 1,
              opacity: 1,
              duration: 0.35,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          } else {
            // Clear tooltip content and transition out
            gsap.to(tooltipInnerEl, {
              x: targetWidth / 2 + 16,
              yPercent: -50,
              scale: 0.92,
              opacity: 0,
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
              onComplete: () => {
                setTooltipContent(null);
              },
            });
          }
        }
      }
    };

    // Handle mouse leaving and entering the browser window
    const handleMouseLeave = () => {
      cursorEl.classList.remove('is-visible');
      tooltipEl.classList.remove('is-visible');
    };

    const handleMouseEnter = () => {
      cursorEl.classList.add('is-visible');
      tooltipEl.classList.add('is-visible');
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
      gsap.killTweensOf(tooltipEl);
      gsap.killTweensOf(tooltipInnerEl);
    };
  }, []); // Empty dependency array ensures we only bind listeners once on mount

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        aria-hidden="true"
      >
        <div ref={dotRef} className="custom-cursor-dot" />
      </div>
      <div
        ref={tooltipRef}
        className="custom-cursor-tooltip"
        aria-hidden="true"
      >
        <div ref={tooltipInnerRef} className="custom-cursor-tooltip-inner">
          {tooltipContent}
        </div>
      </div>
    </>
  );
};

export default CustomCursor;

