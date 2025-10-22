import { Suspense } from 'react';
import ContactForm from './ContactForm';
import MapPinIcon from '@/components/ui/MapPinIcon'; // Import the new icon

function FormLoading() {
  return (
    <div className="flex h-96 items-center justify-center rounded-lg bg-secondary-neutral">
      <p className="text-lg text-primary-dark/50">Loading form...</p>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-base py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-5xl uppercase text-primary-dark sm:text-6xl">
            Join The <span className="text-accent">Reinvention</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-dark/80">
            Ready to find your edge? Send us a message or visit us in person.
            Your transformation starts now.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Suspense fallback={<FormLoading />}>
            <ContactForm />
          </Suspense>

          <div className="flex flex-col">
            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="http://googleusercontent.com/maps/google.com/1 Cubbon Park!5e0!3m2!1sen!2sin!4v1678886580000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125"
              ></iframe>
            </div>
            
            {/* --- THIS IS THE CHANGE --- */}
            <div className="mt-8 flex flex-col gap-4 text-lg text-primary-dark/80">
              <p className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 flex shrink-0 text-accent" />
                <span>
                  <strong>Visit Us:</strong> 123 Fitness Ave, Cubbon Park,
                  Bengaluru, 560001
                </span>
              </p>
              <p>
                <strong className="text-accent">Call Us:</strong>{' '}
                <a href="tel:+911234567890" className="hover:text-accent">
                  +91 12345 67890
                </a>
              </p>
              <p>
                <strong className="text-accent">Hours:</strong> Mon-Fri: 5am -
                11pm | Sat-Sun: 7am - 9pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}