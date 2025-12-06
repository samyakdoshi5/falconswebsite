// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Flagships from "./pages/Flagships";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/ContactUs";
import Preloader from "./components/Preloader";

import { useEffect } from "react";
// We keep HERO_DATA for text properties; backgroundImage may be external (Vimeo).
import { HERO_DATA, SPONSORS_LOGOS, TEAM_INFO } from "./data";

const PUBLIC = process.env.PUBLIC_URL || "";

/* ScrollToTop stays the same */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/**
 * Provide a mapping of route -> critical assets to preload.
 * All local/public assets are prefixed with PUBLIC so they resolve correctly
 * in both dev (PUBLIC="") and production (PUBLIC="/falconswebsite").
 */
function assetsForPath(pathname) {
  // normalize trailing slash
  const p = pathname.replace(/\/+$/, "") || "/";

  switch (p) {
    case "/":
      return [
        TEAM_INFO.logo,
        TEAM_INFO.smalllogo,
        HERO_DATA.backgroundImage,
        ...SPONSORS_LOGOS.map((s) => s.logoUrl),
      ];
    case "/flagships":
      return [
        `${PUBLIC}/images/flagships/vidhyut-cover@2x.jpg`,
        `${PUBLIC}/images/flagships/thumbnail-01.jpg`,
      ];
    case "/gallery":
      return [
        `${PUBLIC}/images/gallery/cover@2x.jpg`,
        `${PUBLIC}/images/gallery/highres-001.jpg`,
        `${PUBLIC}/images/gallery/highres-002.jpg`,
      ];
    case "/contact":
    case "/contact/":
      return [`${PUBLIC}/images/contact/map-hero.jpg`];
    default:
      return [];
  }
}

/**
 * AppWithPreloader wraps the Router UI and passes assets based on the current location.
 */
function AppWrapper() {
  const location = useLocation();
  const assets = assetsForPath(location.pathname);

  return (
    <Preloader assets={assets} timeoutMs={10000} showProgress>
      <div className="flex flex-col min-h-screen font-sans antialiased selection:bg-tech-accent selection:text-white">
        <Header />
        <main className="flex-grow">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/flagships" element={<Flagships />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Preloader>
  );
}

function App() {
  // DON'T set basename for HashRouter. HashRouter handles routing using the fragment (#).
  return (
    <Router>
      <ScrollToTop />
      <AppWrapper />
    </Router>
  );
}

export default App;
