import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, BRANDS } from '../data/products';
import { Filter, SlidersHorizontal, RotateCcw, LayoutGrid, List, Scale, Check } from 'lucide-react';

export default function Shop() {
  const { allProducts, setIsCompareOpen, compareList } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState(1500);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  React.useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange(1500);
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('popular');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (searchParam && !product.name.toLowerCase().includes(searchParam.toLowerCase()) && !product.category.toLowerCase().includes(searchParam.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (product.price > priceRange) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      if (product.rating < minRating) {
        return false;
      }
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      if (filterParam === 'flash' && !product.isFlashSale) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [allProducts, selectedCategory, priceRange, selectedBrands, minRating, inStockOnly, sortBy, searchParam, filterParam]);

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem 4rem 1.5rem' }}>
      
      {/* SHOP PAGE HEADER */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '1.75rem 2rem',
        marginBottom: '2rem',
        border: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
            Shop Product Catalog
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '2px' }}>
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
        </div>

        {/* CONTROLS (COMPARE, VIEW TOGGLE, SORT) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          
          {/* COMPARE BUTTON */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Scale className="w-4 h-4 text-blue-600" /> Compare ({compareList.length})
          </button>

          {/* VIEW SWITCHER */}
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '10px' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '8px',
                backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
                color: viewMode === 'grid' ? '#2563eb' : '#64748b',
                boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none'
              }}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '8px',
                backgroundColor: viewMode === 'list' ? '#ffffff' : 'transparent',
                color: viewMode === 'list' ? '#2563eb' : '#64748b',
                boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none'
              }}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* SORT BY */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontWeight: 600,
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

        </div>
      </div>

      {/* MAIN GRID LAYOUT WITH SIDEBAR */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
        
        {/* SIDEBAR FILTERS */}
        <aside>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                <Filter className="w-5 h-5 text-blue-600" /> Filter Options
              </div>
              <button 
                onClick={resetFilters} 
                style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* CATEGORY FILTER */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>Categories</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {['All', 'Electronics', 'Fashion', 'Shoes', 'Accessories', 'Furniture', 'Sports'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      textAlign: 'left',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '10px',
                      fontSize: '0.875rem',
                      fontWeight: selectedCategory === cat ? 700 : 500,
                      backgroundColor: selectedCategory === cat ? '#eff6ff' : 'transparent',
                      color: selectedCategory === cat ? '#2563eb' : '#475569',
                      transition: 'all 150ms ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE SLIDER */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Max Price</h4>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#2563eb' }}>${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="1500" 
                step="25"
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
              />

              {/* QUICK PRICE PRESETS */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                {[100, 300, 500, 1500].map(val => (
                  <button
                    key={val}
                    onClick={() => setPriceRange(val)}
                    style={{
                      flex: 1,
                      padding: '0.25rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor: priceRange === val ? '#eff6ff' : '#f8fafc',
                      color: priceRange === val ? '#2563eb' : '#64748b',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            {/* BRAND FILTER */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>Brands</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {BRANDS.map((brand) => (
                  <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb', borderRadius: '4px' }}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* CATALOG CONTENT */}
        <div>
          {viewMode === 'grid' ? (
            <ProductGrid products={filteredProducts} emptyMessage="No products match your selected filters." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredProducts.map(p => (
                <div key={p.id} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#ffffff', borderRadius: '20px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', alignItems: 'center' }}>
                  <img src={p.image} alt={p.name} style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{p.category}</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>{p.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>{p.description}</p>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2563eb', marginTop: '8px' }}>${p.price.toFixed(2)}</div>
                  </div>
                  <button onClick={() => navigate(`/product/${p.id}`)} className="btn btn-primary">View Details</button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
