import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  CheckCircle, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Truck, 
  ArrowLeft, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Checkout() {
  const { cart, totalCartPrice, totalCartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    zip: '97477',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    exp: '12/28',
    cvv: '888'
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingFee = totalCartPrice > 100 || totalCartPrice === 0 ? 0 : 9.99;
  const finalPrice = totalCartPrice + shippingFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsOrdered(true);

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (isOrdered) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '32px',
          padding: '3.5rem 2rem',
          maxWidth: '560px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
          boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.25)'
        }}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            backgroundColor: '#ecfdf5',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <CheckCircle style={{ width: '48px', height: '48px' }} />
          </div>

          <span className="badge badge-green" style={{ marginBottom: '8px' }}>
            Payment Successful
          </span>

          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Thank You For Your Order!
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Your order <strong>#{orderId}</strong> has been confirmed and is being processed for dispatch.
          </p>

          <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>
              <span>Recipient:</span>
              <strong style={{ color: '#0f172a' }}>{formData.firstName} {formData.lastName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>
              <span>Destination:</span>
              <strong style={{ color: '#0f172a' }}>{formData.city}, {formData.country}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
              <span>Total Paid:</span>
              <strong style={{ color: '#2563eb' }}>${finalPrice.toFixed(2)}</strong>
            </div>
          </div>

          <button 
            onClick={() => {
              clearCart();
              navigate('/shop');
            }} 
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.9rem' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem 4rem 1.5rem' }}>
      
      {/* PAGE HEADER */}
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => navigate('/cart')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.75rem' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
          Secure Checkout
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
          
          {/* LEFT FORM COLUMNS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* 1. SHIPPING INFO */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '2rem',
              border: '1px solid #e2e8f0',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck className="w-5 h-5 text-blue-600" /> 1. Shipping Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Street Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Postal Code</label>
                  <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Country</label>
                  <input type="text" name="country" value={formData.country} onChange={handleInputChange} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>
            </div>

            {/* 2. PAYMENT METHOD */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '2rem',
              border: '1px solid #e2e8f0',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard className="w-5 h-5 text-blue-600" /> 2. Payment Method
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { id: 'card', name: 'Credit Card', sub: 'Visa / MasterCard' },
                  { id: 'paypal', name: 'PayPal', sub: 'Express Checkout' },
                  { id: 'apple', name: 'Apple Pay', sub: 'Touch ID / Face ID' }
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '14px',
                      border: paymentMethod === method.id ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      backgroundColor: paymentMethod === method.id ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{method.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{method.sub}</div>
                  </div>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Card Number</label>
                    <input type="text" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Expiration</label>
                      <input type="text" value={cardDetails.exp} onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>CVV Code</label>
                      <input type="text" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} required style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT ORDER SUMMARY */}
          <div>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '1.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: 'var(--shadow-md)',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '4px' }}>
                {cart.map((item) => (
                  <div key={item.cartItemId} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>${totalCartPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Shipping</span>
                  <span style={{ fontWeight: 700, color: shippingFee === 0 ? '#10b981' : '#0f172a' }}>
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                  <span>Total Due</span>
                  <span style={{ color: '#2563eb' }}>${finalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-accent" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}>
                Place Order Now <Sparkles className="w-4 h-4" />
              </button>

              <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Lock className="w-4 h-4 text-emerald-500" /> 256-Bit TLS Bank Grade Encryption
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
