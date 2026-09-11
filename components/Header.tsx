"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('usa-js-mobile-nav--active');
    } else {
      document.body.classList.remove('usa-js-mobile-nav--active');
    }
    return () => {
      document.body.classList.remove('usa-js-mobile-nav--active');
    };
  }, [mobileMenuOpen]);

  const isIntroActive =
    !pathname ||
    pathname === '/' ||
    pathname === '/introduction' ||
    pathname.includes('introduction');

  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div
        className={`usa-overlay ${mobileMenuOpen ? 'is-visible' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <header className="usa-header usa-header--extended" role="banner">
        <div
          className="usa-navbar"
          style={{
            minHeight: '4.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="usa-logo" id="extended-logo" style={{ margin: '0.75rem 0', maxWidth: '100%' }}>
            <em className="usa-logo__text" style={{ fontStyle: 'normal' }}>
              <Link
                href="/"
                title="Tri-Cities Area MPO (TCAMPO) Home"
                aria-label="Tri-Cities Area MPO (TCAMPO) Home"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="https://input-v2.netlify.app/MPO_Logo.jpg"
                    alt="Tri-Cities Area MPO (TCAMPO) Logo"
                    style={{
                      height: '40px',
                      width: 'auto',
                      display: 'block',
                      objectFit: 'contain',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/lrtp2045/img/cuuats-logo.svg';
                    }}
                  />
                </div>
                <span
                  style={{
                    color: '#1b1b1b',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    letterSpacing: '-0.01em',
                    fontFamily: 'Montserrat, sans-serif',
                    lineHeight: 1.25,
                  }}
                >
                  Tri-Cities Area MPO (TCAMPO)
                </span>
              </Link>
            </em>
          </div>
          <button
            className="usa-menu-btn"
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            Menu
          </button>
        </div>

        <nav
          role="navigation"
          className={`usa-nav ${mobileMenuOpen ? 'is-visible' : ''}`}
          aria-label="Main site navigation"
        >
          <div className="usa-nav__inner">
            <button
              className="usa-nav__close"
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <img src="/lrtp2045/img/close.svg" alt="Close" />
            </button>

            <ul className="usa-nav__primary usa-accordion">
              <li className="usa-nav__primary-item">
                <Link
                  className={`usa-nav__link ${isIntroActive ? 'usa-current' : ''}`}
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Introduction</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
