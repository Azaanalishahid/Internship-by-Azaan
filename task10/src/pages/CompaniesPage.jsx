import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Companies from '../components/Companies';
import CTA from '../components/CTA';
import { Building2, Search, Sparkles } from 'lucide-react';

const CompaniesPage = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="companies-directory-page">
        <section className="directory-hero">
          <div className="container text-center">
            <span className="badge badge-orange"><Sparkles size={16} /> Verified Employer Directory</span>
            <h1 className="section-heading">Browse 8,000+ Top Hiring Companies</h1>
            <p className="section-subtitle">Discover company cultures, average salaries, workplace ratings, and active career opportunities.</p>
          </div>
        </section>

        <Companies />
        <CTA />
      </main>
      <Footer />
      <style>{`
        .companies-directory-page { padding-top: 5rem; }
        .directory-hero { padding: 4rem 0 2rem 0; background: linear-gradient(180deg, rgba(239, 246, 255, 0.4) 0%, rgba(248, 250, 252, 1) 100%); }
      `}</style>
    </div>
  );
};

export default CompaniesPage;
