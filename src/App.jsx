import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Divider from './components/Divider';
import Solution from './components/Solution';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="grid-overlay"></div>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Divider title="How It Works" />
        <Solution />
      </main>
      <Footer />
    </div>
  );
}

export default App;
