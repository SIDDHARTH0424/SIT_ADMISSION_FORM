import { Building2, Users, ShieldCheck, MapPin } from 'lucide-react';

export const About = () => {
    return (
        <div className="about-page">
            <section className="hero" style={{ paddingBottom: '2rem' }}>
                <div className="container">
                    <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>About PG Rental Hub</h1>
                    <p className="hero-subtitle">Nagpur's most trusted platform for finding paying guest accommodations.</p>
                </div>
            </section>

            <section className="container" style={{ padding: '3rem 1.5rem' }}>
                <div className="about-grid">
                    <div className="about-card">
                        <div className="about-icon"><Building2 size={32} /></div>
                        <h3>Verified Properties</h3>
                        <p>Every PG listed on our platform is personally verified to ensure quality and safety standards.</p>
                    </div>
                    <div className="about-card">
                        <div className="about-icon"><Users size={32} /></div>
                        <h3>Trusted Community</h3>
                        <p>Join thousands of students and professionals who have found their perfect PG through us.</p>
                    </div>
                    <div className="about-card">
                        <div className="about-icon"><ShieldCheck size={32} /></div>
                        <h3>Safe & Secure</h3>
                        <p>All listed PGs prioritize tenant safety with proper security measures and documentation.</p>
                    </div>
                    <div className="about-card">
                        <div className="about-icon"><MapPin size={32} /></div>
                        <h3>Nagpur Focused</h3>
                        <p>We specialize in Nagpur, covering areas like Dharampeth, Sadar, Ramdaspeth, Sitabuldi and more.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
