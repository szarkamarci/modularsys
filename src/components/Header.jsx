import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="container header-content">
        <div className="logo-container">
          <img src="/assets/logo_1.jpeg" alt="ModularSys" className="logo" />
          <div className="logo-glow"></div>
        </div>

        <nav className="nav-links">
          <a href="#solutions">Solutions</a>
          <a href="#technology">Technology</a>
          <a href="#case-studies">Case Studies</a>
        </nav>

        <button className="btn-primary small">Initialize System</button>
      </div>
    </header>
  );
};

export default Header;
