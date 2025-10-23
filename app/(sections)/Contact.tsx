import { Suspense } from 'react';
import ContactForm from './ContactForm';
import { MapPin, Phone, Clock } from 'lucide-react'; // Using better icons

function FormLoading() {
  return (
    <div className="flex h-full min-h-[500px] items-center justify-center rounded-lg bg-secondary-neutral">
      <p className="text-lg text-primary-dark/50">Loading form...</p>
    </div>
  );
}

// A reusable component for contact details to keep the code clean
function ContactDetail({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="h-6 w-6 flex shrink-0 text-accent-400" aria-hidden="true" />
      <div>
        <h3 className="font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">{title}</h3>
        <div className="mt-1 text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 not-italic">{children}</div>
      </div>
    </div>
  );
}


export default function Contact() {
  return (
    <section id="contact" className="w-full bg-base py-24 sm:py-32 bg-linear-to-r from-black-950 to to-black-900">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-4xl uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 sm:text-6xl">
            Join The <span className="text-accent-400">Reinvention</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
            Ready to find your edge? Send us a message or visit us in person.
            Your transformation starts now.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
          {/* Column 1: Contact Form */}
          <Suspense fallback={<FormLoading />}>
            <ContactForm />
          </Suspense>

          {/* Column 2: Map and Details */}
          <div className="flex flex-col">
            {/* The actual, working map embed */}
            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
              <iframe
                // --- PASTE YOUR EMBED SRC HERE ---
                src="https://www.google.com/maps/d/embed?mid=1PzRnF3vfl_J_AHP_QPFBZFkObu7rPZk&ehbc=2E312F"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0" // Use absolute positioning to fill the container
              ></iframe>
            </div>
            
            {/* --- CLEANER, ORGANIZED CONTACT DETAILS --- */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 text-lg">
  <ContactDetail icon={MapPin} title="Visit Our Gym">
    <address className="not-italic">
      Reliance fresh , Kurmnnapalem
      <br />
      Vizag, 530046
    </address>
  </ContactDetail>

  <ContactDetail icon={Phone} title="Call Us">
    <a href="tel:+911234567890" className="transition-colors hover:text-accent">
      +91 12345 67890
    </a>
  </ContactDetail>

  <ContactDetail icon={Clock} title="Opening Hours">
    <p>Mon - Sat: 5am - 11pm</p>
    <p> Sun: 7am - 11am</p>
  </ContactDetail>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}