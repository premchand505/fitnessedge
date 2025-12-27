'use client';

import { useState, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  SpringOptions,
} from 'framer-motion';
import {
  calculatePrice,
  ServiceSelection,
  DurationSelection,
  durationTabs,
  serviceToggles,
} from '@/lib/pricingLogic';
import Button from '@/components/ui/Button';

// Animation config for the number counter
const springConfig: SpringOptions = { damping: 20, stiffness: 150 };

// --- Sub-Component: Animated Number ---
function AnimatedPrice({ price }: { price: number }) {
  const animatedValue = useSpring(price, springConfig);
  const formattedPrice = useTransform(animatedValue, (val) => {
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  });

  useMemo(() => {
    animatedValue.set(price);
  }, [price, animatedValue]);

  return <motion.span>{formattedPrice}</motion.span>;
}

// --- Main Component ---
export default function Pricing() {
  const [services, setServices] = useState<ServiceSelection>({
    gym: true,
    pt: false,
    nutrition: false,
  });
  const [duration, setDuration] = useState<DurationSelection>('1');

  const { originalPrice, finalPrice, discount, isBestValue } = useMemo(
    () => calculatePrice(services, duration),
    [services, duration]
  );

  const handleServiceToggle = (serviceId: keyof ServiceSelection) => {
    // Prevent deselecting gym if it's the only one active (optional logic)
    if (serviceId === 'gym') {
      const otherServicesSelected = services.pt || services.nutrition;
      if (!otherServicesSelected && services.gym) return;
    }
    setServices((prev) => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  const lockInHref = useMemo(() => {
    const params = new URLSearchParams();
    const selectedServices = Object.keys(services).filter(
      (k) => services[k as keyof ServiceSelection]
    );
    params.set('services', selectedServices.join(', '));
    params.set('duration', `${duration} Months`);
    params.set('price', finalPrice.toString());
    return `/#contact?${params.toString()}`;
  }, [services, duration, finalPrice]);

  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden bg-base py-24 sm:py-32 bg-linear-to-l from-black-950 to-black/95 text-white"
    >
      {/* Background Decor - Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-accent-400/5 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
            Your Edge <span className="text-accent-400">Your Plan</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            No hidden fees. No complex tiers. Build the exact plan you need and
            see the price update in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* --- LEFT COLUMN: BUILDER (Steps 1 & 2) --- */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            
            {/* Step 1: Services */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-400/20 text-accent-400 font-heading text-sm">01</div>
                <h3 className="font-heading text-2xl sm:text-3xl uppercase text-white">
                  Build Your Bundle
                </h3>
              </div>
              
              <div className="flex flex-col gap-4">
                {serviceToggles.map((service) => {
                  const isActive = services[service.id as keyof ServiceSelection];
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id as keyof ServiceSelection)}
                      disabled={service.id === 'gym' && !services.pt && !services.nutrition && services.gym}
                      className={`
                        group relative w-full overflow-hidden rounded-xl border p-6 text-left transition-all duration-300
                        ${isActive 
                          ? 'border-accent-400 bg-accent-400/10 shadow-[0_0_20px_-5px_rgba(var(--accent-400-rgb),0.3)]' 
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <span className={`font-heading text-xl sm:text-2xl uppercase transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}>
                          {service.name}
                        </span>
                        
                        {/* Checkbox Visual */}
                        <div className={`
                          w-6 h-6 rounded-md border flex items-center justify-center transition-colors duration-300
                          ${isActive ? 'bg-accent-400 border-accent-400 text-black-950' : 'border-white/30 bg-transparent'}
                        `}>
                          {isActive && (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Duration */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-400/20 text-accent-400 font-heading text-sm">02</div>
                <h3 className="font-heading text-2xl sm:text-3xl uppercase text-white">
                  Choose Duration
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {durationTabs.map((tab) => {
                   const isSelected = duration === tab.id;
                   return (
                    <button
                      key={tab.id}
                      onClick={() => setDuration(tab.id as DurationSelection)}
                      className={`
                        relative flex flex-col items-center justify-center rounded-xl p-4 transition-all duration-300 border
                        ${isSelected
                          ? 'bg-white text-black-950 border-white shadow-lg scale-[1.02]'
                          : 'bg-black-900 border-white/10 text-white/60 hover:border-white/30 hover:bg-black-800'
                        }
                      `}
                    >
                      <span className="font-heading text-xl uppercase z-10 relative">
                        {tab.name}
                      </span>
                      
                      {/* Best Value Badge */}
                      <AnimatePresence>
                        {(tab.id === '6' || tab.id === '12') && isBestValue && (
                          <motion.div
                            className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full border border-accent-400/20 ${isSelected ? 'bg-accent-400 text-black-950' : 'bg-black-950 text-accent-400'}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            BEST VALUE
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: STICKY QUOTE CARD --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              {/* Glassmorphic Card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
                
                {/* Decorative gradients inside card */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent-400/20 rounded-full blur-[80px]" />
                
                <h3 className="relative z-10 font-heading text-2xl uppercase text-white/80 border-b border-white/10 pb-4 mb-6">
                  Order Summary
                </h3>

                <div className="relative z-10 flex flex-col gap-1 min-h-[140px]">
                  {/* Original Price (Strikethrough) */}
                  <AnimatePresence mode="wait">
                    {discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-lg text-white/40 line-through decoration-white/30"
                      >
                        {`Original: ₹${Math.round(originalPrice).toLocaleString('en-IN')}`}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <p className="text-sm uppercase tracking-widest text-accent-400 font-bold">
                    Total Monthly Estimate
                  </p>
                  
                  {/* Big Price Display */}
                  <div className="font-heading text-6xl sm:text-7xl font-bold text-white tracking-tight mt-2">
                    <AnimatedPrice price={finalPrice} />
                    <span className="text-2xl text-white/30 ml-2 font-normal">/mo</span>
                  </div>
                </div>

                {/* Selected Items Summary List (Optional visual flair) */}
                <div className="relative z-10 mt-6 space-y-2 mb-8">
                    {Object.entries(services).map(([key, value]) => (
                         value && (
                            <motion.div 
                                key={key}
                                initial={{ opacity: 0, x: -10 }} 
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-sm text-white/60"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                                <span className="uppercase">{key === 'pt' ? 'Personal Training' : key}</span>
                            </motion.div>
                         )
                    ))}
                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        <span className="uppercase">{duration} Month Commitment</span>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="relative z-10">
                  {finalPrice > 0 ? (
                    <Button
                      variant="outline"
                      className="w-full py-5 text-lg font-heading uppercase tracking-wider shadow-lg shadow-accent-400/20 hover:shadow-accent-400/40"
                      href={lockInHref}
                    >
                      Start Your Transformation
                    </Button>
                  ) : (
                    <div className="w-full py-5 rounded-lg border border-white/10 bg-white/5 text-center text-white/30 font-heading uppercase cursor-not-allowed">
                      Select a Service
                    </div>
                  )}
                  <p className="text-center text-xs text-white/30 mt-4">
                    *Prices inclusive of all taxes. No credit card required for quote.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}