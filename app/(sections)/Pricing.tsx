'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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

const springConfig: SpringOptions = { damping: 20, stiffness: 150 };

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
      className="w-full bg-base py-24 sm:py-32"
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-5xl uppercase text-primary-dark sm:text-6xl">
            Your Edge. <span className="text-accent">Your Plan.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-dark/80">
            No hidden fees. No complex tiers. Build the exact plan you need and
            see the price update in real-time.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col gap-12 lg:col-span-3">
            <div>
              {/* --- More Color --- */}
              <h3 className="font-heading text-3xl uppercase text-accent">
                Step 1: Build Your Bundle
              </h3>
              <div className="mt-6 flex flex-col gap-4">
                {serviceToggles.map((service) => (
                  <motion.button
                    key={service.id}
                    onClick={() =>
                      handleServiceToggle(service.id as keyof ServiceSelection)
                    }
                    className="relative w-full rounded-lg border-2 border-primary-dark/10 p-6 text-left"
                    animate={
                      services[service.id as keyof ServiceSelection]
                        ? 'active'
                        : 'inactive'
                    }
                  >
                    <AnimatePresence>
                      {services[service.id as keyof ServiceSelection] && (
                        <motion.div
                          className="absolute inset-0 z-0 rounded-md bg-accent"
                          layoutId={`fill-${service.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                    <span
                      className={`relative z-10 font-heading text-2xl uppercase transition-colors ${
                        services[service.id as keyof ServiceSelection]
                          ? 'text-primary-dark'
                          : 'text-primary-dark'
                      }`}
                    >
                      {service.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              {/* --- More Color --- */}
              <h3 className="font-heading text-3xl uppercase text-accent">
                Step 2: Choose Duration
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {durationTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setDuration(tab.id as DurationSelection)}
                    className={`relative rounded-lg p-4 text-center transition-all duration-300 ${
                      duration === tab.id
                        ? 'bg-primary-dark text-base shadow-lg'
                        : 'bg-base text-primary-dark/70 hover:shadow-md'
                    }`}
                  >
                    <span className="font-heading text-xl uppercase">
                      {tab.name}
                    </span>
                    <AnimatePresence>
                      {(tab.id === '6' || tab.id === '12') && isBestValue && (
                        <motion.div
                          className="absolute -top-3 right-0 rounded-full bg-accent-light px-2 py-0.5 text-xs font-bold text-primary-dark"
                          initial={{ scale: 0, y: -10 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0 }}
                        >
                          BEST VALUE
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-lg bg-primary-dark p-8 text-base shadow-2xl">
              <h3 className="font-heading text-3xl uppercase">
                Your Custom Quote
              </h3>
              <div className="mt-6 min-h-[180px]">
                <AnimatePresence>
                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-lg text-gray-400 line-through"
                    >
                      {`Original: ₹${Math.round(originalPrice).toLocaleString(
                        'en-IN'
                      )}`}
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="mt-1 font-heading text-lg uppercase text-accent-light">
                  Your Bundle Price:
                </p>
                <div className="mt-2 font-heading text-7xl font-bold text-accent">
                  <AnimatedPrice price={finalPrice} />
                </div>
              </div>

              <div className=" flex gap-2 flex-col mt-8">
                <Link href="#contact" legacyBehavior>
                <div>
                   <h3 className="font-heading text-lg uppercase text-accent">
                Step 3: Click this and get a call from us
              </h3>
                  <Button
                    variant="solid"
                    className="w-full py-4"
                    disabled={finalPrice === 0}
                  >
                    Lock In This Rate
                  </Button>
                </div>
               
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}