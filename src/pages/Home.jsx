import Hero from '../components/Hero';
import BeforeAfter from '../components/BeforeAfter';
import Features from '../components/Features';
import CampaignUseCase from '../components/CampaignUseCase';
import UseCases from '../components/UseCases';
import HowItWorks from '../components/HowItWorks';
import Founders from '../components/Founders';
import CTA from '../components/CTA';
import InteractiveBackground from '../components/InteractiveBackground';

const Home = () => {
  return (
    <main className="overflow-x-hidden pt-12 md:pt-0">
      <InteractiveBackground variant="hero" />
      <Hero />
      <BeforeAfter />
      <Features />
      <CampaignUseCase />
      <UseCases />
      <HowItWorks />
      <Founders />
      <CTA />
    </main>
  );
};

export default Home;
