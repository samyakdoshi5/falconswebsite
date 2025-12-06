import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from 'lucide-react';
import { TEAM_INFO } from '../data';

const Footer = () => {
  return (
    <footer className="bg-card-gradient bg-opacity-80 text-slate-300 py-10 border-t border-slate-700 mt-12">
      <div className="container mx-auto px-6">

        {/* New wrapper: constrains the content width to max-w-5xl and centers it (mx-auto) */}
        <div className="max-w-5xl mx-auto">

          {/* Top Section: Three Columns (Contact, Base, Follow) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 text-center md:text-left">

            {/* 1. Contact Info */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-xl font-bold text-tech-gold mb-2">Contact Info</h3>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail size={18} className="text-tech-accent flex-shrink-0" />
                <a href={`mailto:${TEAM_INFO.email}`} className="hover:text-tech-gold transition">
                  {TEAM_INFO.email}
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Phone size={18} className="text-tech-accent flex-shrink-0" />
                <span>{TEAM_INFO.phone}</span>
              </div>
            </div>

            {/* 2. Our Base (Location) */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-xl font-bold text-tech-gold mb-2">Our Base</h3>
              <div className="flex items-start justify-center md:justify-start space-x-2">
                <MapPin size={18} className="text-tech-accent mt-1 flex-shrink-0" />
                <span className="whitespace-pre-line text-left md:text-left">{TEAM_INFO.address}</span>
              </div>
            </div>

            {/* 3. Follow Us (Socials) */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-xl font-bold text-tech-gold mb-4">Follow Us</h3>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href={TEAM_INFO.socialLinks.linkedin} className="hover:text-tech-glow transition"><Linkedin /></a>
                <a href={TEAM_INFO.socialLinks.Youtube} className="hover:text-tech-glow transition"><Youtube /></a>
                <a href={TEAM_INFO.socialLinks.instagram} className="hover:text-tech-glow transition"><Instagram /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator and Copyright (also constrained to max-w-5xl for alignment) */}
        <div className="mt-10 pt-6 border-t border-slate-700 text-center max-w-5xl mx-auto">
          <p className="text-sm opacity-50">© {new Date().getFullYear()} {TEAM_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
