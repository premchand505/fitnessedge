"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import TrainerCard from "@/components/ui/TrainerCard";

// Type definition for Trainer data
interface Trainer {
  name: string;
  specialty: string;
  imageSrc: string;
}

const trainers: Trainer[] = [
  {
    name: "Eswar Kalyan",
    specialty: "Strength & Conditioning",
    imageSrc: "/images/trainers/kalyan.jpg",
  },
  {
    name: "K Vivek",
    specialty: "Powerlifting Coach",
    imageSrc: "/images/trainers/vivek1.jpg",
  },
  {
    name: "Nookesh",
    specialty: "HIIT & Functional",
    imageSrc: "/images/trainers/trainer-01.png",
  },
];

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 100, duration: 0.6 },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const imageReveal: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-base py-16 md:py-32 bg-linear-to-l from-black-950 to-black/95"
    >
      {/* PHILOSOPHY VERTICAL TEXT (Desktop Only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block z-0"
      >
        <h2 className="font-heading text-[12rem] uppercase leading-none [writing-mode:vertical-rl] text-transparent bg-clip-text bg-linear-to-t from-white/5 to-white/10 select-none">
          Philosophy
        </h2>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- SECTION 1: PHILOSOPHY CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* IMAGE BLOCK */}
          <motion.div
            className="relative w-full aspect-4/5 md:aspect-4/3 lg:aspect-3/4 max-h-[600px] mx-auto"
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Decorative border */}
            <div className="absolute inset-0 border border-white/10 translate-x-3 translate-y-3 rounded-xl hidden sm:block" />

            <Image
              src="/images/about/about.png"
              alt="Trainer working with a senior client at Appuson Fitness"
              fill
              className="rounded-xl object-cover shadow-2xl bg-black-900"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* TEXT BLOCK */}
          <motion.div
            className="flex flex-col justify-center text-center lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 mb-6"
            >
              Our <span className="text-accent-400">Philosophy</span>
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-transparent bg-clip-text bg-linear-to-b from-white to-white/60">
                At APPUSON FITNESS, we believe fitness is a journey of
                inclusive, personal reinvention. We&apos;re not just a gym;
                we&apos;re a community dedicated to helping everyone—from
                beginners to seasoned athletes—find their unique edge.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-transparent bg-clip-text bg-linear-to-b from-white to-white/60">
                Our expert trainers and premium facilities provide the
                foundation, but your discipline and spirit build the legacy. We
                are committed to creating a space where everyone feels empowered
                to transform.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* --- SECTION 2: TRAINERS --- */}
        <div className="mt-24 lg:mt-32 w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
              Meet The <span className="text-accent-400">Crew</span>
            </h2>
          </motion.div>

          {/* FULL WIDTH BREAKOUT CONTAINER 
              We use w-[100vw] and negative margin to break out of the parent container
              so the scroll area touches the edges of the phone screen.
          */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative w-screen ml-[calc(50%-50vw)] md:w-full md:ml-0"
          >
            <div
              className="
              flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 
              scrollbar-hide mx-15
              
             
              px-[7.5vw]

              
              sm:px-[calc(50%-200px)]
              
        
              md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:px-0
            "
            >
              {trainers.map((trainer) => (
                <motion.div
                  key={trainer.name}
                  variants={fadeInUp}
                  className="
                    snap-center shrink-0 h-full
                    
                    /* Card Dimensions */
                    w-[85vw] 
                    sm:w-[400px] 
                    
                    /* Desktop Reset */
                    md:w-auto md:snap-align-none
                  "
                >
                  <TrainerCard
                    name={trainer.name}
                    specialty={trainer.specialty}
                    imageSrc={trainer.imageSrc}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
