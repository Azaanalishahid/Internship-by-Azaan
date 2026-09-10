import React from 'react';
import { Stethoscope, Building2, Users, PhoneCall } from 'lucide-react';

const Stats = () => {
  const statsData = [
    {
      id: 1,
      count: '150+',
      label: 'Doctors',
      icon: Stethoscope,
      color: '#2563EB',
      bgColor: 'rgba(37, 99, 235, 0.1)',
    },
    {
      id: 2,
      count: '12',
      label: 'Departments',
      icon: Building2,
      color: '#F97316',
      bgColor: 'rgba(249, 115, 22, 0.1)',
    },
    {
      id: 3,
      count: '5000+',
      label: 'Patients',
      icon: Users,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      id: 4,
      count: '24/7',
      label: 'Emergency',
      icon: PhoneCall,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
  ];

  return (
    <section style={{ padding: '2rem 0' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="glass-card"
                style={{
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  cursor: 'default'
                }}
              >
                <div style={{
                  background: stat.bgColor,
                  padding: '16px',
                  borderRadius: '16px',
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 15px ${stat.bgColor}`
                }}>
                  <IconComponent size={28} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: '#1F2937',
                    lineHeight: 1.1
                  }}>
                    {stat.count}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#6B7280',
                    marginTop: '0.25rem'
                  }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
