import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    const containerRef = useRef(null);

    // Motion values for the tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate normalized position (-0.5 to 0.5)
        const normalizedX = (e.clientX - rect.left) / width - 0.5;
        const normalizedY = (e.clientY - rect.top) / height - 0.5;

        x.set(normalizedX);
        y.set(normalizedY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="hero-section section" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} ref={containerRef}>
            <div className="container hero-container">
                <div className="hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="hero-title text-glow"
                    >
                        The Logic Behind Your <span className="text-cyan">Operations</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="hero-subtitle"
                    >
                        We turn disconnected data silos into a unified, predictive intelligence.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="btn-primary hero-btn"
                    >
                        Request Audit
                    </motion.button>
                </div>

                <div className="hero-visual">
                    <motion.div
                        className="dashboard-container"
                        style={{
                            rotateX: rotateX,
                            rotateY: rotateY,
                            transformStyle: "preserve-3d",
                            perspective: 1200
                        }}
                    >
                        <motion.div className="dashboard-glow" style={{ zIndex: -1 }} />
                        <motion.img
                            src="/assets/modularsys.jpeg"
                            alt="ModularSys Dashboard"
                            className="dashboard-image glass-panel"
                            // Add a default floating animation on top of the tilt
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
