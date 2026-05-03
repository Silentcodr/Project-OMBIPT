import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Phone, MapPin, Mail, MessageCircle, Star, X, Check, ArrowRight, Battery, Zap, Wrench, Truck, RefreshCw, Tag, User } from 'lucide-react';
import './App.css';

const WhatsAppIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.38c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.476 0 1.46 1.064 2.87 1.213 3.069.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.575-.086 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.439-9.884 9.884-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WHATSAPP_NUMBER = "917708802791"; // Added country code 91

const categories = [
  'INVERTER', 'INVERTER-BATTERY', 'HOME UPS COMBO', 
  'TWO WHEELER BATTERY', 'CAR BATTERY', 
  'HEAVY VEHICLE BATTERY', 'SMF BATTERY'
];

const products = [
  { 
    id: 1, 
    title: 'Exide Star Inverter', 
    category: 'INVERTER', 
    brand: 'Exide', 
    img: '/products/exide_star_inverter.png',
    description: '42M Warranty, MC Al Pure Sine',
    variants: [
      { id: '1a', model: 'STAR12V700', specs: '12V 700' },
      { id: '1b', model: 'STAR12V900', specs: '12V 900' },
      { id: '1c', model: 'STAR12V1125', specs: '12V 1125' },
      { id: '1d', model: 'STAR12V1375', specs: '12V 1375' },
      { id: '1e', model: 'STAR12V1625', specs: '12V 1625' },
      { id: '1f', model: 'STAR24V1625', specs: '24V 1625' },
      { id: '1g', model: 'STAR24V2550', specs: '24V 2550' }
    ]
  },
  { 
    id: 2, 
    title: 'Luminous Optimus UPS', 
    category: 'INVERTER', 
    brand: 'Luminous', 
    img: '/products/luminous_optimus.png',
    description: 'High performance pure sine wave UPS',
    variants: [
      { id: '2a', model: 'OPTIMUS 2300+', specs: '2KVA / 24V' },
      { id: '2b', model: 'OPTIMUS 2800+', specs: '2.5KVA / 24V' },
      { id: '2c', model: 'OPTIMUS 3500+', specs: '3KVA / 24V' },
      { id: '2d', model: 'OPTIMUS 3800+', specs: '3.5KVA / 36V' },
      { id: '2e', model: 'OPTIMUS 4300+', specs: '4KVA / 36V' },
      { id: '2f', model: 'OPTIMUS 4500+', specs: '4KVA / 48V' },
      { id: '2g', model: 'OPTIMUS 6000+', specs: '5KVA / 48V' },
      { id: '2h', model: 'OPTIMUS 6500+', specs: '5.5KVA / 72V' },
      { id: '2i', model: 'OPTIMUS 8000+', specs: '7.5KVA / 96V' },
      { id: '2j', model: 'OPTIMUS 11000+', specs: '10KVA / 120V' }
    ]
  },
  { id: 3, title: 'Luminous Eco Volt', category: 'INVERTER', brand: 'Luminous', img: '/products/luminous_ecovolt.png', variants: [{ id: '3a', model: 'Eco Volt Neo 2300+', specs: '2KVA / 24V' }] },
  { id: 4, title: 'Luminous I-Cruze', category: 'INVERTER', brand: 'Luminous', img: '/products/luminous_icruze.png', variants: [{ id: '4a', model: 'I-CRUZE 7000+', specs: '6KVA / 96V' }, { id: '4b', model: 'I-CRUZE 9000+', specs: '7.5KVA / 120V' }] },
  { id: 5, title: 'Exide Mileage', category: 'CAR BATTERY', brand: 'Exide', img: '/products/exide_mileage.png' },
  { id: 6, title: 'Amaron Pro Bike Rider', category: 'TWO WHEELER BATTERY', brand: 'Amaron', img: '/products/amaron_pro_rider.png' },
  { id: 7, title: 'Exide Xpress Heavy Duty', category: 'HEAVY VEHICLE BATTERY', brand: 'Exide', img: '/products/exide_xpress.png' },
  { id: 8, title: 'Torque Battery Pack', category: 'INVERTER-BATTERY', brand: 'Torque', img: '/products/torque_battery.png' },
  { id: 9, title: 'Exide IMST1000', category: 'INVERTER-BATTERY', brand: 'Exide', img: '/products/exide_imst1000.jpeg', description: 'Exide Home InvaMaster' },
  { id: 10, title: 'Luminous RC18000 + Inverter 1050 Combo', category: 'HOME UPS COMBO', brand: 'Luminous', img: '/products/luminous_rc18000_combo_v2.png', description: 'RC 18000 150Ah Battery + Eco Volt Neo 1050 Inverter' },
  { id: 11, title: 'Exide Xplore XLTZ5A', category: 'TWO WHEELER BATTERY', brand: 'Exide', img: '/products/exide_xplore_xltz5a.jpeg', description: 'Motorcycle VRLA Battery (48 Months Warranty)' },
  { id: 12, title: 'Exide IMTT1500 + Inverter Star Combo', category: 'HOME UPS COMBO', brand: 'Exide', img: '/products/exide_imtt1500_combo.jpeg', description: 'IMTT1500 150Ah Battery + Star 12V/1125VA Inverter' }
];

const brands = ['Exide', 'Torque', 'Microtek', 'Luminous', 'Amaron'];

const testimonials = [
  { id: 1, name: 'Karthik Raja', text: 'Service romba nalla irundhuchu. Battery and Inverter price unmaiyale market la romba competitive ah kudukuranga. Om Muruga is the best shop in Walajabad.' },
  { id: 6, name: 'Thirisha', text: 'Bought a new battery for my scooter here. The price was very reasonable and their customer service was excellent. They changed it very quickly! Happy with the service.' },
  { id: 2, name: 'Priya Patel', text: 'Bought a Luminous inverter and battery combo. Genuine products and very competitive pricing. Highly recommend OM MURUGA!' },
  { id: 3, name: 'Muruganandam', text: 'அருமையான சேவை மற்றும் தரமான பேட்டரிகள் கிடைக்கின்றன. எங்கள் வீட்டிற்கு தேவையான சிறந்த இன்வெர்ட்டரை தேர்வு செய்ய உதவியாக இருந்தனர்.' },
  { id: 4, name: 'Suresh Kumar', text: 'Quick installation and superb after-sales support. Their team is very knowledgeable about power backup systems.' },
  { id: 5, name: 'Vignesh', text: 'Installation viraivaga mudinthathu. Staffs ellam nalla response panranga. Highly recommended for batteries!' }
];

function App() {
  const [inquiryList, setInquiryList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  // Variant Modal State
  const [selectedBaseProduct, setSelectedBaseProduct] = useState(null);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  const openVariants = (product) => {
    setSelectedBaseProduct(product);
    setIsVariantModalOpen(true);
  };
  
  // New state for direct WhatsApp chat modal
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [waFormData, setWaFormData] = useState({ name: '', reason: 'General Enquiry' });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [storeStatus, setStoreStatus] = useState({ isOpen: false, todaysHours: '' });

  const carouselRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday
      const hour = now.getHours();
      
      let isOpen = false;
      let todaysHours = "9:00 AM - 8:00 PM";

      if (day === 0) {
        todaysHours = "9:00 AM - 1:00 PM";
        if (hour >= 9 && hour < 13) isOpen = true;
      } else {
        if (hour >= 9 && hour < 20) isOpen = true;
      }

      setStoreStatus({ isOpen, todaysHours });
    };

    checkStoreStatus();
    const statusInterval = setInterval(checkStoreStatus, 60000);
    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // If reached the end, scroll back to the start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // 350px card width + 32px (2rem) gap = 382px
          carouselRef.current.scrollBy({ left: 382, behavior: 'smooth' });
        }
      }
    }, 4500); // 4.5 seconds to read
    return () => clearInterval(interval);
  }, []);

  const addToInquiry = (product) => {
    if (!inquiryList.find(item => item.id === product.id)) {
      setInquiryList([...inquiryList, product]);
    }
    
    setToastMessage(`"${product.title}" jumped into the cart successfully!`);
    setShowToast(true);
    
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const removeFromInquiry = (productId) => {
    setInquiryList(inquiryList.filter(item => item.id !== productId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWaInputChange = (e) => {
    const { name, value } = e.target;
    setWaFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitWaDirect = (e) => {
    e.preventDefault();
    const messageText = `Hi, my name is ${waFormData.name}.\nI am contacting you regarding: ${waFormData.reason}.`;
    const encodedMessage = encodeURIComponent(messageText);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setIsWaModalOpen(false);
  };

  const submitInquiry = (e) => {
    e.preventDefault();
    if (inquiryList.length === 0) return;

    let messageText = `Hi Saravanan,\n\nMy name is ${formData.name}. I am interested in getting a quote for the following items:\n\n`;
    
    inquiryList.forEach((item, index) => {
      const variantText = item.variantModel ? ` - ${item.variantModel}` : '';
      messageText += `${index + 1}. ${item.title}${variantText} (${item.brand})\n`;
    });

    if (formData.message) {
      messageText += `\nAdditional details: ${formData.message}\n`;
    }

    messageText += `\nYou can reach me at: ${formData.phone}\nLooking forward to your reply!`;

    const encodedMessage = encodeURIComponent(messageText);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setIsDrawerOpen(false);
  };

  return (
    <div className="App">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-info">
            <span><Phone size={14} /> <a href={`tel:+${WHATSAPP_NUMBER}`} style={{color: 'inherit', textDecoration: 'none'}}>+91 77088 02791</a></span>
            <span className="top-bar-divider"></span>
            <span className="top-bar-address"><MapPin size={14} /> Walajabad, TN 631605</span>
          </div>
          <div className="top-bar-hours">
            <span className={`status-badge ${storeStatus.isOpen ? 'open' : 'closed'}`}>
              {storeStatus.isOpen ? 'Open Now' : 'Closed'}
            </span>
            <span>Today: {storeStatus.todaysHours}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container main-header">
          <div className="logo">
            <h1>OM MURUGA</h1>
            <p>BATTERIES, INVERTER & POWER TOOLS</p>
          </div>
          <nav className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
          <button className="cart-btn" onClick={() => setIsDrawerOpen(true)}>
            <ShoppingCart />
            {inquiryList.length > 0 && <span className="cart-badge">{inquiryList.length}</span>}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container animate-fade-in">
          <h1>Reliable Power Backup <span>Solutions</span></h1>
          <p>Your one-stop destination for genuine batteries, high-performance inverters, and UPS systems from top global brands.</p>
          <div className="hero-btns">
            <a href="#products" className="btn btn-primary">View Products <ArrowRight size={18} /></a>
            <button onClick={() => setIsWaModalOpen(true)} className="btn btn-whatsapp"><WhatsAppIcon size={18} /> Chat on WhatsApp</button>
          </div>
        </div>
      </section>

      {/* Features/Value Proposition Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Truck size={36} /></div>
              <h3>Free Delivery & Installation</h3>
              <p>Fast, professional setup right at your doorstep.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><RefreshCw size={36} /></div>
              <h3>Best Exchange Price</h3>
              <p>Get the highest market value for your old batteries.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Tag size={36} /></div>
              <h3>Exclusive Offers</h3>
              <p>Unbeatable combo deals and discounts on top brands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <div className="container">
          <h3 className="brands-title">AUTHORIZED DEALERS OF TOP BRANDS</h3>
          <div className="brands-grid">
            {brands.map((brand, idx) => (
              <div key={idx} className="brand-card">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section section-padding">
        <div className="container">
          <h2 className="section-title">Our <span>Products</span></h2>

          {/* Category Tags */}
          <div className="category-filters">
            {categories.map(cat => (
              <div key={cat} className="category-tag">
                {cat}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-img-wrap">
                  <img src={product.img} alt={product.title} loading="lazy" />
                </div>
                <div className="product-info">
                  <span className="product-category">
                    {product.category.includes('INVERTER') ? <Zap size={14} className="inline mr-1" /> : 
                     product.category === 'WATER PURIFIER' ? <Wrench size={14} className="inline mr-1" /> : 
                     <Battery size={14} className="inline mr-1" />}
                    {product.brand} &bull; {product.category.replace('-', ' ')}
                  </span>
                  <h3 className="product-title">{product.title}</h3>
                  {product.variants ? (
                    <button className="btn btn-primary" onClick={() => openVariants(product)}>
                      Select Model
                    </button>
                  ) : (
                    <button 
                      className={`btn ${inquiryList.find(i => i.id === product.id) ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => addToInquiry(product)}
                    >
                      {inquiryList.find(i => i.id === product.id) ? <><Check size={18} /> Added to Inquiry</> : <><ShoppingCart size={18} /> Add to Inquiry</>}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section section-padding">
        <div className="container">
          <h2 className="section-title">What Our <span>Customers Say</span></h2>
          <div className="testimonials-carousel" ref={carouselRef}>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="stars">
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>Verified Customer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <div className="logo">
                <h1 style={{color: 'var(--white)'}}>OM MURUGA</h1>
                <p>BATTERIES, INVERTER & POWER TOOLS</p>
              </div>
              <p className="footer-description">Providing trusted and branded power solutions to homes and businesses. Quality products, expert advice, and reliable after-sales service.</p>
            </div>
            <div className="footer-contact">
              <h3 className="footer-heading">Contact Us</h3>
              <ul className="footer-links">
                <li style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
                  <User size={18} style={{flexShrink: 0, marginTop: '2px'}} /> 
                  <span>Saravanan (Proprietor)</span>
                </li>
                <li style={{display: 'flex', gap: '0.5rem'}}>
                  <MapPin size={18} style={{flexShrink: 0}} /> 
                  <a href="https://maps.app.goo.gl/RqSPovKYoxFJFqLAA" target="_blank" rel="noreferrer" style={{textDecoration: 'underline'}}>No.3 masillamani, Mill Rd, Walajabad, Tamil Nadu 631605</a>
                </li>
                <li style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}><Phone size={18} /> <a href={`tel:+${WHATSAPP_NUMBER}`}>+91 77088 02791</a></li>
                <li style={{display: 'flex', gap: '0.5rem'}}><Mail size={18} /> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Ommurugapowertools04@gmail.com" target="_blank" rel="noreferrer">Ommurugapowertools04@gmail.com</a></li>
              </ul>
            </div>
            <div className="footer-quick-links">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Our Products</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Om Muruga Batteries, Inverter & Power Tools. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <a href={`tel:+${WHATSAPP_NUMBER}`} className="floating-call" title="Call Us">
        <Phone size={28} />
      </a>
      <button onClick={() => setIsWaModalOpen(true)} className="floating-whatsapp" title="Chat with us on WhatsApp">
        <WhatsAppIcon size={32} />
      </button>

      {/* Inquiry Drawer / Cart */}
      <div className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={() => setIsDrawerOpen(false)}></div>
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Your Inquiry List</h2>
          <button className="close-btn" onClick={() => setIsDrawerOpen(false)}><X /></button>
        </div>
        <div className="drawer-body">
          {inquiryList.length === 0 ? (
            <div className="empty-state">
              <ShoppingCart size={48} style={{margin: '0 auto 1rem', opacity: 0.5}} />
              <p>Your inquiry list is empty. Add products to request a quote.</p>
            </div>
          ) : (
            <>
              <div className="inquiry-items">
                {inquiryList.map(item => (
                  <div key={item.id} className="inquiry-item">
                    <div className="item-info">
                      <p>{item.brand}</p>
                      <h4>{item.title}{item.variantModel ? ` - ${item.variantModel}` : ''}</h4>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromInquiry(item.id)} title="Remove">
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              
              <form className="inquiry-form" onSubmit={submitInquiry}>
                <h3 style={{marginBottom: '1rem', color: 'var(--secondary)'}}>Your Details</h3>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" className="form-control" required value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" className="form-control" required value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Additional Message (Optional)</label>
                  <textarea id="message" name="message" className="form-control" rows="3" value={formData.message} onChange={handleInputChange}></textarea>
                </div>
              </form>
            </>
          )}
        </div>
        <div className="drawer-footer">
          <button 
            className="btn btn-whatsapp" 
            onClick={submitInquiry}
            disabled={inquiryList.length === 0}
            style={{opacity: inquiryList.length === 0 ? 0.5 : 1, cursor: inquiryList.length === 0 ? 'not-allowed' : 'pointer'}}
          >
            <WhatsAppIcon size={18} /> Send Inquiry via WhatsApp
          </button>
        </div>
      </div>

      {/* WhatsApp Direct Modal */}
      <div className={`modal-overlay ${isWaModalOpen ? 'open' : ''}`} onClick={() => setIsWaModalOpen(false)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Chat with Us</h2>
            <button className="close-btn" onClick={() => setIsWaModalOpen(false)}><X /></button>
          </div>
          <div className="modal-body">
            <form className="inquiry-form" onSubmit={submitWaDirect} style={{ borderTop: 'none', paddingTop: 0 }}>
              <div className="form-group">
                <label htmlFor="waName">Your Name *</label>
                <input type="text" id="waName" name="name" className="form-control" required value={waFormData.name} onChange={handleWaInputChange} placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label htmlFor="waReason">Reason for Contacting *</label>
                <select id="waReason" name="reason" className="form-control" value={waFormData.reason} onChange={handleWaInputChange}>
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Place an Order">Place an Order</option>
                  <option value="Product Support">Product Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn btn-whatsapp" style={{ width: '100%', marginTop: '1rem' }}>
                <WhatsAppIcon size={18} /> Continue to WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Variant Selection Modal */}
      <div className={`modal-overlay ${isVariantModalOpen ? 'open' : ''}`} onClick={() => setIsVariantModalOpen(false)}>
        <div className="modal variants-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
          <div className="modal-header">
            <h2>{selectedBaseProduct?.title} Models</h2>
            <button className="close-btn" onClick={() => setIsVariantModalOpen(false)}><X /></button>
          </div>
          <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto', padding: '0' }}>
            {selectedBaseProduct?.variants ? (
              <table className="variants-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 1 }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Model</th>
                    <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Specs</th>
                    <th style={{ textAlign: 'right', padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBaseProduct.variants.map((variant) => {
                    const variantId = `${selectedBaseProduct.id}-${variant.id}`;
                    const isAdded = inquiryList.find(i => i.id === variantId);
                    return (
                      <tr key={variant.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '1rem', fontWeight: '500' }}>{variant.model}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-light)' }}>{variant.specs}</td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button 
                            className={`btn ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
                            style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
                            onClick={() => addToInquiry({...selectedBaseProduct, id: variantId, variantModel: variant.model})}
                          >
                            {isAdded ? 'Added' : 'Add'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`}>
        <Check size={18} color="var(--success)" />
        {toastMessage}
      </div>
    </div>
  );
}

export default App;
