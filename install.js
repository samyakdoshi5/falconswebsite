const fs = require('fs');
const path = require('path');

// 1. Define the folder structure and file contents
const files = {
  'package.json': JSON.stringify({
    "name": "aerodesign-team",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "@testing-library/jest-dom": "^5.17.0",
      "@testing-library/react": "^13.4.0",
      "@testing-library/user-event": "^13.5.0",
      "framer-motion": "^10.16.4",
      "lucide-react": "^0.292.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.18.0",
      "react-scripts": "5.0.1",
      "web-vitals": "^2.1.4"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
    "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest"
      ]
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    },
    "devDependencies": {
      "autoprefixer": "^10.4.16",
      "postcss": "^8.4.31",
      "tailwindcss": "^3.3.5"
    }
  }, null, 2),

  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tech: {
          900: '#0f172a',
          800: '#1e293b',
          accent: '#3b82f6',
          glow: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}`,

  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0f172a;
  color: #f8fafc;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0f172a; 
}
::-webkit-scrollbar-thumb {
  background: #334155; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3b82f6; 
}`,

  'src/index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

  'public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0f172a" />
    <meta name="description" content="AeroDesign Team Website" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <title>AeroDesign Team</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`,

  'src/components/Header.jsx': `import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Flagships', path: '/flagships' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-tech-900/80 backdrop-blur-md border-b border-tech-800 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-tech-glow hover:text-white transition duration-300">
          <Plane size={32} />
          <span className="text-xl font-bold tracking-widest uppercase hidden sm:block">AeroDesign</span>
        </Link>
        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={\`text-sm font-medium transition-colors duration-300 uppercase tracking-wider \${
                location.pathname === item.path 
                  ? 'text-tech-accent border-b-2 border-tech-accent' 
                  : 'text-slate-400 hover:text-white'
              }\`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
export default Header;`,

  'src/components/Footer.jsx': `import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-tech-800 text-slate-300 py-10 border-t border-slate-700 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col space-y-3">
          <h3 className="text-xl font-bold text-white mb-2">Contact Us</h3>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Mail size={18} className="text-tech-accent" />
            <span>contact@aerodesign.com</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Phone size={18} className="text-tech-accent" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <MapPin size={18} className="text-tech-accent" />
            <span>Engineering Block 4, University Campus</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
           <p className="text-sm opacity-50">© 2024 AeroDesign Team. All rights reserved.</p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-tech-glow transition"><Github /></a>
            <a href="#" className="hover:text-tech-glow transition"><Linkedin /></a>
            <a href="#" className="hover:text-tech-glow transition"><Instagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;`,

  'src/components/PhotoViewer.jsx': `import React from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoViewer = ({ photos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-red-500">
        <X size={40} />
      </button>
      <button onClick={prevPhoto} className="absolute left-4 text-white hover:text-tech-accent p-2">
        <ChevronLeft size={48} />
      </button>
      <img 
        src={photos[currentIndex]} 
        alt="Full View" 
        className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-2xl shadow-tech-accent/20"
        onClick={(e) => e.stopPropagation()} 
      />
      <button onClick={nextPhoto} className="absolute right-4 text-white hover:text-tech-accent p-2">
        <ChevronRight size={48} />
      </button>
    </motion.div>
  );
};
export default PhotoViewer;`,

  'src/pages/Home.jsx': `import React from 'react';
import { motion } from 'framer-motion';
import { Download, Users, Target, Cpu, PenTool, Plane, BarChart } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Home = () => {
  const brochurePath = "/dummy-brochure.pdf"; 
  const bgImage = "https://images.unsplash.com/photo-1559627755-8239412f7f76?q=80&w=2000&auto=format&fit=crop"; 
  const sponsors = Array(15).fill("https://placehold.co/150x50/1e293b/white?text=Sponsor"); 

  return (
    <div className="w-full">
      <section 
        className="h-screen relative flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: \`url(\${bgImage})\` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-tech-900"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            PUSHING THE LIMITS OF <span className="text-tech-accent">FLIGHT</span>
          </motion.h1>
          <p className="text-xl text-gray-300 mb-8 font-light">Designing, building, and flying the next generation of UAVs.</p>
          <a 
            href={brochurePath} 
            download 
            className="inline-flex items-center bg-tech-accent hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            <Download className="mr-2" size={20} /> Download Brochure
          </a>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="bg-tech-800/50 border border-slate-700 p-8 rounded-2xl hover:border-tech-accent transition duration-300">
            <div className="flex items-center mb-4 text-tech-glow"><Users size={32} /><h2 className="text-2xl font-bold ml-3 text-white">Our Team</h2></div>
            <p className="text-slate-300 leading-relaxed">We are a multidisciplinary team of engineers dedicated to aeronautical excellence. We combine academic theory with hands-on manufacturing.</p>
          </div>
          <div className="bg-tech-800/50 border border-slate-700 p-8 rounded-2xl hover:border-tech-accent transition duration-300">
            <div className="flex items-center mb-4 text-tech-glow"><Target size={32} /><h2 className="text-2xl font-bold ml-3 text-white">Our Mission</h2></div>
            <p className="text-slate-300 leading-relaxed">To innovate in the field of Unmanned Aerial Systems (UAS) and represent our university on the global stage at international competitions.</p>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-tech-800 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Departments</h2>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { icon: PenTool, title: "Design", desc: "Aerodynamics & CAD modeling." },
              { icon: Plane, title: "Structures", desc: "Composites & Manufacturing." },
              { icon: Cpu, title: "Avionics", desc: "Systems & Autonomous flight." },
              { icon: BarChart, title: "Management", desc: "Logistics & Sponsorships." }
            ].map((dept, idx) => (
              <div key={idx} className="bg-tech-900 p-6 rounded-xl text-center hover:-translate-y-2 transition duration-300 shadow-lg border-t-4 border-transparent hover:border-tech-accent">
                <dept.icon size={40} className="mx-auto mb-4 text-slate-400" />
                <h3 className="text-xl font-bold text-white mb-2">{dept.title}</h3>
                <p className="text-sm text-slate-400">{dept.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {[
            { label: "Est.", val: "2015" },
            { label: "Aircraft", val: "12+" },
            { label: "World Rank", val: "#4" },
            { label: "Asia Rank", val: "#1" },
            { label: "Nat. Rank", val: "#1" }
          ].map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="text-4xl font-bold text-tech-glow mb-1">{stat.val}</div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 bg-white overflow-hidden">
        <div className="container mx-auto mb-4 text-center">
           <h2 className="text-2xl font-bold text-tech-900">Our Partners</h2>
        </div>
        <div className="relative w-full overflow-hidden flex space-x-12 animate-marquee whitespace-nowrap">
          <div className="flex space-x-12 animate-loop-scroll">
             {[...sponsors, ...sponsors].map((src, i) => (
               <img key={i} src={src} alt="Sponsor" className="h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
             ))}
          </div>
        </div>
        <style>{\`
          @keyframes loop-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-loop-scroll {
            animation: loop-scroll 20s linear infinite;
          }
        \`}</style>
      </section>
    </div>
  );
};
export default Home;`,

  'src/pages/Flagships.jsx': `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import PhotoViewer from '../components/PhotoViewer';

const aircraftData = [
  { id: 1, name: "Horus X", role: "Heavy Lift", img: "https://placehold.co/600x400/1e293b/FFF?text=Horus+X", mission: "Lift 15kg payload", aspects: ["Carbon Fiber Body", "VTOL Capable"], rank: "3rd Global", photos: Array(6).fill("https://placehold.co/800x600/222/FFF") },
  { id: 2, name: "Icarus V", role: "Speed", img: "https://placehold.co/600x400/1e293b/FFF?text=Icarus+V", mission: "Max Speed 120km/h", aspects: ["Low Drag", "Monocoque"], rank: "1st National", photos: Array(6).fill("https://placehold.co/800x600/333/FFF") },
  { id: 3, name: "Falcon 9", role: "Endurance", img: "https://placehold.co/600x400/1e293b/FFF?text=Falcon", mission: "Flight time 60mins", aspects: ["Solar Assist", "Glider config"], rank: "5th Global", photos: Array(6).fill("https://placehold.co/800x600/444/FFF") },
];

const Flagships = () => {
  const [selectedCraft, setSelectedCraft] = useState(null);
  const [viewerData, setViewerData] = useState(null); 

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 container mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-200">Meet The Aircraft</h1>
        <p className="text-slate-400 mt-2">Engineering marvels from the past seasons.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aircraftData.map((craft) => (
          <motion.div 
            key={craft.id}
            whileHover={{ y: -5 }}
            className="bg-tech-800 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => setSelectedCraft(craft)}
          >
            <div className="relative overflow-hidden">
              <img src={craft.img} alt={craft.name} className="w-full h-48 object-cover transition transform group-hover:scale-110 duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">{craft.name}</h3>
              <p className="text-tech-accent text-sm uppercase tracking-wide">{craft.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCraft && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCraft(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-tech-900 border border-slate-600 w-full md:w-3/5 max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedCraft(null)} className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
                <X size={20} />
              </button>
              <div className="w-full h-64 flex-shrink-0">
                <img src={selectedCraft.img} alt={selectedCraft.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedCraft.name}</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-tech-accent font-semibold mb-1">Mission Statement</h4>
                    <p className="text-slate-300 text-sm">{selectedCraft.mission}</p>
                  </div>
                  <div>
                     <h4 className="text-tech-accent font-semibold mb-1">Rankings</h4>
                     <p className="text-slate-300 text-sm font-bold">{selectedCraft.rank}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">Key Aspects</h4>
                  <ul className="list-disc list-inside text-slate-400 text-sm">
                    {selectedCraft.aspects.map((asp, i) => <li key={i}>{asp}</li>)}
                  </ul>
                </div>
                <h4 className="text-white font-semibold mb-4">Gallery</h4>
                <div className="grid grid-cols-3 gap-2">
                  {selectedCraft.photos.map((photo, idx) => (
                    <div key={idx} className="relative group cursor-pointer" onClick={() => setViewerData({ photos: selectedCraft.photos, index: idx })}>
                      <img src={photo} alt="mini" className="h-24 w-full object-cover rounded" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded">
                        <Maximize2 size={16} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {viewerData && (
          <PhotoViewer 
            photos={viewerData.photos} 
            initialIndex={viewerData.index} 
            onClose={() => setViewerData(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
export default Flagships;`,

  'src/pages/Gallery.jsx': `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import PhotoViewer from '../components/PhotoViewer';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewerData, setViewerData] = useState(null);

  const categories = [
    { name: "Team Photos", img: "https://placehold.co/400x300/222/FFF?text=Team", photos: Array(9).fill("https://placehold.co/800x600/222/FFF") },
    { name: "Competition Days", img: "https://placehold.co/400x300/333/FFF?text=Comp", photos: Array(9).fill("https://placehold.co/800x600/333/FFF") },
    { name: "Testing & Flight", img: "https://placehold.co/400x300/444/FFF?text=Testing", photos: Array(9).fill("https://placehold.co/800x600/444/FFF") },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 container mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-200">Team Gallery</h1>
        <p className="text-slate-400 mt-2">Moments captured on our journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[4/3]"
            onClick={() => setSelectedCategory(cat)}
          >
             <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition duration-500 group-hover:blur-sm" />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
               <h3 className="text-2xl font-bold text-white border-b-2 border-tech-accent pb-1">{cat.name}</h3>
             </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur flex items-center justify-center p-4"
            onClick={() => setSelectedCategory(null)}
          >
            <div className="w-full max-w-5xl h-[80vh] bg-tech-900 rounded-xl overflow-hidden flex flex-col relative" onClick={e => e.stopPropagation()}>
               <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-white">{selectedCategory.name}</h2>
                 <button onClick={() => setSelectedCategory(null)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"><X size={20}/></button>
               </div>
               
               <div className="overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {selectedCategory.photos.map((img, i) => (
                   <div key={i} className="relative group cursor-pointer" onClick={() => setViewerData({ photos: selectedCategory.photos, index: i })}>
                     <img src={img} alt="gallery" className="w-full h-40 object-cover rounded-lg hover:opacity-80 transition" />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                        <ZoomIn className="text-white" />
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewerData && (
          <PhotoViewer 
            photos={viewerData.photos} 
            initialIndex={viewerData.index} 
            onClose={() => setViewerData(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
export default Gallery;`,

  'src/pages/ContactUs.jsx': `import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const ContactUs = () => {
  const FORMSPREE_ID = "YOUR_FORMSPREE_ID"; 

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 container mx-auto">
       <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-200">Get In Touch</h1>
        <p className="text-slate-400 mt-2">Interested in sponsoring or joining? Let us know.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto bg-tech-800/50 p-8 rounded-2xl border border-slate-700 shadow-xl">
        <div className="lg:w-1/3 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 text-slate-300">
                <Mail className="text-tech-accent mt-1" />
                <div>
                  <p className="font-bold text-white">Email</p>
                  <p>team@aerodesign.edu</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 text-slate-300">
                <Phone className="text-tech-accent mt-1" />
                <div>
                  <p className="font-bold text-white">Phone</p>
                  <p>+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 text-slate-300">
                <MapPin className="text-tech-accent mt-1" />
                <div>
                  <p className="font-bold text-white">Address</p>
                  <p>123 University Ave,<br/>Engineering Building,<br/>Vellore, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <form action={\`https://formspree.io/f/\${FORMSPREE_ID}\`} method="POST" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                <input type="text" name="name" required className="w-full bg-tech-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-accent outline-none transition" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                <input type="tel" name="phone" className="w-full bg-tech-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-accent outline-none transition" placeholder="+91 ..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input type="email" name="email" required className="w-full bg-tech-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-accent outline-none transition" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
              <input type="text" name="subject" className="w-full bg-tech-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-accent outline-none transition" placeholder="Sponsorship Inquiry" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
              <textarea name="message" rows="4" required className="w-full bg-tech-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-accent outline-none transition" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" className="w-full bg-tech-accent hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition transform hover:scale-[1.02]">
              <Send size={18} className="mr-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;`,

  'src/App.js': `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flagships from './pages/Flagships';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans antialiased selection:bg-tech-accent selection:text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flagships" element={<Flagships />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;`
};

// 2. Function to create directories and write files
const createProject = () => {
  console.log('🚀 Initializing AeroDesign Project...');

  Object.keys(files).forEach(filePath => {
    const dirName = path.dirname(filePath);
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }

    // Write file
    fs.writeFileSync(filePath, files[filePath]);
    console.log(`✅ Created: ${filePath}`);
  });

  console.log('\\n🎉 Project setup complete!');
  console.log('👉 Next steps:');
  console.log('   1. npm install');
  console.log('   2. npm start');
};

// 3. Run the setup
createProject();