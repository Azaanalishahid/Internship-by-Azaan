import React, { useState } from 'react';
import { Search, PackageCheck, Truck, Clock, CheckCircle2, MapPin, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderTracking() {
  const [orderQuery, setOrderQuery] = useState('ORD-849201');
  const [activeOrder, setActiveOrder] = useState({
    id: 'ORD-849201',
    date: 'August 6, 2026',
    estDelivery: 'August 8, 2026',
    status: 'In Transit',
    currentStep: 2,
    carrier: 'FedEx Express (Tracking #940010002)',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
    items: [
      { name: 'SphereSound Pro ANC Headphones', qty: 1, price: 249.99 },
      { name: 'Apex Runner Nitro Sneakers', qty: 1, price: 139.95 }
    ]
  });

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setActiveOrder({
        ...activeOrder,
        id: orderQuery.trim().toUpperCase()
      });
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'August 6, 09:30 AM', done: true },
    { title: 'Quality Inspected', desc: 'August 6, 11:15 AM', done: true },
    { title: 'Shipped via Express', desc: 'August 6, 02:45 PM', done: true },
    { title: 'Out for Delivery', desc: 'Expected August 8', done: false }
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
        <button onClick={() => navigate('/')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', marginBottom: '1rem' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </button>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
          Track Your Order Live
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
          Enter your Order Receipt ID to view live carrier shipping progress and delivery estimates.
        </p>

        {/* SEARCH FORM */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search className="w-5 h-5 text-slate-400" style={{ position: 'absolute', left: '16px' }} />
            <input
              type="text"
              placeholder="e.g. ORD-849201"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 3rem',
                borderRadius: '16px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                fontWeight: 600
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.5rem', borderRadius: '16px' }}>
            Track Order
          </button>
        </form>
      </div>

      {/* TRACKING TIMELINE CARD */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '32px',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-md)',
        maxWidth: '860px',
        margin: '0 auto'
      }}>
        {/* ORDER SUMMARY BAR */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '2.5rem',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Tracking Number</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{activeOrder.id}</h3>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-blue" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
              <Truck className="w-4 h-4" /> {activeOrder.status}
            </span>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
              Estimated Delivery: <strong style={{ color: '#0f172a' }}>{activeOrder.estDelivery}</strong>
            </div>
          </div>
        </div>

        {/* PROGRESS STEPPER TIMELINE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '3rem',
          position: 'relative'
        }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: step.done ? '#2563eb' : '#f1f5f9',
                color: step.done ? '#ffffff' : '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem auto',
                boxShadow: step.done ? '0 4px 14px rgba(37, 99, 235, 0.35)' : 'none'
              }}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: step.done ? '#0f172a' : '#94a3b8' }}>
                {step.title}
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* DETAILS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin className="w-4 h-4 text-blue-600" /> Delivery Address
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
              {activeOrder.address}
            </p>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>
              Carrier: <strong>{activeOrder.carrier}</strong>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PackageCheck className="w-4 h-4 text-orange-500" /> Items Included ({activeOrder.items.length})
            </h4>
            {activeOrder.items.map((it, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569', marginBottom: '4px' }}>
                <span>{it.qty}x {it.name}</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>${it.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
