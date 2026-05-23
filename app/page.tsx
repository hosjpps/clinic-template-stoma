import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import Services from '@/components/sections/Services';
import Doctors from '@/components/sections/Doctors';
import Guarantees from '@/components/sections/Guarantees';
import Prices from '@/components/sections/Prices';
import Gallery from '@/components/sections/Gallery';
import Reviews from '@/components/sections/Reviews';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Doctors />
      <Guarantees />
      <Prices />
      <Gallery />
      <Reviews />
      <FAQ />
      <Contact />
    </>
  );
}
