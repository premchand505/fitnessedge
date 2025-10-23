'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button'; // Assuming Button, MobileMenu, VisitCounter are in correct paths
import MobileMenu from './MobileMenu';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import VisitCounter from './Visitcounter';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About Us', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined) return;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-120%' } }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-3 left-1/2 z-30 w-full max-w-7xl -translate-x-1/2 rounded-full border border-white/10 bg-black/30 shadow-lg backdrop-blur-md"
      >
        <nav className="flex items-center justify-between px-6 py-3">
          <Link
            href="/#home"
            className="flex shrink-0 items-center gap-2 group"
          >
            <Image src="/fitnessedge.svg" alt="Fitness Edge Logo" width={32} height={32} />
            <span className="font-heading text-2xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 transition-all duration-300 group-hover:brightness-125">
              Appuson Fitness
            </span>
          </Link>

          {/* --- NAVBAR LINKS STYLING UPDATED --- */}
          <div className="hidden items-center  text-white gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium   transition-all duration-300 "
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="text-right text-xs text-white/60">
              <div>Visits</div>
              <VisitCounter />
            </div>
            <Button href="https://play.google.com/store/apps/details?id=com.fitgymsoftware.fitnessedge&pcampaignid=web_share" variant="solid" className="py-2 text-sm">
              Download App
            </Button>
            <Button href="/#contact" variant="solid" className="py-2 text-sm">
              Join Now
            </Button>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/10"
              aria-label="Open main menu"
            >
              <Bars3Icon className="h-7 w-7" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks} // This line is correct, the error is in the MobileMenu file
      />
    </>
  );
}