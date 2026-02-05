import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Problem.css';

const Problem = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="problem-section section" ref={ref}>
            <div className="grid-bg-absolute"></div>
            <div className="container problem-container">
                <motion.h2
                    className="problem-title text-gradient"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    Your data is messy.<br />
                    Your predictions are guesses.
                </motion.h2>
                <motion.p
                    className="problem-description"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Traditional systems are rigid, siloed, and reactive. You're building on shaky ground.
                </motion.p>
            </div>
        </section>
    );
};

export default Problem;
