'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import TrainerCard from '@/components/ui/TrainerCard';


const trainers = [
  {
    name: 'Alex Ray',
    specialty: 'Strength & Conditioning',
   
    imageSrc: '/images/trainers/trainer-01.png',
  },
  {
    name: 'Mia Chen',
    specialty: 'HIIT & Functional',
    imageSrc: '/images/trainers/trainer-01.png',
  },
  {
    name: 'David Lee',
    specialty: 'Powerlifting Coach',
    imageSrc: '/images/trainers/trainer-01.png',
  },
  {
    name: 'Sarah Kim',
    specialty: 'Yoga & Mobility',
    imageSrc: '/images/trainers/trainer-01.png',
  },
  {
    name: 'Kenji Ito',
    specialty: 'Nutrition & Wellness',
    imageSrc: '/images/trainers/trainer-01.png',
  },
];

const slideInVariant: Variants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 50, damping: 15, duration: 0.8 },
  },
};

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-base py-24 sm:py-32 bg-linear-to-r from-black-950 to to-black-900"
    >
      <div className="pointer-events-none absolute -left-16 top-1/2 text-transparent bg-clip-text bg-linear-to-t from-white-200 to-white-600 -translate-y-1/2 hidden sm:block">
  <h2 className="font-heading text-[12rem] uppercase leading-none [writing-mode:vertical-rl] sm:text-[18rem]">
    Philosophy
  </h2>
</div>

      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            className="relative h-96 w-full lg:h-128"
            custom="left"
            variants={slideInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src="/images/about/about.jpeg"
              alt="Trainer working with a senior client"
              fill
              className="rounded-lg object-cover shadow-2xl" // object-cover prevents stretching
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            className="z-10"
            custom="right"
            variants={slideInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-heading text-5xl uppercase text-transparent bg-clip-text bg-linear-to-b from-white  to-white/50 sm:text-6xl">
              Our <span className="text-accent-400">Philosophy</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-transparent bg-clip-text bg-linear-to-b from-white  to-white/50">
              At FITNESS EDGE, we believe fitness is a journey of inclusive,
              personal reinvention. We're not just a gym; we're a community
              dedicated to helping everyone—from beginners to seasoned athletes—
              find their unique edge.
            </p>
            <p className="mt-4 text-lg leading-8 text-transparent bg-clip-text bg-linear-to-b from-white  to-white/50">
              Our expert trainers and premium facilities provide the foundation,
              but your discipline and spirit build the legacy. We are committed
              to creating a space where everyone feels empowered to transform.
            </p>
          </motion.div>
        </div>

        <div className="mt-32 z-30">
          <h2 className="text-center font-heading text-5xl  uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 sm:text-6xl">
            Meet The <span className="text-accent-400">Crew</span>
          </h2>

          <div className="mt-16 flex gap-6 overflow-x-auto pb-8 pl-6 lg:pl-8">
            {trainers.map((trainer) => (
              <TrainerCard
                key={trainer.name}
                name={trainer.name}
                specialty={trainer.specialty}
                imageSrc={trainer.imageSrc}
              />
            ))}
            <div className="w-1 flex shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}