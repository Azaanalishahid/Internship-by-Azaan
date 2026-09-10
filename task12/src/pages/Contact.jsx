import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const faqs = [
    {
      q: 'How do I track my order shipment status?',
      a: 'Once your order is dispatched, you will receive an automated email containing a live tracking link. You can also view real-time status under your Account.'
    },
    {
      q: 'What is your standard return and exchange policy?',
      a: 'We offer a 30-day no-questions-asked return policy on all eligible items. Items must be in original condition with tags and packaging intact.'
    },
    {
      q: 'Do you offer free international shipping?',
      a: 'Yes! We offer Free Worldwide Express Shipping on all orders over $100. Standard flat rate of $9.99 applies for smaller orders.'
    },
    {
      q: 'Are your tech products covered under warranty?',
      a: 'Every electronic product sold on ShopSphere includes a complimentary 2-year official manufacturer warranty protecting against defect.'
    }
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
        <span className="badge badge-blue">Support Center</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
          We Are Here To Help You
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '8px' }}>
          Have questions about an order, product sizing, or partnerships? Reach out to our 24/7 support team.
        </p>
      </div>

      {/* CARDS ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '4rem'
      }}>
        <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '24px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <Mail className="w-5 h-5" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Email Us</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Response within 2 hours</p>
          <a href="mailto:support@shopsphere.com" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb' }}>support@shopsphere.com</a>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '24px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <Phone className="w-5 h-5" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Call Hotline</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Mon - Sun (24/7)</p>
          <a href="tel:+18005550199" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f97316' }}>+1 (800) 555-0199</a>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '24px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <MapPin className="w-5 h-5" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Headquarters</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Silicon Valley Hub</p>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>San Francisco, CA</span>
        </div>
      </div>

      {/* FORM & FAQ GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        
        {/* CONTACT FORM */}
        <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
            Send Us A Message
          </h2>

          {submitted && (
            <div style={{ backgroundColor: '#ecfdf5', color: '#047857', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              Message sent successfully! Our support agents will contact you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Your Name</label>
              <input 
                type="text" 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe" 
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Your Email</label>
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com" 
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Message Subject</label>
              <input 
                type="text" 
                value={formData.subject} 
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Order inquiry..." 
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Message Details</label>
              <textarea 
                rows="4" 
                required 
                value={formData.message} 
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your query here..." 
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem' }}>
              <Send className="w-4 h-4" /> Submit Inquiry
            </button>
          </form>
        </div>

        {/* FAQ ACCORDION */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ backgroundColor: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, borderTop: '1px solid #f1f5f9' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
