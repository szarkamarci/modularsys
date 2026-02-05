import { motion } from 'framer-motion';
import './Solution.css';

const modules = [
    { id: 1, label: 'Data', color: '#00E5FF' },
    { id: 2, label: 'Logic', color: '#2979FF' },
    { id: 3, label: 'Scale', color: '#651FFF' },
    { id: 4, label: 'Sync', color: '#00B0FF' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 120 }
    }
};

const Solution = () => {
    return (
        <section className="solution-section section">
            <div className="container">
                <div className="solution-header">
                    <h2 className="text-gradient">The Modular Effect</h2>
                    <p>Intelligence that snaps together.</p>
                </div>

                <motion.div
                    className="modules-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {modules.map((mod) => (
                        <motion.div
                            key={mod.id}
                            className="module-card glass-panel"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: `0 0 20px ${mod.color}66`,
                                borderColor: mod.color
                            }}
                        >
                            <div className="module-icon" style={{ backgroundColor: mod.color }}></div>
                            <h3>{mod.label}</h3>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="cta-container">
                    <button className="btn-primary">Initialize System</button>
                </div>
            </div>
        </section>
    );
};

export default Solution;
