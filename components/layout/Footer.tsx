import Link from 'next/link';
import Image from 'next/image';
// REMOVED: Lucide-react imports for social icons
// import { instagram as Instagram, facebook as Facebook, x as X } from 'lucide-react';

// NEW: Import specific social icons from react-icons
import { FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6'; // 'fa6' for Font Awesome 6, includes X (formerly Twitter)

// --- DATA ORGANIZATION ---
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

// UPDATED: Use the new react-icons components
const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/appusonfitness?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', icon: FaInstagram },
  { name: 'Facebook', href: '#', icon: FaFacebook },
  { name: 'X (Twitter)', href: '#', icon: FaXTwitter }, // Font Awesome has FaXTwitter for the new X logo
];

export default function Footer() {
  const gradientText = "text-transparent bg-clip-text bg-linear-to-b from-white to-white/50";

  return (
    <footer className="bg-linear-to-r from-black-950 to-black-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-2 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* 1. Brand and Social Column */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/#home" className="flex items-center gap-2 group">
              <Image
                src="/fitnessedge.svg"
                alt="Fitness Edge Logo"
                width={32}
                height={32}
              />
              <span className={`font-heading text-2xl font-bold uppercase tracking-wider transition group-hover:brightness-125 ${gradientText}`}>
                APPUSON FITNESS
              </span>
            </Link>
            <p className={`text-sm ${gradientText}`}>
              Find your edge. Transform your life.
            </p>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/70 transition-colors bg-white "
                >
                  <span className="sr-only">{item.name}</span>
                  {/* react-icons components accept props like size, color, className directly */}
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation Column */}
          <div>
            <h3 className={`font-heading text-md font-semibold leading-6 ${gradientText}`}>
              Navigation
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className={`text-sm leading-6 transition hover:brightness-125 ${gradientText}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 3. Legal Column */}
          <div>
            <h3 className={`font-heading text-md font-semibold leading-6 ${gradientText}`}>
              Legal
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className={`text-sm leading-6 transition hover:brightness-125 ${gradientText}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Column */}
          <div>
             <h3 className={`font-heading text-md font-semibold leading-6 ${gradientText}`}>
               Contact Us
             </h3>
             <address className="mt-6 space-y-4 text-sm not-italic">
               <p className={gradientText}>Mustafa Jn, Kurmannapalem, 530046</p>
               <p>
                 <a href="tel:+917306835380">
                   <span className={`transition hover:brightness-125 ${gradientText}`}>
                     +91 7306835380
                   </span>
                 </a>
               </p>
               <p>
                 <a href="mailto:appuson@gmail.com">
                   <span className={`transition hover:brightness-125 ${gradientText}`}>
                     appuson@gmail.com
                   </span>
                 </a>
               </p>
             </address>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="pt-8">
          <p className={`text-center text-xs leading-5 ${gradientText}`}>
            &copy; {new Date().getFullYear()} FITNESS EDGE. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}