'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button'; // Assuming your Button component is here
import { motion, Variants } from 'framer-motion';
import React from 'react';

// Animation variants for the main container to orchestrate the animations
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Slightly faster stagger for more dynamic feel
      delayChildren: 0.3, // Delay the first child's animation
    },
  },
};

// Animation for individual text lines
const lineVariants: Variants = {
  hidden: { opacity: 0, y: 50, skewY: 5 }, // SkewY for a subtle dramatic entrance
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
    },
  },
};

// Animation for the description text
const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      delay: 0.6, // Delay after the main heading
    },
  },
};

// Animation for the call-to-action button
const buttonVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      delay: 1.0, // Delay after description
    },
  },
};

// Animation for the overlay effect
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } },
};

// Animation for the main hero image (subtle zoom/pan)
const imageMotionVariants: Variants = {
  hidden: { scale: 1.1, opacity: 0.8 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 2.5,
      ease: 'easeOut',
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-base text-white"
    >
      {/* Dynamic Background Image - Strong visual statement */}
      <div className="absolute inset-0 z-0">
        <motion.div
          variants={imageMotionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1549476465-b91c12e4f014?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80"
            alt="Intense close-up of a determined athlete"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>
        {/* Gradients and Overlay for text readability and dramatic effect */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="absolute inset-0 bg-linear-to-t from-base via-base/60 to-transparent" // Darker base at bottom
        ></motion.div>
        <div className="absolute inset-0 bg-black/50"></div> {/* General dark overlay */}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Main Headline - Broken into lines for dramatic animation */}
          <h1 className="font-heading text-6xl font-extrabold uppercase leading-none md:text-7xl lg:text-8xl xl:text-9xl">
            <motion.span
              variants={lineVariants}
              className="block overflow-hidden"
            >
              <span className="block">Unleash</span>
            </motion.span>
            <motion.span
              variants={lineVariants}
              className="block overflow-hidden"
            >
              <span className="block">Your Inner</span>
            </motion.span>
            <motion.span
              variants={lineVariants}
              className="block overflow-hidden text-accent"
            >
              <span className="block">Power.</span>
            </motion.span>
          </h1>

          {/* Tagline/Description */}
          <motion.p
            variants={descriptionVariants}
            className="mt-8 max-w-3xl text-xl font-light text-gray-200 md:text-2xl lg:text-3xl"
          >
            Forge strength, define purpose, and break limits. This is where your transformation begins.
          </motion.p>

          {/* Call to Action Button */}
          <motion.div variants={buttonVariant} className="mt-12">
            <Button
              href="/#contact" // Assuming this is your contact section
              variant="solid"
              className="px-12 py-5 text-xl font-bold uppercase tracking-wider"
            >
              Start Your Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}