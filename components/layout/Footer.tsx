import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About Us', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Contact', href: '/#contact' },
  { name: 'Download App', href: '#' },
];

const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'X (Twitter)', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-base" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <Link href="/#home" className="flex items-center gap-2">
              <Image
                src="/logo-white.svg" // Assuming inverted logo in /public
                alt="Fitness Edge Logo"
                width={32}
                height={32}
              />
              <span className="font-heading text-2xl font-bold uppercase tracking-wider ">
                Fitness Edge
              </span>
            </Link>
            <p className="text-sm text-gray-300">
              Find your edge. Transform your life.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 transition-colors hover:text-accent"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {/* --- More Color --- */}
                <h3 className="font-heading text-lg leading-6 text-accent-light">
                  Quick Links
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 transition-colors hover:text-accent"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                {/* --- More Color --- */}
                <h3 className="font-heading text-lg leading-6 text-accent-light">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm leading-6 text-gray-300 transition-colors hover:text-accent"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm leading-6 text-gray-300 transition-colors hover:text-accent"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                {/* --- More Color --- */}
                <h3 className="font-heading text-lg leading-6 text-accent-light">
                  Contact Us
                </h3>
                <ul role="list" className="mt-6 space-y-4 text-sm text-gray-300">
                  <li>123 Fitness Ave, Bengaluru, 560001</li>
                  <li>
                    <a
                      href="tel:+911234567890"
                      className="transition-colors hover:text-accent"
                    >
                      +91 12345 67890
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:leads@fitnessedge.com"
                      className="transition-colors hover:text-accent"
                    >
                      leads@fitnessedge.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} FITNESS EDGE. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}