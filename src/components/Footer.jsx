import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer section">
            <div className="container footer-content">
                <div className="footer-brand">
                    <img src="/assets/logo_2.jpeg" alt="ModularSys Monogram" className="footer-logo" />
                    <p>&copy; 2026 Modular AI Systems. All rights reserved.</p>
                </div>
                <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
