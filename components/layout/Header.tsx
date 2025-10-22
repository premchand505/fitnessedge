'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import VisitCounter from './Visitcounter'; // Import the new component

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
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 z-30 w-full bg-base/80 shadow-md backdrop-blur-md"
      >
        <nav className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/#home"
            className="flex shrink-0 items-center gap-2 group"
          >
            <Image src="/logo.svg" alt="Fitness Edge Logo" width={32} height={32} />
            <span className="font-heading text-2xl font-bold uppercase tracking-wider text-primary-dark transition-colors group-hover:text-accent">
              Fitness Edge
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-primary-dark transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="text-right text-xs text-primary-dark/60">
              <div>Visits</div>
              {/* --- THIS IS THE CHANGE --- */}
              {/* Replaced hardcoded number with the live component */}
              <VisitCounter />
            </div>
            <Button href="#" variant="outline" className="py-2 text-sm">
              Download App
            </Button>
            <Button href="/#contact" variant="solid" className="py-2 text-sm">
              Join Now
            </Button>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-md p-2 text-primary-dark transition-colors hover:bg-secondary-neutral"
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
      />
    </>
  );
}