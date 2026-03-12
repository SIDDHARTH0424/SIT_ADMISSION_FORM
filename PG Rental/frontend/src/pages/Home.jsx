import { useState, useEffect } from 'react';
import { Search, MapPin, IndianRupee, X, Wifi, Utensils, Wind, ShieldCheck, Dumbbell, Car, Tv, Droplets, Phone, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Enriched mock properties with full details
const fallbackProperties = [
    {
        id: 1, title: "Luxury PG at Dharampeth", area: "Dharampeth", budget: 8000,
        description: "Spacious room with AC, Wi-Fi, and meals included. Power backup available.",
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60",
        type: "Single / Double Sharing", gender: "Co-Ed", available_rooms: 3,
        amenities: ["AC", "Wi-Fi", "Meals (3x)", "Power Backup", "Laundry", "TV"],
        rules: "No smoking. Guests allowed till 9 PM. Gate closes at 10:30 PM.",
        contact: { name: "Ramesh Gupta", phone: "+91 98765 43210" },
        address: "Plot 12, Dharampeth Extension, Nagpur - 440010",
    },
    {
        id: 2, title: "Cozy Single Room in Sadar", area: "Sadar", budget: 5000,
        description: "Budget-friendly single room for students near Sadar bazaar.",
        image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&auto=format&fit=crop&q=60",
        type: "Single Sharing", gender: "Boys", available_rooms: 5,
        amenities: ["Wi-Fi", "Meals (2x)", "Shared Bathroom", "CCTV"],
        rules: "Students preferred. No smoking or alcohol. Gate closes at 11 PM.",
        contact: { name: "Sunil Patil", phone: "+91 91234 56789" },
        address: "Near Sadar Bus Stand, Sadar, Nagpur - 440001",
    },
    {
        id: 3, title: "Premium Boys PG Ramdaspeth", area: "Ramdaspeth", budget: 9500,
        description: "Fully furnished with 3 times food and laundry service.",
        image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60",
        type: "Single / Double Sharing", gender: "Boys", available_rooms: 2,
        amenities: ["AC", "Wi-Fi", "Meals (3x)", "Laundry", "Power Backup", "Study Room"],
        rules: "No alcohol. Guests allowed on weekends only. Gate closes at 10 PM.",
        contact: { name: "Anil Sharma", phone: "+91 88901 23456" },
        address: "7 Ramdaspeth Road, Near ICE Hospital, Nagpur - 440010",
    },
    {
        id: 4, title: "Sitabuldi Hub PG", area: "Sitabuldi", budget: 4500,
        description: "Near metro station, highly accessible for all commuters.",
        image_url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60",
        type: "Triple Sharing", gender: "Co-Ed", available_rooms: 6,
        amenities: ["Wi-Fi", "Common Kitchen", "CCTV", "24/7 Security"],
        rules: "No parties. Gate closes at 11 PM.",
        contact: { name: "Kavita Joshi", phone: "+91 77889 01234" },
        address: "Near Sitabuldi Metro Station, Nagpur - 440012",
    },
    {
        id: 5, title: "IT Park Girls PG", area: "Parsodi", budget: 7000,
        description: "Safe and secure PG for working women near IT park.",
        image_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60",
        type: "Single / Double Sharing", gender: "Girls", available_rooms: 4,
        amenities: ["AC", "Wi-Fi", "Meals (2x)", "CCTV", "Biometric Entry", "Gym"],
        rules: "Girls only. No male visitors. Gate closes at 10 PM.",
        contact: { name: "Priya Deshmukh", phone: "+91 99001 23456" },
        address: "Parsodi IT Park Road, Nagpur - 440022",
    },
    {
        id: 6, title: "Dharampeth Prime PG", area: "Dharampeth", budget: 7500,
        description: "Double sharing with attached washroom and balcony.",
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=500&auto=format&fit=crop&q=60",
        type: "Double Sharing", gender: "Co-Ed", available_rooms: 3,
        amenities: ["AC", "Wi-Fi", "Attached Bathroom", "Balcony", "TV", "Power Backup"],
        rules: "Quiet hours after 11 PM. No smoking.",
        contact: { name: "Rajesh Mehta", phone: "+91 98123 45678" },
        address: "15 Dharampeth Main Road, Nagpur - 440010",
    },
    {
        id: 7, title: "Sadar Economy Stay", area: "Sadar", budget: 4000,
        description: "Triple sharing budget PG with home-cooked food.",
        image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&auto=format&fit=crop&q=60",
        type: "Triple Sharing", gender: "Boys", available_rooms: 8,
        amenities: ["Meals (3x)", "Shared Bathroom", "Fan", "CCTV"],
        rules: "Students preferred. Gate closes at 10:30 PM.",
        contact: { name: "Mohan Rao", phone: "+91 94567 89012" },
        address: "Sadar Market Area, Nagpur - 440001",
    },
    {
        id: 8, title: "Ramdaspeth Elite Living", area: "Ramdaspeth", budget: 10000,
        description: "Premium living experience with gym and rooftop access.",
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60",
        type: "Single Sharing", gender: "Co-Ed", available_rooms: 2,
        amenities: ["AC", "Wi-Fi", "Meals (3x)", "Gym", "Rooftop", "Housekeeping", "Laundry"],
        rules: "No smoking. Guests allowed till 8 PM. Gate closes at 11 PM.",
        contact: { name: "Neha Singh", phone: "+91 87654 32109" },
        address: "Elite Residency, Ramdaspeth, Nagpur - 440010",
    },
    {
        id: 9, title: "Sitabuldi Comforts", area: "Sitabuldi", budget: 5500,
        description: "Good food, clean rooms, and friendly environment.",
        image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60",
        type: "Double Sharing", gender: "Co-Ed", available_rooms: 4,
        amenities: ["Wi-Fi", "Meals (2x)", "Hot Water", "CCTV", "Fan"],
        rules: "No loud music. Gate closes at 10:30 PM.",
        contact: { name: "Shweta Kulkarni", phone: "+91 93456 78901" },
        address: "Comforts Lane, Sitabuldi, Nagpur - 440012",
    },
    {
        id: 10, title: "Manish Nagar PG", area: "Manish Nagar", budget: 6000,
        description: "Brand new building, fully furnished with modern interiors.",
        image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60",
        type: "Single / Double Sharing", gender: "Co-Ed", available_rooms: 5,
        amenities: ["AC", "Wi-Fi", "Power Backup", "Parking", "CCTV", "Housekeeping"],
        rules: "No pets. Gate closes at 11 PM.",
        contact: { name: "Vikram Tiwari", phone: "+91 92345 67890" },
        address: "Manish Nagar Square, Nagpur - 440015",
    },
    {
        id: 11, title: "Manish Nagar Girls Hostel", area: "Manish Nagar", budget: 6500,
        description: "Safe and secure for girls with CCTV surveillance.",
        image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60",
        type: "Single / Double Sharing", gender: "Girls", available_rooms: 3,
        amenities: ["AC", "Wi-Fi", "Meals (3x)", "CCTV", "Biometric", "Hot Water"],
        rules: "Girls only. Gate closes at 9:30 PM.",
        contact: { name: "Sunita Nair", phone: "+91 96789 01234" },
        address: "Block B, Manish Nagar, Nagpur - 440015",
    },
    {
        id: 12, title: "Medical Square PG", area: "Medical Square", budget: 4500,
        description: "Ideal for medical students, walking distance to hospital.",
        image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=60",
        type: "Double / Triple Sharing", gender: "Co-Ed", available_rooms: 7,
        amenities: ["Wi-Fi", "Meals (2x)", "Study Room", "CCTV", "Fan"],
        rules: "Medical students preferred. Quiet hours after 10 PM.",
        contact: { name: "Dr. Ashok Pande", phone: "+91 95678 90123" },
        address: "Near GH Hospital, Medical Square, Nagpur - 440009",
    },
    {
        id: 13, title: "Wardhaman Nagar Premium", area: "Wardhaman Nagar", budget: 8500,
        description: "Luxury living in East Nagpur with all amenities.",
        image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop&q=60",
        type: "Single Sharing", gender: "Co-Ed", available_rooms: 2,
        amenities: ["AC", "Wi-Fi", "Meals (3x)", "Gym", "Parking", "Housekeeping", "TV"],
        rules: "No smoking. Guests allowed till 9 PM.",
        contact: { name: "Mahesh Bora", phone: "+91 97890 12345" },
        address: "Premium Towers, Wardhaman Nagar, Nagpur - 440035",
    },
    {
        id: 14, title: "Gittikhadan Boys PG", area: "Gittikhadan", budget: 4000,
        description: "Near colleges, cheap and best for student community.",
        image_url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&auto=format&fit=crop&q=60",
        type: "Triple Sharing", gender: "Boys", available_rooms: 9,
        amenities: ["Wi-Fi", "Meals (2x)", "Fan", "Common Room", "CCTV"],
        rules: "Students only. No smoking. Gate closes at 10 PM.",
        contact: { name: "Ganesh Wankhede", phone: "+91 94321 09876" },
        address: "Near RTMNU, Gittikhadan, Nagpur - 440013",
    },
    {
        id: 15, title: "Zingabai Takli Budget Stay", area: "Zingabai Takli", budget: 3500,
        description: "Most affordable stays in Nagpur for everyone.",
        image_url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&auto=format&fit=crop&q=60",
        type: "Triple Sharing", gender: "Co-Ed", available_rooms: 10,
        amenities: ["Fan", "Shared Kitchen", "Common Bathroom", "CCTV"],
        rules: "No alcohol. Gate closes at 10 PM.",
        contact: { name: "Babu Chhatrapati", phone: "+91 93210 98765" },
        address: "Zingabai Takli Main Road, Nagpur - 440030",
    },
    {
        id: 16, title: "Laxmi Nagar Deluxe PG", area: "Laxmi Nagar", budget: 7000,
        description: "Deluxe rooms with attached bathroom and study table.",
        image_url: "https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?w=500&auto=format&fit=crop&q=60",
        type: "Single / Double Sharing", gender: "Co-Ed", available_rooms: 4,
        amenities: ["AC", "Wi-Fi", "Attached Bathroom", "Study Table", "Laundry", "TV"],
        rules: "No loud music after 11 PM. No smoking.",
        contact: { name: "Pooja Agarwal", phone: "+91 98000 12345" },
        address: "Laxmi Chowk, Laxmi Nagar, Nagpur - 440022",
    },
    {
        id: 17, title: "Hingna Road Students PG", area: "Hingna Road", budget: 5000,
        description: "Close to engineering colleges with Wi-Fi included.",
        image_url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&auto=format&fit=crop&q=60",
        type: "Double Sharing", gender: "Boys", available_rooms: 6,
        amenities: ["Wi-Fi", "Meals (2x)", "Study Room", "Power Backup", "CCTV"],
        rules: "Engineering students preferred. Gate closes at 10:30 PM.",
        contact: { name: "Rakesh Ingole", phone: "+91 97111 22333" },
        address: "Near VNIT, Hingna Road, Nagpur - 440016",
    },
    {
        id: 18, title: "Civil Lines Executive PG", area: "Civil Lines", budget: 12000,
        description: "Executive rooms for working professionals with AC and meals.",
        image_url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&auto=format&fit=crop&q=60",
        type: "Single Sharing", gender: "Co-Ed", available_rooms: 2,
        amenities: ["AC", "Wi-Fi", "Meals (3x)", "TV", "Housekeeping", "Parking", "Gym"],
        rules: "Working professionals only. Gate closes at 11:30 PM.",
        contact: { name: "Anjali Kapoor", phone: "+91 96555 44333" },
        address: "Civil Lines Avenue, Nagpur - 440001",
    },
    {
        id: 19, title: "Trimurti Nagar PG", area: "Trimurti Nagar", budget: 5500,
        description: "Quiet neighbourhood PG with spacious rooms.",
        image_url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&auto=format&fit=crop&q=60",
        type: "Single / Double Sharing", gender: "Co-Ed", available_rooms: 5,
        amenities: ["Wi-Fi", "Meals (2x)", "Fan", "Hot Water", "CCTV", "Common Room"],
        rules: "Families and working professionals welcome. Gate closes at 10:30 PM.",
        contact: { name: "Sanjay Thakre", phone: "+91 92222 33444" },
        address: "Trimurti Chowk, Trimurti Nagar, Nagpur - 440022",
    },
    {
        id: 20, title: "Pratap Nagar Co-Living", area: "Pratap Nagar", budget: 8000,
        description: "Modern co-living space with community events.",
        image_url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=500&auto=format&fit=crop&q=60",
        type: "Single / Double Sharing", gender: "Co-Ed", available_rooms: 3,
        amenities: ["AC", "Wi-Fi", "Community Kitchen", "Game Room", "Housekeeping", "Events"],
        rules: "No loud parties after 11 PM. Respectful community environment.",
        contact: { name: "Riya Mishra", phone: "+91 93333 55666" },
        address: "Coliving Hub, Pratap Nagar, Nagpur - 440018",
    },
];

const amenityIcons = {
    "AC": <Wind size={15} />, "Wi-Fi": <Wifi size={15} />, "Meals (3x)": <Utensils size={15} />,
    "Meals (2x)": <Utensils size={15} />, "Gym": <Dumbbell size={15} />, "CCTV": <ShieldCheck size={15} />,
    "Parking": <Car size={15} />, "TV": <Tv size={15} />, "Hot Water": <Droplets size={15} />,
};

const PropertyModal = ({ property, onClose }) => {
    if (!property) return null;
    return (
        <div onClick={onClose} style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            overflowY: 'auto', padding: '2rem 1rem'
        }}>
            <div onClick={e => e.stopPropagation()} style={{
                background: 'var(--surface-color)', borderRadius: '16px', width: '100%', maxWidth: '680px',
                margin: 'auto', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                position: 'relative', maxHeight: 'none'
            }}>
                {/* Image */}
                <img src={property.image_url} alt={property.title}
                    style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />

                {/* Close Button */}
                <button onClick={onClose} style={{
                    position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)',
                    border: 'none', borderRadius: '50%', width: '36px', height: '36px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#fff'
                }}>
                    <X size={18} />
                </button>

                {/* Availability badge */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: property.available_rooms > 0 ? '#22c55e' : '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600' }}>
                    {property.available_rooms > 0 ? `${property.available_rooms} Rooms Available` : 'Fully Occupied'}
                </div>

                <div style={{ padding: '1.75rem' }}>
                    {/* Title & Price */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)' }}>{property.title}</h2>
                        <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.3rem', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                            ₹{property.budget?.toLocaleString('en-IN')}/mo
                        </span>
                    </div>

                    {/* Location */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <MapPin size={14} /> {property.address || `${property.area}, Nagpur`}
                    </div>

                    {/* Tags row */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                        {property.type && <span style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>{property.type}</span>}
                        {property.gender && <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>{property.gender}</span>}
                    </div>

                    {/* Description */}
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>{property.description}</p>

                    {/* Amenities */}
                    {property.amenities && (
                        <div style={{ marginBottom: '1.25rem' }}>
                            <h4 style={{ fontWeight: '600', marginBottom: '0.6rem', color: 'var(--text-main)' }}>Amenities</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {property.amenities.map(a => (
                                    <span key={a} style={{
                                        display: 'flex', alignItems: 'center', gap: '5px',
                                        background: 'var(--bg-color)', border: '1px solid var(--border)',
                                        borderRadius: '8px', padding: '5px 10px', fontSize: '0.82rem', color: 'var(--text-main)'
                                    }}>
                                        {amenityIcons[a] || null} {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* House Rules */}
                    {property.rules && (
                        <div style={{ marginBottom: '1.25rem', background: 'rgba(239,68,68,0.07)', borderRadius: '10px', padding: '0.85rem 1rem' }}>
                            <h4 style={{ fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>🏠 House Rules</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{property.rules}</p>
                        </div>
                    )}

                    {/* Contact */}
                    {property.contact && (
                        <div style={{ background: 'rgba(99,102,241,0.08)', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ background: 'var(--primary)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={18} color="#fff" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>{property.contact.name}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Owner / Manager</div>
                                </div>
                            </div>
                            <a href={`tel:${property.contact.phone}`} style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                background: 'var(--primary)', color: '#fff',
                                padding: '0.55rem 1.1rem', borderRadius: '8px',
                                textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem'
                            }}>
                                <Phone size={15} /> {property.contact.phone}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [area, setArea] = useState('');
    const [maxBudget, setMaxBudget] = useState('');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const location = useLocation();

    const fetchProperties = async (searchArea = '', searchBudget = '') => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'properties'));
            let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (data.length > 0) {
                if (searchArea) data = data.filter(p => p.area.toLowerCase().includes(searchArea.toLowerCase()));
                if (searchBudget) data = data.filter(p => p.budget <= parseInt(searchBudget));
                setProperties(data);
            } else {
                throw new Error('No Firestore data');
            }
        } catch (error) {
            console.warn('Firestore not available, using fallback data', error);
            let filtered = fallbackProperties;
            if (searchArea) filtered = filtered.filter(p => p.area.toLowerCase().includes(searchArea.toLowerCase()));
            if (searchBudget) filtered = filtered.filter(p => p.budget <= parseInt(searchBudget));
            setProperties(filtered);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.hash === '') {
            setArea('');
            setMaxBudget('');
            fetchProperties('', '');
        } else if (location.hash === '#properties') {
            document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProperties(area, maxBudget);
        setTimeout(() => {
            document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    };

    return (
        <div>
            {/* Property Detail Modal */}
            {selectedProperty && (
                <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
            )}

            {/* Hero / Search Section */}
            <section className="hero" id="search">
                <div className="container">
                    <h1 className="hero-title">Find Your Perfect PG in Nagpur</h1>
                    <p className="hero-subtitle">Discover comfortable and affordable PG rooms across the Orange City. Search by area and budget.</p>

                    <form className="search-container" onSubmit={handleSearch}>
                        <div className="search-field">
                            <label>Location Area</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} color="var(--text-muted)" />
                                <input
                                    type="text"
                                    placeholder="e.g. Dharampeth, Sadar..."
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="search-field">
                            <label>Max Budget</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <IndianRupee size={16} color="var(--text-muted)" />
                                <select value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} style={{ flex: 1 }}>
                                    <option value="">Any Budget</option>
                                    <option value="4000">₹4,000</option>
                                    <option value="5000">₹5,000</option>
                                    <option value="6000">₹6,000</option>
                                    <option value="8000">₹8,000</option>
                                    <option value="10000">₹10,000</option>
                                    <option value="12000">₹12,000</option>
                                    <option value="15000">₹15,000</option>
                                    <option value="20000">₹20,000+</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="search-btn">
                            <Search size={20} />
                        </button>
                    </form>
                </div>
            </section>

            {/* Properties Section */}
            <section className="container" id="properties">
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    <>
                        <h2 className="section-heading">
                            {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Found
                        </h2>
                        <div className="property-grid">
                            {properties.map(property => (
                                <div key={property.id} className="property-card">
                                    <img src={property.image_url} alt={property.title} className="property-image" />
                                    <div className="property-content">
                                        <div className="property-price">₹{property.budget?.toLocaleString('en-IN')}/month</div>
                                        <h3 className="property-title">{property.title}</h3>
                                        <div className="property-area">
                                            <MapPin size={14} />
                                            {property.area}, Nagpur
                                        </div>
                                        <p className="property-desc">{property.description}</p>
                                        <button
                                            className="btn btn-primary"
                                            style={{ width: '100%', marginTop: 'auto' }}
                                            onClick={() => setSelectedProperty(property)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {properties.length === 0 && (
                            <div className="empty-state">
                                <Search size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                <h3>No properties match your filter</h3>
                                <p>Try expanding your search area or budget.</p>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};
