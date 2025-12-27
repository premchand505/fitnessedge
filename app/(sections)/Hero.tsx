'use client';

import Button from '@/components/ui/Button';
import { motion, Variants } from 'framer-motion';
import React from 'react';

// --- Improved Animation Variants ---

// Controls the timing of the sequence
const wrapperVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Smooth delay between each line
      delayChildren: 0.2,
    },
  },
};

// The "Premium" Text Reveal
// Uses Skew + Rotation + Spring for a fluid feel
const textRevealVariants: Variants = {
  hidden: { 
    y: '120%',    // Start further down
    rotateX: -40, // Tilt back
    skewY: 5,     // Slight skew for velocity
    opacity: 0 
  },
  visible: {
    y: '0%',
    rotateX: 0,
    skewY: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 70,  // Lower stiffness = smoother, slower start
      damping: 15,    // Controls how much it "bounces" at the end
      mass: 1.2,      // Gives the text a feeling of weight
    },
  },
};

// Simple fade up for the paragraph and button
const fadeUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
    },
  },
};

// The accent line animation
const lineDrawVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a sleek "draw"
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-end justify-start overflow-hidden bg-linear-to-l from-black-950 to-black/95"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="/images/gym-poster.jpg"
        >
          <source src="/gym-video.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto max-w-7xl px-6 pb-20 md:px-8 md:pb-24">
        
        <motion.div
          variants={wrapperVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start"
        >
          {/* Accent Line */}
          <motion.div
            variants={lineDrawVariants}
            className="mb-6 h-1 w-24 origin-left bg-accent-400 rounded-full"
          />

          {/* Heading - Split into masked lines */}
          <h1 className="font-heading text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter md:text-8xl perspective-text">
            
            {/* Line 1 */}
            <div className="overflow-hidden py-2"> {/* Added py-2 to prevent clipping the font descenders */}
              <motion.div 
                variants={textRevealVariants} 
                className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/60"
              >
                Your Comfort
              </motion.div>
            </div>

            {/* Line 2 */}
            <div className="overflow-hidden py-2">
              <motion.div 
                variants={textRevealVariants}
                className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/60"
              >
                Zone Is A
              </motion.div>
            </div>

            {/* Line 3 (Colored) */}
            <div className="overflow-hidden py-2">
              <motion.div 
                variants={textRevealVariants}
                className="text-transparent bg-clip-text bg-linear-to-r from-accent-600 to-accent-300"
              >
                Cage
              </motion.div>
            </div>
          </h1>

          {/* Subtext */}
          <motion.div variants={fadeUpVariants} className="mt-8 max-w-md">
            <p className="text-lg font-light text-accent-100 md:text-xl leading-relaxed">
              <span className="text-2xl font-medium text-white block mb-2">Transform Yourself</span>
              We provide the tools - You provide the will
            </p>
          </motion.div>

          {/* Button */}
          <motion.div variants={fadeUpVariants} className="mt-10">
            <Button
              href="/#contact"
              variant="solid"
              className="px-10 py-5 text-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300"
            >
              Join Now
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}