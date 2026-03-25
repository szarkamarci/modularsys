import Hero from '../components/Hero';
import Testimonial from '../components/Testimonial';
import BeforeAfter from '../components/BeforeAfter';
import Features from '../components/Features';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <main className="overflow-x-hidden pt-12 md:pt-0">
      <Hero />
      <Testimonial />
      <BeforeAfter />
      <Features />
      <CTA />
    </main>
  );
};

export default Home;
