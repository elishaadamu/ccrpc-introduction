"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { navItems } from '@/lib/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu and dropdowns when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

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

  // Helper to check active state
  const isItemActive = (href?: string, children?: { href: string }[]) => {
    if (!pathname) return false;
    const currentPath = pathname.replace(/\/$/, '') || '/';

    if (href) {
      const cleanHref = href.replace(/\/$/, '') || '/';
      if (
        cleanHref === '/introduction' &&
        (currentPath === '/' || currentPath === '/introduction' || currentPath.includes('introduction'))
      ) {
        return true;
      }
      return currentPath === cleanHref || currentPath === `/title-vi-2024${cleanHref}`;
    }

    if (children) {
      return children.some((child) => {
        const childHref = child.href.replace(/\/$/, '');
        return currentPath === childHref || currentPath === `/title-vi-2024${childHref}`;
      });
    }

    return false;
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

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
                  className="header-title-text"
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
          ref={navRef}
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
              {navItems.map((item) => {
                const active = isItemActive(item.href, item.children);

                if (!item.children) {
                  return (
                    <li key={item.label} className="usa-nav__primary-item">
                      <Link
                        className={`usa-nav__link ${active ? 'usa-current' : ''}`}
                        href={item.href || '#'}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                }

                const isExpanded = openDropdown === item.id;

                return (
                  <li key={item.label} className="usa-nav__primary-item">
                    <button
                      className={`usa-accordion__button usa-nav__link ${active ? 'usa-current' : ''}`}
                      aria-expanded={isExpanded ? 'true' : 'false'}
                      aria-controls={item.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(item.id || '');
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                    <div
                      id={item.id}
                      className="usa-nav__submenu"
                      aria-hidden={!isExpanded}
                      style={{
                        display: isExpanded ? 'block' : 'none',
                      }}
                    >
                      <ul className="usa-nav__submenu-list">
                        {item.children.map((subItem) => {
                          const isSubActive =
                            pathname?.replace(/\/$/, '') === subItem.href.replace(/\/$/, '') ||
                            pathname?.replace(/\/$/, '') === `/title-vi-2024${subItem.href.replace(/\/$/, '')}`;

                          return (
                            <li key={subItem.label} className="usa-nav__submenu-item">
                              <Link
                                href={subItem.href}
                                className={isSubActive ? 'usa-current' : ''}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
