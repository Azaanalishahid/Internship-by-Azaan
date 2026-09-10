import React from 'react';
import { 
  ShieldCheck, 
  Building, 
  Zap, 
  Globe, 
  Headphones, 
  Award 
} from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Verified Jobs',
    desc: 'Every single listing is 100% verified by our expert team to eliminate spam and fraudulent recruiters.',
    color: '#2563EB'
  },
  {
    icon: Building,
    title: 'Trusted Companies',
    desc: 'Direct partnerships with Fortune 500 organizations and venture-backed high growth startups.',
    color: '#F97316'
  },
  {
    icon: Zap,
    title: 'Fast Applications',
    desc: 'Apply to top positions with 1-Click using your stored CareerConnect resume profile.',
    color: '#10B981'
  },
  {
    icon: Globe,
    title: 'Remote Opportunities',
    desc: 'Access thousands of global remote roles allowing you to work from anywhere in the world.',
    color: '#8B5CF6'
  },
  {
    icon: Headphones,
    title: 'Career Support',
    desc: 'Personalized career mentorship and resume feedback from industry leading talent advisors.',
    color: '#EC4899'
  },
  {
    icon: Award,
    title: 'Interview Preparation',
    desc: 'Curated technical interview guides, salary benchmarks, and mock interview practice modules.',
    color: '#3B82F6'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="why-us-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-blue">Why CareerConnect</span>
          <h2 className="section-heading">Designed For Modern Professionals</h2>
          <p className="section-subtitle">
            Everything you need to accelerate your career trajectory and land your ideal role faster.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="feature-card glass-card">
                <div className="feature-icon-box" style={{ background: `rgba(${item.color === '#2563EB' ? '37, 99, 235' : item.color === '#F97316' ? '249, 115, 22' : '16, 185, 129'}, 0.12)`, color: item.color }}>
                  <Icon size={26} />
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .why-us-section {
          padding: 5rem 0;
          background: rgba(239, 246, 255, 0.3);
        }
        body.dark-mode .why-us-section {
          background: rgba(15, 23, 42, 0.5);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .feature-card:hover {
          transform: translateY(-6px);
          border-color: var(--secondary-blue);
        }
        .feature-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .feature-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.6rem;
        }
        .feature-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
