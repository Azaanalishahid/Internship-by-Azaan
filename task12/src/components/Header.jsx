import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  Scale,
  Truck,
  Gift
} from 'lucide-react';

export default function Header() {
  const { totalCartItems, wishlist, compareList, allProducts, setIsCartDrawerOpen, setIsCompareOpen, setIsCouponModalOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [badgeAnimated, setBadgeAnimated] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    if (totalCartItems > 0) {
      setBadgeAnimated(true);
      const timer = setTimeout(() => setBadgeAnimated(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalCartItems]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchFocused(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim() === '' ? [] : allProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Deals', path: '/shop?filter=flash' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="glass-nav" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      transition: 'all 300ms ease',
      boxShadow: isScrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.1)' : 'none',
      height: '76px'
    }}>
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        
        {/* LOGO */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #f97316 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
          }}>
            <Sparkles style={{ width: '22px', height: '22px', color: '#ffffff' }} />
          </div>
          <span style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>
            Shop<span style={{ color: '#2563eb' }}>Sphere</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path && !location.search;
            return (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  fontSize: '0.925rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#2563eb' : '#475569',
                  transition: 'all 200ms ease',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '8px',
                  position: 'relative'
                }}
              >
                {link.name}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '3px',
                    backgroundColor: '#2563eb',
                    borderRadius: '2px'
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* SEARCH BAR & ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* SEARCH INPUT */}
          <div ref={searchRef} style={{ position: 'relative' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  style={{
                    padding: '0.55rem 1rem 0.55rem 2.3rem',
                    borderRadius: '9999px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#f8fafc',
                    width: searchFocused ? '220px' : '170px',
                    outline: 'none',
                    fontSize: '0.85rem',
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <Search style={{ position: 'absolute', left: '12px', width: '15px', height: '15px', color: '#94a3b8', pointerEvents: 'none' }} />
              </div>
            </form>

            {/* LIVE SUGGESTIONS DROPDOWN */}
            {searchFocused && searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '300px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                padding: '0.75rem',
                zIndex: 1000,
                animation: 'slideUp 200ms ease'
              }}>
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      setSearchFocused(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      borderRadius: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700 }}>
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* VOUCHER / GIFT BUTTON */}
          <button 
            onClick={() => setIsCouponModalOpen(true)}
            className="btn-icon" 
            title="Claim Mystery Voucher"
            style={{ backgroundColor: '#fff7ed', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.2)' }}
          >
            <Gift className="w-5 h-5 text-orange-500" />
          </button>

          {/* COMPARE BUTTON */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className="btn-icon"
            style={{ position: 'relative' }}
            title="Compare Products"
          >
            <Scale className="w-5 h-5 text-blue-600" />
            {compareList.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 800,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {compareList.length}
              </span>
            )}
          </button>

          {/* WISHLIST ICON */}
          <Link to="/wishlist" style={{ position: 'relative' }} title="Wishlist">
            <button className="btn-icon">
              <Heart style={{ width: '18px', height: '18px', color: wishlist.length > 0 ? '#ef4444' : '#64748b', fill: wishlist.length > 0 ? '#ef4444' : 'none' }} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>
          </Link>

          {/* CART ICON WITH LIVE BADGE */}
          <button 
            onClick={() => setIsCartDrawerOpen(true)}
            className="btn-icon"
            style={{ position: 'relative' }}
            aria-label="Shopping Cart"
            title="Open Cart Drawer"
          >
            <ShoppingBag style={{ width: '18px', height: '18px', color: '#2563eb' }} />
            {totalCartItems > 0 && (
              <span 
                className={badgeAnimated ? 'badge-bounce' : ''}
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#f97316',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  minWidth: '20px',
                  height: '20px',
                  padding: '0 4px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff'
                }}
              >
                {totalCartItems}
              </span>
            )}
          </button>

          {/* HAMBURGER FOR TABLET / MOBILE */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#0f172a' }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '76px',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          padding: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
          animation: 'slideUp 250ms ease-out',
          zIndex: 899
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: location.pathname === link.path ? '#2563eb' : '#0f172a',
                  backgroundColor: location.pathname === link.path ? '#eff6ff' : 'transparent'
                }}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
