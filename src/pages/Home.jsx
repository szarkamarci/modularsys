import DockingHero from '../components/DockingHero';
import DataFlow from '../components/DataFlow';
import Solutions from '../components/Solutions';
import Pilot from '../components/Pilot';
import Process from '../components/Process';
import Founders from '../components/Founders';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      <DockingHero />
      <DataFlow />
      <Solutions />
      <Pilot />
      <Process />
      <Founders />
      <CTA />
    </main>
  );
};

export default Home;
