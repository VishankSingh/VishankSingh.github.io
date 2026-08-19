import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import './Topbar.css';

export const Topbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTextRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const menuEl = menuRef.current;
    if (!menuEl) return;

    const footer = menuEl.querySelector('.menu-footer');

    // Initial state: menu hidden, elements transparent
    if (isFirstRender.current) {
      gsap.set(menuEl, { autoAlpha: 0, pointerEvents: 'none' });
      gsap.set(footer, { opacity: 0 });
      isFirstRender.current = false;
      return;
    }

    // GSAP Text Fade Animation (normal appear/disappear)
    const textEl = menuTextRef.current;
    if (textEl) {
      const targetText = isMenuOpen ? 'CLOSE' : 'MENU';
      gsap.to(textEl, {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.in',
        onComplete: () => {
          textEl.textContent = targetText;
          gsap.to(textEl, {
            opacity: 1,
            duration: 0.12,
            ease: 'power2.out'
          });
        }
      });
    }

    // GSAP Menu Overlay and Fade Animations (no movement, just show/hide simultaneously)
    if (isMenuOpen) {
      gsap.killTweensOf([menuEl, footer]);
      const tl = gsap.timeline();

      tl.to(menuEl, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out'
      });

      tl.to(footer, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out'
      }, '-=0.15');
    } else {
      gsap.killTweensOf([menuEl, footer]);
      const tl = gsap.timeline();

      tl.to(footer, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });

      tl.to(menuEl, {
        autoAlpha: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power2.in'
      }, '-=0.1');
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className={`topbar-header ${isMenuOpen ? 'menu-active' : ''}`}>
        <div className="topbar-container">
          <div className="topbar-logo">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              VISSSSS
            </Link>
          </div>
          <div className="topbar-controls">
            <button
              className="menu-button"
              onClick={handleMenuToggle}
              aria-expanded={isMenuOpen}
              aria-controls="full-page-navigation"
              id="topbar-menu-btn"
              data-cursor-padding="0"
            >
              <span ref={menuTextRef} className="menu-text">MENU</span>
            </button>
            <button
              className="theme-dot-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              id="topbar-theme-dot"
              data-cursor-padding="0"
            >
              <span className="theme-dot"></span>
            </button>
          </div>
        </div>
      </header>

      <nav
        ref={menuRef}
        className="full-page-menu"
        id="full-page-navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className="menu-container">
          <div className="menu-footer">
            <p className="copyright">© 2026 VISSSSS. ALL RIGHTS RESERVED.</p>
            <p className="location">HYDERABAD, INDIA (+5:30 GMT)</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
