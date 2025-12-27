'use client';

import { Suspense } from 'react';
import ContactForm from './ContactForm';
import { MapPin, Phone, Clock } from 'lucide-react'; 

function FormLoading() {
  return (
    <div className="flex h-full min-h-[500px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent-400 border-t-transparent" />
        <p className="text-sm uppercase tracking-widest text-white/50">Loading form...</p>
      </div>
    </div>
  );
}

// Reusable Card Component
function ContactCard({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 p-5 transition-colors hover:border-white/10 hover:bg-white/10">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-400/10 text-accent-400">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-heading text-lg uppercase text-white">{title}</h3>
        <div className="mt-2 text-base leading-relaxed text-white/70">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative w-full overflow-hidden bg-base py-24 sm:py-32  bg-linear-to-l from-black-950 to-black/95">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent-400/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
            Join The <span className="text-accent-400">Reinvention</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Ready to find your edge? Send us a message or visit us in person.
            Your transformation starts now.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Column 1: Contact Form */}
          <div className="order-2 lg:order-1">
            <Suspense fallback={<FormLoading />}>
               {/* Wrapper to match the style of the other column */}
               <div className="rounded-2xl border border-white/10 bg-black-900/50 p-1 sm:p-2 backdrop-blur-sm">
                  <ContactForm />
               </div>
            </Suspense>
          </div>

          {/* Column 2: Map and Details */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            
            {/* Dark Mode Map Card */}
            <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              {/* CSS Filter Hack: grayscale and invert makes a standard google map look 'Dark Mode' */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.748366579263!2d83.16104237517208!3d17.709326983233633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39699624515555%3A0xc391e60f06536035!2sReliance%20Fresh!5e0!3m2!1sen!2sin!4v1709228800000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
              
              {/* Overlay Label */}
              <div className="absolute bottom-4 left-4 bg-black-950/90 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
                 <p className="text-xs font-bold text-accent-400 uppercase tracking-widest">HQ Location</p>
              </div>
            </div>
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactCard icon={MapPin} title="Visit Us">
                <address className="not-italic">
                  Reliance Fresh, Kurmannapalem<br />
                  Vizag, 530046
                </address>
              </ContactCard>

              <ContactCard icon={Phone} title="Contact">
                <div className="flex flex-col gap-1">
                  <a href="tel:+917306835380" className="hover:text-accent-400 transition-colors">
                    +91 7306835380
                  </a>
                  <a href="mailto:officialappuson@gmail.com" className="hover:text-accent-400 transition-colors text-sm break-all">
                    officialappuson@gmail.com
                  </a>
                </div>
              </ContactCard>
              
              {/* Full width card for hours */}
              <div className="sm:col-span-2">
                 <ContactCard icon={Clock} title="Training Hours">
                  <div className="flex justify-between max-w-xs">
                    <span className="text-white/50">Mon - Sat</span>
                    <span>5:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs mt-1">
                    <span className="text-white/50">Sunday</span>
                    <span>7:00 AM - 11:00 AM</span>
                  </div>
                </ContactCard>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}