import React from 'react';
import Navigation from './components/Navigation.jsx';
import {
  About,
  ContactBand,
  Footer,
  Hero,
  LicenseRoadmap,
  Locations,
  PocketTrainer,
  SignRibbon,
  Times
} from './components/Sections.jsx';

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <SignRibbon />
        <LicenseRoadmap />
        <Times />
        <PocketTrainer />
        <About />
        <ContactBand />
        <Locations />
      </main>
      <Footer />
    </div>
  );
}
