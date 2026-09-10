import React, { useState } from 'react';
import { Star, ChevronRight, Award, CheckCircle2, RotateCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const COMPANIES_DATA = [
  {
    id: 1,
    name: 'Google',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    openPositions: '240+ Open Jobs',
    rating: 4.8,
    reviews: '32k Reviews',
    location: 'Mountain View, CA',
    industry: 'Internet & Cloud Technology',
    perks: ['Free Gourmet Meals', '$3,500 Tech Budget', 'Hybrid 3/2 Schedule', 'Full Health & Dental'],
    salaryAvg: '$185k avg salary'
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    openPositions: '180+ Open Jobs',
    rating: 4.7,
    reviews: '28k Reviews',
    location: 'Redmond, WA',
    industry: 'Software & Enterprise',
    perks: ['Unlimited PTO', 'Parental Leave (20wks)', '401k 5% Matching', 'Wellness Stipend'],
    salaryAvg: '$170k avg salary'
  },
  {
    id: 3,
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    openPositions: '410+ Open Jobs',
    rating: 4.6,
    reviews: '54k Reviews',
    location: 'Seattle, WA',
    industry: 'E-Commerce & AWS Cloud',
    perks: ['RSU Stock Options', 'AWS Certification Pay', 'Global Mobility', 'Health Coverage'],
    salaryAvg: '$195k avg salary'
  },
  {
    id: 4,
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    openPositions: '85+ Open Jobs',
    rating: 4.9,
    reviews: '12k Reviews',
    location: 'Los Gatos, CA',
    industry: 'Streaming & Media Tech',
    perks: ['Top of Market Pay', 'Flexible Vacation', 'Stock Option Program', 'Personal Development'],
    salaryAvg: '$240k avg salary'
  },
  {
    id: 5,
    name: 'Tesla',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
    openPositions: '120+ Open Jobs',
    rating: 4.5,
    reviews: '19k Reviews',
    location: 'Austin, TX',
    industry: 'EV & Autonomous AI',
    perks: ['Employee Car Discounts', 'Stock Grants', 'High Growth Trajectory', 'Health Benefits'],
    salaryAvg: '$175k avg salary'
  },
  {
    id: 6,
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    openPositions: '150+ Open Jobs',
    rating: 4.7,
    reviews: '22k Reviews',
    location: 'Menlo Park, CA',
    industry: 'Social Tech & Metaverse',
    perks: ['Wellness Stipend ($3k)', 'Metaverse Hardware', 'Global Relocation', 'Flexible Remote'],
    salaryAvg: '$210k avg salary'
  }
];

const Companies = () => {
  const { addToast } = useAuth();
  const [flippedCardId, setFlippedCardId] = useState(null);

  const handleViewJobs = (companyName) => {
    addToast(`Filtering active openings at ${companyName}...`);
    const jobsEl = document.getElementById('jobs');
    if (jobsEl) jobsEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="companies" className="companies-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-blue">
            <Award size={16} /> Interactive 3D Cards
          </span>
          <h2 className="section-heading">Work with Top Companies</h2>
          <p className="section-subtitle">
            Hover or tap any card to flip and reveal exclusive company perks, compensation averages, and hiring benefits.
          </p>
        </div>

        <div className="companies-grid">
          {COMPANIES_DATA.map((company) => {
            const isFlipped = flippedCardId === company.id;
            return (
              <div 
                key={company.id} 
                className="flip-card-container"
                onMouseEnter={() => setFlippedCardId(company.id)}
                onMouseLeave={() => setFlippedCardId(null)}
              >
                <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                  {/* FRONT SIDE */}
                  <div className="flip-card-front glass-card company-card-front">
                    <div className="card-header">
                      <div className="company-logo-container">
                        <img src={company.logo} alt={company.name} className="company-logo" />
                      </div>
                      <div className="rating-badge">
                        <Star size={14} className="star-icon" />
                        <span>{company.rating}</span>
                      </div>
                    </div>

                    <div className="card-info">
                      <h3 className="company-title">{company.name}</h3>
                      <p className="company-industry">{company.industry}</p>
                      <p className="company-location">📍 {company.location}</p>
                    </div>

                    <div className="card-action">
                      <span className="positions-count">{company.openPositions}</span>
                      <div className="flip-hint">
                        <RotateCw size={14} /> <span>Hover to Flip</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (3D FLIP REVEAL) */}
                  <div className="flip-card-back company-card-back">
                    <div>
                      <div className="back-header">
                        <h3 className="back-company-title">{company.name} Benefits</h3>
                        <span className="salary-pill">{company.salaryAvg}</span>
                      </div>

                      <ul className="perks-list">
                        {company.perks.map((perk, i) => (
                          <li key={i}>
                            <CheckCircle2 size={15} className="check-icon" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      className="btn btn-accent back-action-btn"
                      onClick={() => handleViewJobs(company.name)}
                    >
                      <span>Explore Open Roles</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .companies-section {
          padding: 5rem 0;
          background: rgba(239, 246, 255, 0.3);
        }
        body.dark-mode .companies-section {
          background: rgba(15, 23, 42, 0.4);
        }
        .companies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        .company-card-front {
          padding: 1.75rem;
          height: 100%;
        }
        .card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .company-logo-container {
          width: 58px;
          height: 58px;
          border-radius: 14px;
          background: #FFF;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }
        .company-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .rating-badge {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: #FEF3C7;
          color: #D97706;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .star-icon {
          fill: #F59E0B;
          color: #F59E0B;
        }
        .company-title {
          font-size: 1.35rem;
          font-weight: 800;
          margin-bottom: 0.2rem;
        }
        .company-industry {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--secondary-blue);
          margin-bottom: 0.2rem;
        }
        .company-location {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }
        .positions-count {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent-orange);
        }
        .flip-hint {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        /* BACK CARD STYLES */
        .company-card-back {
          border-radius: var(--radius-lg);
        }
        .back-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        }
        .back-company-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #FFF;
        }
        .salary-pill {
          background: rgba(249, 115, 22, 0.25);
          color: #FFEDD5;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(249, 115, 22, 0.5);
        }
        .perks-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
        }
        .perks-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #E2E8F0;
        }
        .check-icon {
          color: #34D399;
          flex-shrink: 0;
        }
        .back-action-btn {
          width: 100%;
          padding: 0.65rem;
          font-size: 0.9rem;
        }
      `}</style>
    </section>
  );
};

export default Companies;
