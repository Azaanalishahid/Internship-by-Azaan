import React from 'react';
import { 
  Code2, 
  Palette, 
  TrendingUp, 
  DollarSign, 
  Stethoscope, 
  GraduationCap, 
  Cpu, 
  Target,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CATEGORIES_LIST = [
  {
    title: 'Software Development',
    icon: Code2,
    jobsCount: '4,280+ Open Jobs',
    color: '#2563EB',
    bg: 'rgba(37, 99, 235, 0.1)'
  },
  {
    title: 'UI/UX Design',
    icon: Palette,
    jobsCount: '1,840+ Open Jobs',
    color: '#EC4899',
    bg: 'rgba(236, 72, 153, 0.1)'
  },
  {
    title: 'Marketing & PR',
    icon: TrendingUp,
    jobsCount: '2,150+ Open Jobs',
    color: '#F97316',
    bg: 'rgba(249, 115, 22, 0.1)'
  },
  {
    title: 'Finance & Banking',
    icon: DollarSign,
    jobsCount: '1,420+ Open Jobs',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.1)'
  },
  {
    title: 'Healthcare & Pharma',
    icon: Stethoscope,
    jobsCount: '980+ Open Jobs',
    color: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.1)'
  },
  {
    title: 'Education & EdTech',
    icon: GraduationCap,
    jobsCount: '1,120+ Open Jobs',
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.1)'
  },
  {
    title: 'Engineering & Tech',
    icon: Cpu,
    jobsCount: '3,100+ Open Jobs',
    color: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.1)'
  },
  {
    title: 'Sales & Business',
    icon: Target,
    jobsCount: '2,490+ Open Jobs',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)'
  }
];

const Categories = () => {
  const { addToast } = useAuth();

  const handleCategoryClick = (catTitle) => {
    addToast(`Browsing ${catTitle} job listings...`);
    const jobsEl = document.getElementById('jobs');
    if (jobsEl) jobsEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-orange">Explore Fields</span>
          <h2 className="section-heading">Browse Popular Job Categories</h2>
          <p className="section-subtitle">
            Find specialized career paths tailored to your domain expertise and passion.
          </p>
        </div>

        <div className="categories-grid">
          {CATEGORIES_LIST.map((cat, index) => {
            const IconComponent = cat.icon;
            return (
              <div 
                key={index} 
                className="category-card glass-card"
                onClick={() => handleCategoryClick(cat.title)}
              >
                <div className="cat-header">
                  <div className="icon-wrapper" style={{ background: cat.bg, color: cat.color }}>
                    <IconComponent size={24} />
                  </div>
                  <div className="arrow-icon">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <h3 className="category-title">{cat.title}</h3>
                <p className="category-count">{cat.jobsCount}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .categories-section {
          padding: 5rem 0;
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .category-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .category-card:hover {
          transform: translateY(-5px);
          border-color: var(--secondary-blue);
        }
        .cat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .arrow-icon {
          color: var(--text-muted);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .category-card:hover .arrow-icon {
          transform: translate(3px, -3px);
          color: var(--secondary-blue);
        }
        .category-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }
        .category-count {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};

export default Categories;
