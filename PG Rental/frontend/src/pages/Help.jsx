import { HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';

export const Help = () => {
    return (
        <div className="help-page">
            <section className="hero" style={{ paddingBottom: '2rem' }}>
                <div className="container">
                    <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>Help & Support</h1>
                    <p className="hero-subtitle">We're here to help you find your perfect PG in Nagpur.</p>
                </div>
            </section>

            <section className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
                <div className="faq-section">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>

                    <div className="faq-item">
                        <h3><HelpCircle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />How do I search for a PG?</h3>
                        <p>Use the search bar on the Home page. Enter an area name (e.g., "Dharampeth") and select your maximum budget, then click the search button.</p>
                    </div>

                    <div className="faq-item">
                        <h3><HelpCircle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />Is registration required?</h3>
                        <p>Yes, you need to create a free account to browse PG listings. This helps us keep the platform secure.</p>
                    </div>

                    <div className="faq-item">
                        <h3><HelpCircle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />Which areas in Nagpur are covered?</h3>
                        <p>We cover popular localities including Dharampeth, Sadar, Ramdaspeth, Sitabuldi, Parsodi, Manish Nagar, Civil Lines, Pratap Nagar and many more.</p>
                    </div>

                    <div className="faq-item">
                        <h3><HelpCircle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />How do I contact a PG owner?</h3>
                        <p>Click "View Details" on any property card to see owner contact information and schedule a visit.</p>
                    </div>
                </div>

                <div className="contact-section">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Contact Us</h2>
                    <div className="contact-cards">
                        <div className="contact-card">
                            <Mail size={24} color="var(--primary)" />
                            <div>
                                <strong>Email</strong>
                                <p>support@pgrentalhub.com</p>
                            </div>
                        </div>
                        <div className="contact-card">
                            <Phone size={24} color="var(--primary)" />
                            <div>
                                <strong>Phone</strong>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="contact-card">
                            <MessageCircle size={24} color="var(--primary)" />
                            <div>
                                <strong>WhatsApp</strong>
                                <p>Chat with us anytime</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
