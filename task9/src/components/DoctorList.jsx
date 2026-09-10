import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import { Stethoscope, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const DoctorList = ({ searchTerm, selectedDepartment, availabilityFilter, onBookDoctor, onViewProfileDoctor }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Specializations pool for dynamic assignment
  const specializations = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine',
    'Emergency Care',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics'
  ];

  // Realistic high quality avatars
  const avatarList = [
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1594824813566-88855ce78905?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=300&auto=format&fit=crop&q=80',
  ];

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch doctor data');
      const data = await response.json();

      // Transform raw users into enriched Doctor objects
      const formattedDoctors = data.map((user, index) => {
        const spec = specializations[index % specializations.length];
        const experienceYears = 5 + ((index * 3) % 15);
        const ratingVal = (4.6 + ((index * 7) % 5) / 10).toFixed(1);
        const reviewsCount = 45 + (index * 19);

        return {
          id: user.id,
          rawName: user.name,
          titleName: `Dr. ${user.name}`,
          specialization: spec,
          hospitalName: `${user.company.name} Hospital`,
          email: user.email.toLowerCase(),
          phone: user.phone,
          address: `${user.address.suite}, ${user.address.street}, ${user.address.city}`,
          experience: `${experienceYears}+ Years`,
          rating: ratingVal,
          reviewCount: reviewsCount,
          avatar: avatarList[index % avatarList.length],
          availableToday: index % 2 === 0,
          bio: `Dr. ${user.name} is a highly accomplished specialist in ${spec} with over ${experienceYears} years of clinical excellence. Committed to delivering compassionate, patient-centered care.`
        };
      });

      setDoctors(formattedDoctors);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.titleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.hospitalName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDepartment === 'All' || doc.specialization.toLowerCase() === selectedDepartment.toLowerCase();

    const matchesAvailability = availabilityFilter === 'All' || (availabilityFilter === 'Today' && doc.availableToday);

    return matchesSearch && matchesDept && matchesAvailability;
  });

  return (
    <section id="doctors" style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge-tag badge-blue" style={{ marginBottom: '0.75rem' }}>
            <Stethoscope size={16} />
            <span>Expert Medical Team</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1F2937', letterSpacing: '-0.02em' }}>
            Meet Our <span className="text-gradient-blue">Specialist Doctors</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.05rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Browse through our verified team of top doctors and book your consultation in seconds.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5rem 0',
            gap: '1rem',
            color: '#2563EB'
          }}>
            <Loader2 size={42} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ fontWeight: '600', color: '#4B5563' }}>Fetching Healthcare Specialists...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card" style={{
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <AlertCircle size={48} color="#EF4444" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937' }}>Unable to Load Doctors</h3>
            <p style={{ color: '#6B7280', margin: '0.5rem 0 1.5rem 0' }}>{error}</p>
            <button onClick={fetchDoctors} className="btn-primary" style={{ margin: '0 auto' }}>
              <RefreshCw size={18} />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredDoctors.length === 0 && (
          <div className="glass-card" style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <Stethoscope size={48} color="#9CA3AF" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937' }}>No Doctors Found</h3>
            <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>
              We couldn't find any doctor matching your search filters. Try resetting your search or department filter.
            </p>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && !error && filteredDoctors.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem'
            }}
          >
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={onBookDoctor}
                onViewProfile={onViewProfileDoctor}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default DoctorList;
