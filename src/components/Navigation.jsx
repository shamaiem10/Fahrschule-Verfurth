import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Klassen', href: '#klassen' },
  { label: 'Theorie & Praxis', href: '#theorie-praxis' },
  { label: 'Fahren ab 17', href: '#fahren-ab-17' },
  { label: 'Standorte', href: '#standorte' },
  { label: 'Fahrzeuge', href: '#fahrzeuge' },
  { label: 'Seminare', href: '#seminare' },
  { label: 'Fahrlehrer-Ausbildung', href: '#fahrlehrer-ausbildung' },
  { label: 'Pocket-Trainer', href: '#pocket-trainer' },
  { label: 'Kontakt', href: '#kontakt' }
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const entrance = reduced
    ? { opacity: 1 }
    : { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] } };

  const closeMenu = () => setOpen(false);

  return (
    <motion.header className="site-header" initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }} animate={entrance}>
      <div className="nav-inner">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Fahrschule Verfürth – Home">
          <span className="brand-sign"><i className="bi bi-signpost" aria-hidden="true" /></span>
          <span><strong>FAHRSCHULE</strong><small>VERFÜRTH</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {links.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.08 + index * 0.035 }}
              whileHover={reduced ? {} : { y: -2, scale: 1.02 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <motion.button
          className="menu-button"
          type="button"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
          animate={reduced ? {} : { rotate: open ? 90 : 0, scale: open ? [1, 0.94, 1] : 1 }}
          transition={{ duration: reduced ? 0.2 : 0.28 }}
        >
          <i className={open ? 'bi bi-x-lg' : 'bi bi-list'} aria-hidden="true" />
        </motion.button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0.2 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: reduced ? 0 : index * 0.04 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
