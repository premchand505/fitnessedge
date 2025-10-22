'use client';

import Button from '@/components/ui/Button'; // Assuming your Button component is here
import { motion, Variants } from 'framer-motion';
import React from 'react';

// Animation variants (no changes here)
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const lineRevealVariant: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUpVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const lineDrawVariant: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-end justify-start overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          // A poster image is important for load times and mobile devices
          poster="/images/gym-poster.jpeg" // IMPORTANT: Place a poster image in public/images
        >
          {/* ===================================================================
            FIX: The video source now points to a file in your public folder.
            ===================================================================
          */}
          <source src="/gym-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>
      </div>

      {/* Content (No changes here) */}
      <div className="container relative z-10 mx-auto max-w-7xl px-6 pb-20 md:px-8 md:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start"
        >
          <motion.div
            variants={lineDrawVariant}
            className="mb-4 h-[2px] w-24 origin-left bg-accent"
          ></motion.div>

          <h1 className="font-heading text-5xl font-extrabold uppercase leading-tight tracking-tighter md:text-xl lg:text-7xl xl:text-8xl">
            <div className="overflow-hidden py-1">
              <motion.div variants={lineRevealVariant}>Your Comfort</motion.div>
            </div>
            <div className="overflow-hidden py-1">
              <motion.div variants={lineRevealVariant}>Zone Is A</motion.div>
            </div>
            <div className="overflow-hidden py-1">
              <motion.div variants={lineRevealVariant} className="text-[#4ddb07]">
                Cage.
              </motion.div>
            </div>
          </h1>

          <motion.p
            variants={fadeUpVariant}
            className="mt-8 max-w-md text-lg font-light text-accent md:text-xl"
          >
            Break free. We provide the tools. You provide the will.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="mt-10">
            <Button
              href="/#contact"
              variant="solid"
              className="px-10 py-4 text-lg font-bold uppercase  texttracking-widest"
            >
              Escape
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}