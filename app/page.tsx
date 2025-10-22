import Hero from './(sections)/Hero';
import AboutUs from './(sections)/AboutUs';
import Services from './(sections)/Services'; // Corrected path
import Pricing from './(sections)/Pricing';
import Contact from './(sections)/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Services />
      <Pricing />
      <Contact />
    </>
  );
}