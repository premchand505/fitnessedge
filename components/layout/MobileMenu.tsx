'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Button from '../ui/Button';

// 1. Define the type for a single navigation link
type NavLink = {
  name: string;
  href: string;
};

// 2. Define the props interface for your component to accept navLinks
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[]; // This line fixes the error
}

const menuVariants: Variants = {
  hidden: { x: '100%', transition: { type: 'spring', stiffness: 400, damping: 40 } },
  visible: { x: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } },
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


const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-white/10 bg-black/50 p-6 shadow-xl backdrop-blur-lg"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="font-heading text-2xl uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-3xl text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>

              <nav className="mt-12 flex grow text-white">
                <ul>
                  {/* Now mapping over the `navLinks` prop */}
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
                        className="block py-4 font-heading text-4xl uppercase "
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                 <Button href="https://play.google.com/store/apps/details?id=com.fitgymsoftware.fitnessedge&pcampaignid=web_share" variant="solid" onClick={onClose}>
                  Download App
                </Button>
                <Button href="/#contact" variant="solid" onClick={onClose}>
                  Join Now
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