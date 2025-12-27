'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaXTwitter } from 'react-icons/fa6'; 

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About Us', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Pricing', href: '/#pricing' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Contact', href: '/#contact' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/appusonfitness', icon: FaInstagram },
  { name: 'Facebook', href: '#', icon: FaFacebookF },
  { name: 'X', href: '#', icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="bg-black-950 border-t border-white/20 relative z-10">
      <div className="container mx-auto max-w-7xl px-6 pb-8 pt-12 sm:pt-24 lg:px-8">
        
        {/* GRID LAYOUT EXPLAINED:
           grid-cols-2: On mobile, we create a 2-column grid.
           lg:grid-cols-4: On desktop, we switch to 4 columns.
           
           This allows us to put Nav & Legal side-by-side on mobile!
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-8">
          
          {/* 1. BRAND COLUMN 
             col-span-2: On mobile, this takes up the full width (2 columns).
             lg:col-span-1: On desktop, it takes just 1 column.
          */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
            <Link href="/#home" className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20 bg-black-900 p-1">
                  <Image
                    src="/fitnessedge.svg"
                    alt="Fitness Edge Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold uppercase tracking-wider text-white">
                  APPUSON FITNESS
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-accent-400 font-bold">
                  Est. 2024
                </span>
              </div>
            </Link>
            
            <p className="text-sm leading-relaxed text-white font-medium max-w-sm">
              Forging elite fitness through community, discipline, and expert guidance.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex h-10 w-10 items-center justify-center rounded-lg 
                    bg-white border border-white/20 text-white 
                    transition-all duration-200 hover:text-black-950
                  "
                  aria-label={`Follow us on ${item.name}`}
                >
                  <item.icon className="h-5 w-5 fill-current" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. NAVIGATION 
             Takes 1 column on mobile (left side).
          */}
          <div className="col-span-1">
            <h3 className="font-heading text-base font-bold uppercase tracking-widest text-accent-400 mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="flex items-center gap-2 sm:gap-3 group"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-400 group-hover:bg-accent-400 group-hover:text-black-950 transition-colors">
                      <ChevronRight className="h-3 w-3" />
                    </div>
                    <span className="text-white font-medium text-sm group-hover:text-accent-400 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 3. LEGAL 
             Takes 1 column on mobile (right side).
          */}
          <div className="col-span-1">
            <h3 className="font-heading text-base font-bold uppercase tracking-widest text-accent-400 mb-6">
              Legal
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="flex items-center gap-2 sm:gap-3 group"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-400 group-hover:bg-accent-400 group-hover:text-black-950 transition-colors">
                      <ChevronRight className="h-3 w-3" />
                    </div>
                    <span className="text-white font-medium text-sm group-hover:text-accent-400 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. CONTACT US 
             col-span-2: Full width on mobile.
             lg:col-span-1: 1 column on desktop.
          */}
          <div className="col-span-2 lg:col-span-1">
             <h3 className="font-heading text-base font-bold uppercase tracking-widest text-accent-400 mb-6">
               Contact Us
             </h3>
             <ul className="space-y-5">
               
               {/* Location */}
               <li className="flex gap-3">
                 <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-400 transition-colors">
                   <MapPin className="h-3 w-3" />
                 </div>
                 <span className="text-white font-medium text-sm leading-relaxed">
                   Mustafa Jn, Kurmannapalem,<br/>Vizag, 530046
                 </span>
               </li>

               {/* Phone */}
               <li>
                 <a href="tel:+917306835380" className="flex gap-3 group items-center">
                   <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-400 group-hover:bg-accent-400 group-hover:text-black-950 transition-colors">
                     <Phone className="h-3 w-3" />
                   </div>
                   <span className="text-white font-medium text-sm group-hover:text-accent-400 transition-colors">
                     +91 7306835380
                   </span>
                 </a>
               </li>

               {/* Email */}
               <li>
                 <a href="mailto:officialappuson@gmail.com" className="flex gap-3 group items-center">
                   <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-400 group-hover:bg-accent-400 group-hover:text-black-950 transition-colors">
                     <Mail className="h-3 w-3" />
                   </div>
                   <span className="text-white font-medium text-sm group-hover:text-accent-400 transition-colors break-all">
                     officialappuson@gmail.com
                   </span>
                 </a>
               </li>

             </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} APPUSON FITNESS. All Rights Reserved.
          </p>
          <p className="text-sm text-white/60">
             Designed for Performance.
          </p>
        </div>
      </div>
    </footer>
  );
}