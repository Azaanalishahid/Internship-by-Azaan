import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, selectedDepartment, setSelectedDepartment, availabilityFilter, setAvailabilityFilter }) => {
  return (
    <section style={{ padding: '3rem 0 1rem 0' }}>
      <div className="container">
        <div
          className="glass-card"
          style={{
            padding: '1.5rem 2rem',
            background: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '0 15px 35px -10px rgba(37, 99, 235, 0.12)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.25fr 1fr auto',
              gap: '1rem',
              alignItems: 'center'
            }}
            className="search-bar-grid"
          >
            {/* Search Input */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search
                size={20}
                color="#6B7280"
                style={{ position: 'absolute', left: '1rem', pointerEvents: 'none' }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Doctor by Name..."
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.8rem',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  background: '#FFFFFF'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
              />
            </div>

            {/* Department Dropdown */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Filter
                size={18}
                color="#6B7280"
                style={{ position: 'absolute', left: '1rem', pointerEvents: 'none' }}
              />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.8rem',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  background: '#FFFFFF',
                  color: '#1F2937',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Departments</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Emergency Care">Emergency Care</option>
              </select>
            </div>

            {/* Availability Dropdown */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Calendar
                size={18}
                color="#6B7280"
                style={{ position: 'absolute', left: '1rem', pointerEvents: 'none' }}
              />
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.8rem',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  background: '#FFFFFF',
                  color: '#1F2937',
                  cursor: 'pointer'
                }}
              >
                <option value="All">Any Availability</option>
                <option value="Today">Available Today</option>
                <option value="Tomorrow">Available Tomorrow</option>
              </select>
            </div>

            {/* Search Action Button */}
            <button
              onClick={() => {}}
              className="btn-primary"
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                justifyContent: 'center'
              }}
            >
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .search-bar-grid {
            grid-template-columns: 1fr !important;
            gap: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SearchBar;
