'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const servicesData = [
  { id: 'training', name: 'Personal Training', description: 'Get 1-on-1 guidance from our elite trainers. We build a custom plan focused on your goals, your body, and your success. Perfect for beginners needing direction or athletes pushing their limits.', imageSrc: '/images/services/services-personal.jpg' },
  { id: 'group', name: 'Group Fitness', description: 'Experience the energy of our community. From high-intensity HIIT circuits to strength-building bootcamps, our group classes are designed to motivate, challenge, and deliver results.', imageSrc: '/images/services/services-group.jpg' },
  { id: 'nutrition', name: 'Nutritional Coaching', description: "Fitness is built in the kitchen. Our certified nutritionists work with you to create a sustainable, science-backed eating plan that fuels your workouts and transforms your life.", imageSrc: '/images/services/services-nutrition.jpg' },
  { id: 'facilities', name: 'Facilities & Amenities', description: 'Train on industry-leading equipment, recover in our premium saunas and locker rooms, and refuel at our smoothie bar. We provide the elite environment you need to succeed.', imageA: '/images/services/gym-interior.avif', imageB: '/images/services/gym-interior2.avif' },
];

type ServiceId = (typeof servicesData)[number]['id'];

const contentVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function Services() {
  const [activeServiceId, setActiveServiceId] = useState<ServiceId>('facilities');
  const activeService = servicesData.find((s) => s.id === activeServiceId) || servicesData[3];

  return (
    <section
      id="services"
      className="min-h-screen w-full bg-base py-24 sm:py-32 bg-linear-to-r from-black-950 to to-black-900"
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-5xl uppercase text-transparent bg-clip-text bg-linear-to-b from-white  to-white/50 sm:text-6xl">
            What We <span className="text-accent-400">Offer</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-transparent bg-clip-text bg-linear-to-b from-white  to-white/50">
            Our services are designed to build a complete fitness solution,
            tailored to your personal edge.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 ">
          <div className="lg:col-span-4 ">
            <ul className="flex flex-col gap-2 ">
              {servicesData.map((service) => (
                <li key={service.id}
                className='bg-linear-to-b from-black-900 to-black-500 rounded-lg shadow-sm shadow-accent-300'>
                  <button
                    onClick={() => setActiveServiceId(service.id)}
                    onMouseEnter={() => setActiveServiceId(service.id)}
                    className={`w-full rounded-lg p-6 text-left bg-white  transition-all duration-300 ${
                      activeServiceId === service.id
                        ? 'text-transparent bg-clip-text bg-linear-to-b from-accent-400  to-white text-2xl shadow-lg '
                        : 'text-transparent bg-clip-text bg-linear-to-b from-white  to-white/50 text-2xl shadow-lg'
                    }`}
                  >
                    <span className="font-heading text-3xl uppercase">
                      {service.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* --- More Color --- */}
          <div className="relative min-h-[500px] overflow-hidden rounded-lg bg-base p-8 lg:col-span-8 border-2 border-accent-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceId}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                {activeService.id === 'facilities' ? (
                  <div className="grid h-full grid-cols-1 grid-rows-2 gap-6 p-8">
                    <div className="relative row-span-1 rounded-lg">
                      <Image
                        src={activeService.imageA!}
                        alt="Fitness Edge facilities"
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="relative row-span-1 rounded-lg">
                      <Image
                        src={activeService.imageB!}
                        alt="Fitness Edge amenities"
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid h-full grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={activeService.imageSrc!}
                        alt={activeService.name}
                        fill
                        className="rounded-l-lg  object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8">
                      <h3 className="font-heading text-4xl uppercase text-white">
                        {activeService.name}
                      </h3>
                      <p className="mt-4 text-lg text-white/80">
                        {activeService.description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}