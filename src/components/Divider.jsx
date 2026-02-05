import './Divider.css';

const Divider = ({ title }) => {
    return (
        <section className="divider-section">
            <div className="divider-bg" style={{ backgroundImage: 'url(/assets/banner.jpeg)' }}></div>
            <div className="divider-overlay"></div>
            <div className="container divider-content">
                <h2 className="divider-title">{title}</h2>
            </div>
        </section>
    );
};

export default Divider;
