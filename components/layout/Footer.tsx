import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter } from 'lucide-react';

// --- DATA ORGANIZATION IMPROVEMENT ---
// Grouping links by category makes the code cleaner and easier to manage.
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
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'X (Twitter)', href: '#', icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-background" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        {/* --- LAYOUT IMPROVEMENT: Simplified, responsive grid --- */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* 1. Brand and Social Column */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/#home" className="flex items-center gap-2">
              <Image
                src="/logo-white.svg"
                alt="Fitness Edge Logo"
                width={32}
                height={32}
              />
              <span className="font-heading text-2xl font-bold uppercase tracking-wider text-white">
                Fitness Edge
              </span>
            </Link>
            <p className="text-sm text-gray-300">
              Find your edge. Transform your life.
            </p>
            {/* --- VISUAL IMPROVEMENT: Using icons for social links --- */}
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 transition-colors hover:text-accent"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation Column */}
          <div>
            <h3 className="font-heading text-md font-semibold leading-6 text-accent-light">
              Navigation
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-gray-300 transition-colors hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 3. Legal Column */}
          <div>
            <h3 className="font-heading text-md font-semibold leading-6 text-accent-light">
              Legal
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-gray-300 transition-colors hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Column */}
          <div>
             <h3 className="font-heading text-md font-semibold leading-6 text-accent-light">
               Contact Us
             </h3>
             <address className="mt-6 space-y-4 text-sm not-italic text-gray-300">
                <p>123 Fitness Ave, Bengaluru, 560001</p>
                <p>
                  <a href="tel:+911234567890" className="transition-colors hover:text-white">
                    +91 12345 67890
                  </a>
                </p>
                <p>
                  <a href="mailto:leads@fitnessedge.com" className="transition-colors hover:text-white">
                    leads@fitnessedge.com
                  </a>
                </p>
             </address>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="pt-8">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} FITNESS EDGE. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}