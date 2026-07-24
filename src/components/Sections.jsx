import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ExternalImage from './ExternalImage.jsx';

const easeOut = [0.16, 1, 0.3, 1];
const viewport = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' };
const reveal = { hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } };

const signImages = [
  'https://www.fahrschule-verfuerth.de/images/s1.jpg',
  'https://www.fahrschule-verfuerth.de/images/s2.jpg',
  'https://www.fahrschule-verfuerth.de/images/s3.jpg',
  'https://www.fahrschule-verfuerth.de/images/s4.jpg'
];

const steps = [
  { number: '1', title: 'Anmeldung', text: 'Der erste Schritt zu deinem Führerschein.', icon: 'bi bi-pencil-square' },
  { number: '2', title: 'Theorie', text: 'Verkehrsregeln gründlich verstehen.', icon: 'bi bi-sign-turn-right' },
  { number: '3', title: 'Praxis', text: 'Sicheres Fahren Schritt für Schritt lernen.', icon: 'bi bi-car-front' },
  { number: '4', title: 'Prüfung', text: 'Gut vorbereitet zum Ziel.', icon: 'bi bi-check2-circle' }
];

const locationData = [
  {
    id: 'locations-kleve',
    city: 'Kleve',
    address: 'Römerstraße 8, 47533 Kleve',
    note: 'Am Freiherr vom Stein Gymnasium',
    schedule: 'Mo – Mi – Fr · 19:00 – 20:30 Uhr',
    phone: '0172 - 25 35 229',
    phoneHref: 'tel:+491722535229',
    image: 'https://www.fahrschule-verfuerth.de/images/kleve.jpg',
    direction: -24,
    clip: 'inset(0 0 100% 0)'
  },
  {
    id: 'locations-kranenburg',
    city: 'Kranenburg',
    address: 'Große Straße 52, 47559 Kranenburg',
    note: 'Filiale in Kranenburg',
    schedule: 'Di & Do · 19:15 – 20:45 Uhr',
    phone: '0172 - 25 35 229',
    phoneHref: 'tel:+491722535229',
    image: 'https://www.fahrschule-verfuerth.de/images/kranenburg.jpg',
    direction: 24,
    clip: 'inset(0 100% 0 0)'
  }
];

const archiveImages = [
  { src: 'https://www.fahrschule-verfuerth.de/images/los_gehts.gif', alt: 'Los geht’s' },
  { src: 'https://www.fahrschule-verfuerth.de/images/fahrschulanschrift.gif', alt: 'Fahrschulanschrift' },
  { src: 'https://www.fahrschule-verfuerth.de/images/pixelspace.gif', alt: 'Grafisches Element der Fahrschule' },
  { src: 'https://www.fahrschule-verfuerth.de/images/klee.jpg', alt: 'Grafik der Fahrschule Verfürth' },
  { src: 'https://www.fahrschule-verfuerth.de/images/s6.jpg', alt: 'Verkehrsschild' },
  { src: 'https://www.fahrschule-verfuerth.de/images/s7.jpg', alt: 'Verkehrsschild' },
  { src: 'https://www.fahrschule-verfuerth.de/images/s8.jpg', alt: 'Verkehrsschild' },
  { src: 'https://www.fahrschule-verfuerth.de/images/s9.jpg', alt: 'Verkehrsschild' }
];

function SectionHeading({ eyebrow, title, text }) {
  return (
    <motion.div
      className="section-heading"
      variants={reveal}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </motion.div>
  );
}

export function Hero() {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-10, 18]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.06]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], [-4, -2]);
  const contentY = useTransform(scrollYProgress, [0.55, 1], [0, -18]);
  const contentOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0.72]);

  return (
    <section id="home" ref={heroRef} className="hero section-pad-xl" aria-labelledby="hero-title">
      <motion.div
        className="hero-image-layer"
        initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 1.025 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduced ? 0.2 : 0.6, ease: reduced ? 'linear' : easeOut }}
        style={reduced ? {} : { y: imageY, scale: imageScale }}
      >
        <ExternalImage
          src="https://www.fahrschule-verfuerth.de/images/Audi2.jpg"
          alt="Ausbildungsfahrzeug der Fahrschule Verfürth"
          className="hero-photo"
          eager
        />
      </motion.div>
      <div className="hero-overlay" />
      <motion.div className="hero-glow hero-glow-blue" aria-hidden="true" />
      <motion.div className="hero-glow hero-glow-yellow" aria-hidden="true" />

      <motion.div
        className="hero-ribbon"
        style={reduced ? {} : { y: ribbonY, rotate: ribbonRotate }}
        aria-label="Verkehrsschilder"
      >
        {signImages.slice(0, 3).map((src, index) => (
          <motion.div
            className="hero-chip"
            key={src}
            initial={{ opacity: 0, x: reduced ? 0 : index % 2 === 0 ? -40 : 40, rotate: reduced ? 0 : index % 2 === 0 ? -6 : 6, scale: reduced ? 1 : 0.92 }}
            animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: reduced ? 0.2 : 0.42, delay: reduced ? 0 : 0.32 + index * 0.12, ease: reduced ? 'linear' : easeOut }}
            whileHover={reduced ? {} : { y: -5, rotate: 1.5, scale: 1.035, boxShadow: '0 16px 34px rgba(6,59,115,0.30)', borderColor: 'rgba(255,213,31,0.95)' }}
            whileTap={reduced ? {} : { scale: 0.96, rotate: -1 }}
          >
            <ExternalImage src={src} alt="Deutsches Verkehrsschild" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="hero-content container" style={reduced ? {} : { y: contentY, opacity: contentOpacity }}>
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.1, ease: reduced ? 'linear' : easeOut }}
        >
          <motion.span className="hero-eyebrow" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.2 }}>
            <i className="bi bi-lightning" aria-hidden="true" /> Fahrschule Verfürth
          </motion.span>
          <motion.div
            initial={{ clipPath: reduced ? 'inset(0)' : 'inset(0 100% 0 0)', x: reduced ? 0 : -12 }}
            animate={{ clipPath: 'inset(0)', x: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.15, ease: reduced ? 'linear' : easeOut }}
          >
            <h1 id="hero-title">Wir bringen Licht in den Schilderwald.</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: reduced ? 0 : 0.48 }}>
            Gründlich lernen. Sicher fahren. In Kleve und Kranenburg.
          </motion.p>
          <div className="hero-actions">
            <motion.a
              className="button sign-button"
              href="#kontakt"
              whileHover={reduced ? {} : { y: -2, scale: 1.03, backgroundColor: '#FFE15A', borderColor: '#063B73', boxShadow: '0 8px 0 #101820, 0 16px 32px rgba(255,213,31,0.42)' }}
              whileTap={reduced ? {} : { y: 3, scale: 0.98, boxShadow: '0 2px 0 #101820' }}
            >
              Jetzt anmelden <i className="bi bi-arrow-right" aria-hidden="true" />
            </motion.a>
            <motion.a className="button ghost-button" href="#standorte" whileHover={reduced ? {} : { y: -2, backgroundColor: 'rgba(255,255,255,0.18)', borderColor: '#FFD51F', boxShadow: '0 0 20px rgba(255,213,31,0.24)' }} whileTap={{ scale: reduced ? 1 : 0.97 }}>
              Unterrichtszeiten sehen
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
      <motion.a className="scroll-hint" href="#home-sign-ribbon" animate={reduced ? {} : { y: [0, 7, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.4, repeat: reduced ? 0 : Infinity }} aria-label="Weiter scrollen">
        <i className="bi bi-chevron-down" aria-hidden="true" />
      </motion.a>
    </section>
  );
}

export function SignRibbon() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <motion.section id="home-sign-ribbon" className="sign-ribbon-section section-pad-md" initial={{ opacity: 0, y: reduced ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0.2 : 0.5, ease: reduced ? 'linear' : easeOut }}>
      <div className="container ribbon-heading">
        <i className="bi bi-arrows-move" aria-hidden="true" />
        <h2>Wir ordnen den <span>Schilderwald</span> – Schritt für Schritt.</h2>
        <i className="bi bi-sliders2-vertical" aria-hidden="true" />
      </div>
      <motion.div className="marquee-window" initial={{ clipPath: reduced ? 'inset(0)' : 'inset(0 50% 0 50%)', scaleY: reduced ? 1 : 0.92 }} whileInView={{ clipPath: 'inset(0)', scaleY: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0.2 : 0.65, delay: reduced ? 0 : 0.08, ease: reduced ? 'linear' : easeOut }}>
        <motion.div className={`marquee-track ${paused ? 'paused' : ''}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {[...signImages, ...signImages].map((src, index) => (
            <motion.div
              className="ribbon-item"
              key={`${src}-${index}`}
              tabIndex="0"
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              initial={{ opacity: 0, y: reduced ? 0 : 12, rotate: reduced ? 0 : index % 2 === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: reduced ? 0 : index % 2 === 0 ? -2 : 2 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0.2 : 0.4, delay: reduced ? 0 : (index % 4) * 0.08 }}
              whileHover={reduced ? {} : { y: -6, rotate: 0, scale: 1.045, borderColor: 'rgba(255,213,31,0.90)', boxShadow: '0 18px 36px rgba(6,59,115,0.28)' }}
              whileTap={reduced ? {} : { scale: 0.98 }}
            >
              <ExternalImage src={src} alt="Verkehrsschild im Schilderband" />
            </motion.div>
          ))}
        </motion.div>
        <motion.span className="pause-badge" animate={{ opacity: paused ? 1 : 0, y: paused ? 0 : 4 }}>Pause</motion.span>
      </motion.div>
      <div className="lane-line" aria-hidden="true" />
    </motion.section>
  );
}

export function LicenseRoadmap() {
  const reduced = useReducedMotion();

  return (
    <section id="klassen" className="roadmap section-pad-lg" aria-labelledby="roadmap-title">
      <span id="theorie-praxis" className="anchor-offset" />
      <span id="fahren-ab-17" className="anchor-offset" />
      <span id="fahrzeuge" className="anchor-offset" />
      <span id="seminare" className="anchor-offset" />
      <span id="fahrlehrer-ausbildung" className="anchor-offset" />
      <div className="container">
        <SectionHeading eyebrow="Dein Weg" title="Dein Führerschein-Fahrplan" text="Von der Anmeldung bis zur Prüfung: klar, gründlich und Schritt für Schritt." />
        <motion.div className="road-line" initial={{ scaleX: reduced ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.7, delay: reduced ? 0 : 0.12, ease: reduced ? 'linear' : easeOut }} />
        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.article
              className="step-card"
              key={step.number}
              initial={{ opacity: 0, y: reduced ? 0 : 28, scale: reduced ? 1 : 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewport}
              transition={{ duration: reduced ? 0.2 : 0.48, delay: reduced ? 0 : index * 0.11, ease: reduced ? 'linear' : easeOut }}
              whileHover={reduced ? {} : { y: -8, scale: 1.015, backgroundColor: '#FFFFFF', borderColor: '#0757A6', boxShadow: '0 20px 42px rgba(7,87,166,0.22)' }}
              whileTap={reduced ? {} : { y: -4, scale: 0.985 }}
            >
              <div className="step-top">
                <motion.span className="number-badge" whileHover={reduced ? {} : { rotate: -4, scale: 1.08, backgroundColor: '#FFD51F', color: '#101820' }}>{step.number}</motion.span>
                <motion.i className={step.icon || 'bi bi-signpost'} aria-hidden="true" whileHover={reduced ? {} : { scale: 1.12, rotate: 4, filter: 'drop-shadow(0 4px 6px rgba(255,213,31,0.46))' }} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="card-arrow" aria-hidden="true"><i className="bi bi-chevron-right" /></span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Times() {
  const reduced = useReducedMotion();
  const cards = [
    { city: 'Kleve', days: 'Mo · Mi · Fr', time: '19:00–20:30', address: 'Römerstraße 8', icon: 'bi bi-geo-alt' },
    { city: 'Kranenburg', days: 'Di · Do', time: '19:15–20:45', address: 'Große Straße 52', icon: 'bi bi-clock' }
  ];

  return (
    <section id="home-locations-times" className="times-section section-pad-md">
      <div className="container times-panel">
        <SectionHeading eyebrow="Schnellzugriff" title="Standorte & Zeiten" />
        <div className="times-grid">
          {cards.map((card, index) => (
            <motion.article className="time-card" key={card.city} initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0.2 : 0.44, delay: reduced ? 0 : index * 0.12, ease: reduced ? 'linear' : easeOut }} whileHover={reduced ? {} : { y: -6, scale: 1.012, backgroundColor: '#F8FCFF', borderColor: '#0757A6', boxShadow: '0 18px 38px rgba(7,87,166,0.20)' }}>
              <span className="corner-tag">Unterricht</span>
              <motion.i className={card.icon || 'bi bi-geo-alt'} aria-hidden="true" whileHover={reduced ? {} : { y: -4, scale: 1.12, color: '#A57F00' }} />
              <h3>{card.city}</h3>
              <p>{card.days}</p>
              <strong>{card.time}</strong>
              <motion.a href="#standorte" whileHover={reduced ? {} : { x: 3, color: '#063B73', backgroundColor: 'rgba(255,213,31,0.20)' }}><i className="bi bi-geo-alt" aria-hidden="true" /> {card.address}</motion.a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PocketTrainer() {
  const reduced = useReducedMotion();

  return (
    <section id="pocket-trainer" className="pocket-section section-pad-md">
      <div className="container narrow-container">
        <motion.article className="pocket-card" initial={{ opacity: 0, x: reduced ? 0 : -36, scale: reduced ? 1 : 0.97 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0.2 : 0.55, ease: reduced ? 'linear' : easeOut }} whileHover={reduced ? {} : { y: -6, scale: 1.018, backgroundColor: '#FFFFFF', borderColor: 'rgba(7,87,166,0.52)', boxShadow: '0 22px 48px rgba(7,87,166,0.24)' }}>
          <motion.div className="theo-image-wrap" initial={{ clipPath: reduced ? 'inset(0)' : 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0)' }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.1 }}>
            <ExternalImage src="https://www.fahrschule-verfuerth.de/images/THEO-Banner_480x60.gif" alt="THEO Pocket-Trainer" className="theo-image" motionProps={{ whileHover: reduced ? {} : { scale: 1.06, x: 4 } }} />
          </motion.div>
          <motion.div className="pocket-copy" initial={{ opacity: 0, y: reduced ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ delay: reduced ? 0 : 0.2 }}>
            <span className="eyebrow"><i className="bi bi-phone" aria-hidden="true" /> Pocket-Trainer</span>
            <h2>Lerne Theorie unterwegs – mit THEO.</h2>
            <p><i className="bi bi-check2-circle" aria-hidden="true" /> Gründlich auf die Prüfung vorbereiten.</p>
            <motion.a className="button sign-button compact-button" href="#pocket-trainer" whileHover={reduced ? {} : { y: -2, scale: 1.03, backgroundColor: '#FFE15A', borderColor: '#0757A6', boxShadow: '0 7px 0 #101820, 0 14px 28px rgba(255,213,31,0.34)' }} whileTap={reduced ? {} : { y: 3, scale: 0.98, boxShadow: '0 2px 0 #101820' }}>Zum Trainer <i className="bi bi-arrow-up-right" aria-hidden="true" /></motion.a>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
}

export function About() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <section id="home-about" ref={sectionRef} className="about-section section-pad-lg">
      <div className="container about-grid">
        <motion.div className="about-frame" initial={{ opacity: 0, x: reduced ? 0 : -36, rotate: reduced ? 0 : -1.5, scale: reduced ? 1 : 0.97 }} whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.58, ease: reduced ? 'linear' : easeOut }} whileHover={reduced ? {} : { y: -6, rotate: -0.6, scale: 1.012, borderColor: '#FFD51F', boxShadow: '16px 16px 0 rgba(255,213,31,0.36), 0 24px 48px rgba(7,87,166,0.22)' }}>
          <motion.div className="about-image-motion" style={reduced ? {} : { y: imageY }} initial={{ clipPath: reduced ? 'inset(0)' : 'inset(0 0 100% 0)', scale: reduced ? 1 : 1.04 }} whileInView={{ clipPath: 'inset(0)', scale: 1 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.65, ease: reduced ? 'linear' : easeOut }}>
            <ExternalImage src="https://www.fahrschule-verfuerth.de/images/Fahrschule_MV.jpg" alt="Fahrschule Verfürth" className="about-image" motionProps={{ whileHover: reduced ? {} : { scale: 1.07, x: 3 } }} />
          </motion.div>
          <span className="image-caption">Fahrschule Verfürth</span>
        </motion.div>
        <motion.div className="about-copy" initial={{ opacity: 0, y: reduced ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.1, ease: reduced ? 'linear' : easeOut }}>
          <span className="eyebrow">Sicherheit zuerst</span>
          <h2>Vom sicheren Fahren hängt so unendlich viel ab.</h2>
          <p>Es ist unser Wunsch, Sie so sicher und rasch wie nur möglich zum Ziel zu bringen. Wir bilden nach modernsten und pädagogisch bewährten Methoden aus.</p>
          <div className="about-bullets">
            <motion.p whileHover={reduced ? {} : { x: 5, backgroundColor: 'rgba(7,87,166,0.06)', borderColor: 'rgba(7,87,166,0.16)' }}><i className="bi bi-shield-check" aria-hidden="true" /> Die Sicherheit unserer Schüler geht allem Anderen vor.</motion.p>
            <motion.p whileHover={reduced ? {} : { x: 5, backgroundColor: 'rgba(7,87,166,0.06)', borderColor: 'rgba(7,87,166,0.16)' }}><i className="bi bi-people" aria-hidden="true" /> Gründlich lernen – für Prüfung und Probezeit.</motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ContactBand() {
  const reduced = useReducedMotion();

  return (
    <section id="kontakt" className="contact-section section-pad-md">
      <div className="container">
        <motion.div className="contact-band" initial={{ opacity: 0, y: reduced ? 0 : 32, scale: reduced ? 1 : 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: reduced ? 0.2 : 0.5, ease: reduced ? 'linear' : easeOut }} whileHover={reduced ? {} : { y: -3, scale: 1.004, borderColor: 'rgba(255,213,31,0.38)', boxShadow: '0 24px 52px rgba(6,59,115,0.30)' }}>
          <div>
            <span className="contact-kicker"><i className="bi bi-envelope" aria-hidden="true" /> Kontakt</span>
            <motion.h2 initial={{ clipPath: reduced ? 'inset(0)' : 'inset(0 0 100% 0)', y: reduced ? 0 : 16 }} whileInView={{ clipPath: 'inset(0)', y: 0 }} viewport={viewport} transition={{ delay: reduced ? 0 : 0.1 }}>Bereit? Schreib uns – wir starten mit dir.</motion.h2>
            <p>Für weitere Fragen stehen wir jederzeit telefonisch oder per Kontaktformular zur Verfügung.</p>
          </div>
          <motion.a className="button sign-button contact-button" href="tel:+491722535229" initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={viewport} transition={{ delay: reduced ? 0 : 0.22 }} whileHover={reduced ? {} : { y: -3, scale: 1.035, backgroundColor: '#FFE56E', borderColor: '#FFFFFF', boxShadow: '0 9px 0 #101820, 0 18px 34px rgba(255,213,31,0.38)' }} whileTap={reduced ? {} : { y: 4, scale: 0.98, boxShadow: '0 2px 0 #101820' }}>0172 - 25 35 229 <i className="bi bi-arrow-right-circle" aria-hidden="true" /></motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function LocationCard({ location, index, reduced }) {
  return (
    <motion.article id={location.id} className="location-card" initial={{ opacity: 0, y: reduced ? 0 : 30, scale: reduced ? 1 : 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.52, delay: reduced ? 0 : index * 0.08, ease: reduced ? 'linear' : easeOut }} whileHover={reduced ? {} : { y: -8, scale: 1.012, backgroundColor: '#F9FCFF', borderColor: '#0757A6', boxShadow: '0 26px 56px rgba(7,87,166,0.24)' }}>
      <motion.div className="location-image-frame" initial={{ clipPath: reduced ? 'inset(0)' : location.clip, scale: reduced ? 1 : 1.05 }} whileInView={{ clipPath: 'inset(0)', scale: 1 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.62, delay: reduced ? 0 : 0.06, ease: reduced ? 'linear' : easeOut }}>
        <ExternalImage src={location.image} alt={`Filiale in ${location.city}`} className="location-image" motionProps={{ whileHover: reduced ? {} : { scale: 1.075, y: -3 } }} />
      </motion.div>
      <motion.h3 className="locality-plate" initial={{ opacity: 0, x: reduced ? 0 : location.direction, rotate: reduced ? 0 : location.direction < 0 ? -1 : 1 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={viewport} transition={{ delay: reduced ? 0 : 0.2 }} whileHover={reduced ? {} : { x: location.direction < 0 ? 4 : -4, backgroundColor: '#FFE36A', boxShadow: '0 6px 0 #101820' }}>{location.city}</motion.h3>
      <div className="location-info">
        <motion.p whileHover={reduced ? {} : { x: 4, backgroundColor: 'rgba(7,87,166,0.06)' }}><i className="bi bi-geo-alt" aria-hidden="true" /><span><strong>{location.address}</strong><small>{location.note}</small></span></motion.p>
        <motion.p whileHover={reduced ? {} : { x: 4, backgroundColor: 'rgba(7,87,166,0.06)' }}><i className="bi bi-clock" aria-hidden="true" /><span><strong>Unterricht</strong><small>{location.schedule}</small></span></motion.p>
        <motion.a href={location.phoneHref} whileHover={reduced ? {} : { x: 3, backgroundColor: 'rgba(255,213,31,0.20)', boxShadow: '0 5px 14px rgba(255,213,31,0.16)' }} whileTap={reduced ? {} : { scale: 0.97 }}><i className="bi bi-telephone" aria-hidden="true" /><span><strong>Telefon</strong><small>{location.phone}</small></span></motion.a>
      </div>
    </motion.article>
  );
}

export function Locations() {
  const reduced = useReducedMotion();

  return (
    <section id="standorte" className="locations-section section-pad-lg">
      <div className="container">
        <SectionHeading eyebrow="Vor Ort" title="Unsere Filialen" text="Unterricht in Kleve und Kranenburg." />
        <div className="locations-grid">
          {locationData.map((location, index) => <LocationCard key={location.city} location={location} index={index} reduced={reduced} />)}
        </div>
        <div className="archive-gallery" aria-label="Schilderwald Galerie">
          <h3>Wir bringen Licht in den Schilderwald...</h3>
          <div className="archive-grid">
            {archiveImages.map((image, index) => (
              <motion.figure key={image.src} initial={{ opacity: 0, y: reduced ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ delay: reduced ? 0 : index * 0.04 }} whileHover={reduced ? {} : { y: -5, rotate: index % 2 === 0 ? -1 : 1, boxShadow: '0 16px 32px rgba(6,59,115,0.20)', borderColor: '#FFD51F' }}>
                <ExternalImage src={image.src} alt={image.alt} className="archive-image" motionProps={{ whileHover: reduced ? {} : { scale: 1.06 } }} />
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>FAHRSCHULE VERFÜRTH</strong>
          <p>Wir bringen Licht in den Schilderwald...</p>
        </div>
        <address>
          Martin Verfürth<br />
          Römerstr. 8<br />
          47533 Kleve<br />
          <a href="tel:+491722535229">Mobil 0172 - 25 35 229</a>
        </address>
        <nav aria-label="Fußnavigation">
          <a href="#home">Home</a>
          <a href="#standorte">Standorte</a>
          <a href="#kontakt">Kontakt</a>
          <span>Impressum</span>
        </nav>
      </div>
      <div className="footer-credit">© Torben Reimer | www.torbenreimer.eu</div>
    </footer>
  );
}
