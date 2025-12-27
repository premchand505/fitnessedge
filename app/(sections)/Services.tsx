'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Normalized data structure for consistency
const servicesData = [
  { 
    id: 'training', 
    name: 'Personal Training', 
    description: 'Get 1-on-1 guidance from our elite trainers. We build a custom plan focused on your goals, your body, and your success. Perfect for beginners needing direction or athletes pushing their limits.', 
    imageSrc: '/images/services/services-personal.jpg' 
  },
  { 
    id: 'group', 
    name: 'Group Fitness', 
    description: 'Experience the energy of our community. From high-intensity HIIT circuits to strength-building bootcamps, our group classes are designed to motivate, challenge, and deliver results.', 
    imageSrc: '/images/services/services-group.jpg' 
  },
  { 
    id: 'nutrition', 
    name: 'Nutritional Coaching', 
    description: "Fitness is built in the kitchen. Our certified nutritionists work with you to create a sustainable, science-backed eating plan that fuels your workouts and transforms your life.", 
    imageSrc: '/images/services/services-nutrition.jpg' 
  },
  { 
    id: 'facilities', 
    name: 'Facilities & Amenities', 
    description: 'Train on industry-leading equipment, recover in our premium saunas and locker rooms, and refuel at our smoothie bar. We provide the elite environment you need to succeed.', 
    imageSrc: '/images/services/interior.jpg'
  },
];

export default function Services() {
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
  const activeService = servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  return (
    <section
      id="services"
      className="relative min-h-screen w-full bg-base py-24 sm:py-32 bg-linear-to-l from-black-950 to-black/95 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
            What We <span className="text-accent-400">Offer</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Our services are designed to build a complete fitness solution,
            tailored to your personal edge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-auto lg:h-[600px]">
          
          {/* --- Navigation Column --- */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 scrollbar-hide snap-x">
              {servicesData.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`
                    group relative shrink-0 snap-start
                    w-[280px] lg:w-full px-6 py-5 rounded-xl text-left transition-all duration-300 border
                    ${activeServiceId === service.id 
                      ? 'bg-white/10 border-accent-400/50 shadow-[0_0_20px_rgba(var(--accent-400-rgb),0.15)]' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                    }
                  `}
                >
                  {/* Active Indicator Line (Desktop) */}
                  {activeServiceId === service.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-400 rounded-l-xl hidden lg:block" />
                  )}

                  <div className="flex flex-col">
                    <span className={`font-heading text-xl lg:text-2xl uppercase tracking-wide transition-colors ${
                      activeServiceId === service.id ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                    }`}>
                      {service.name}
                    </span>
                    <span className={`text-xs uppercase tracking-widest mt-1 ${
                      activeServiceId === service.id ? 'text-accent-400' : 'text-transparent'
                    }`}>
                      Selected
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="hidden lg:block grow mt-8 relative">
               <div className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-white/10 to-transparent" />
            </div>
          </div>

          {/* --- Content Display Area --- */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceId}
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                // Added 'group' here so hover state affects children
                className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-black-900/50 backdrop-blur-sm group"
              >
                <div className="flex flex-col h-full lg:block">
                  
                  {/* Image Section */}
                  {/* FIX: Added overflow-hidden here to contain the scaling image */}
                  <div className="relative h-[250px] sm:h-[350px] lg:h-full w-full lg:w-7/12 lg:absolute lg:right-0 lg:top-0 overflow-hidden">
                    {/* Gradient overlay to blend image into background */}
                    <div className="absolute inset-0 bg-linear-to-t from-black-900 via-transparent to-transparent lg:bg-linear-to-r lg:from-black-900 lg:to-transparent z-10 pointer-events-none" />
                    <Image
                      src={activeService.imageSrc}
                      alt={activeService.name}
                      fill
                      // Added 'group-hover:scale-110' for the zoom effect on hover
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                  </div>

                  {/* Text Section */}
                  {/* z-20 ensures text is always on top of the image and its gradients */}
                  <div className="relative z-20 flex flex-col justify-center p-6 sm:p-10 lg:h-full lg:w-7/12 lg:bg-linear-to-r lg:from-black-950 lg:via-black-950/80 lg:to-transparent pointer-events-none lg:pointer-events-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl uppercase text-white mb-6">
                        {activeService.name}
                      </h3>
                      <p className="text-lg text-white/70 leading-relaxed border-l-2 border-accent-400 pl-6">
                        {activeService.description}
                      </p>
                      
                      <div className="mt-8 pl-6 pointer-events-auto">
                        <button className="text-sm font-bold uppercase tracking-widest text-white hover:text-accent-400 transition-colors flex items-center gap-2">
                          Learn More 
                          <span className="text-accent-400">→</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}