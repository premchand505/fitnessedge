'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About Us', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Contact', href: '/#contact' },
];

const menuVariants: Variants = {
  hidden: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 + 0.2, ease: 'easeOut' },
  }),
  exit: { opacity: 0, x: 20, transition: { ease: 'easeIn' } },
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-base p-6 shadow-xl"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                {/* --- More Color --- */}
                <span className="font-heading text-2xl uppercase text-accent">
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-3xl text-primary-dark transition-colors hover:bg-secondary-neutral"
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>

              <nav className="mt-12 flex grow">
                <ul>
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block py-4 font-heading text-4xl uppercase text-primary-dark transition-colors hover:text-accent"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <Button href="/#contact" variant="solid" onClick={onClose}>
                  Join Now
                </Button>
                <Button href="#" variant="outline">
                  Download App
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;