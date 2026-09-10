import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedJobs from '../components/FeaturedJobs';
import WhyChooseUs from '../components/WhyChooseUs';
import Companies from '../components/Companies';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';
import NotificationCenter from '../components/NotificationCenter';
import { Link } from 'react-router-dom';
import { FileCheck, Sparkles, ArrowRight, Smartphone, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <NotificationCenter />

      <main>
        <Hero />
        <Categories />
        <FeaturedJobs />

        {/* AI Resume Builder Banner Section */}
        <section className="resume-banner-section">
          <div className="container">
            <div className="resume-banner-card glass-card">
              <div className="banner-content">
                <span className="badge badge-orange">
                  <Sparkles size={16} /> Instant Resume Optimization
                </span>
                <h2 className="banner-title">Build an ATS-Friendly Resume in 2 Minutes</h2>
                <p className="banner-desc">
                  Our AI Resume Builder scores your CV against real job descriptions, highlights missing keywords, and increases your interview callback rate by 3.5x.
                </p>
                <div className="banner-actions">
                  <Link to="/resume-builder" className="btn btn-primary">
                    <FileCheck size={18} /> Build Free AI Resume
                  </Link>
                </div>
              </div>
              <div className="banner-visual">
                <div className="resume-score-preview glass-card animate-float">
                  <Award size={36} className="text-orange" />
                  <div>
                    <h4 className="score-num">98/100</h4>
                    <p className="score-lbl">ATS Compatibility Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <Companies />

        {/* Download Mobile App Banner */}
        <section className="app-download-section">
          <div className="container">
            <div className="app-card glass-card">
              <div className="app-info">
                <span className="badge badge-blue">
                  <Smartphone size={16} /> On The Go
                </span>
                <h2 className="section-heading">Download CareerConnect Mobile App</h2>
                <p className="section-subtitle" style={{ textAlign: 'left', margin: '0.5rem 0 1.5rem 0' }}>
                  Get real-time push notifications when recruiters view your application or schedule an interview. Available for iOS & Android.
                </p>
                <div className="app-badges">
                  <button className="store-badge"> App Store</button>
                  <button className="store-badge">▶ Google Play</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <FAQSection />
        <CTA />
      </main>

      <Footer />
      <AIChatWidget />

      <style>{`
        .resume-banner-section {
          padding: 4rem 0;
        }
        .resume-banner-card {
          padding: 3.5rem;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: center;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%);
          border-radius: 28px;
        }
        .banner-title {
          font-size: 2.4rem;
          font-weight: 800;
          margin: 1rem 0;
          line-height: 1.2;
        }
        .banner-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .resume-score-preview {
          padding: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border-radius: var(--radius-lg);
          background: var(--bg-card);
        }
        .score-num {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--secondary-blue);
        }
        .score-lbl {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .app-download-section {
          padding: 4rem 0;
        }
        .app-card {
          padding: 3rem 3.5rem;
          border-radius: 28px;
        }
        .app-badges {
          display: flex;
          gap: 1rem;
        }
        .store-badge {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-main);
          color: var(--text-main);
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
        }
        @media (max-width: 900px) {
          .resume-banner-card { grid-template-columns: 1fr; text-align: center; }
          .banner-desc { margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </div>
  );
};

export default Home;
