import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import BeforeAfter from '../components/BeforeAfter';
import Features from '../components/Features';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <main className="pt-32">
      <Hero />
      <TrustBar />
      <BeforeAfter />
      <Features />
      <CTA />
    </main>
  );
};

export default Home;
