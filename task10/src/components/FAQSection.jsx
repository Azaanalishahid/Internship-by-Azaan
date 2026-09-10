import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQS = [
  {
    question: "Is CareerConnect completely free for job seekers?",
    answer: "Yes, 100%! CareerConnect is free for all candidates. You can search thousands of verified jobs, build your resume, apply with 1-click, and track applications without any subscription fees."
  },
  {
    question: "How does the 1-Click Application workflow work?",
    answer: "Once you upload your resume and complete your profile, clicking 'Apply Now' on any verified position instantly forwards your profile and pitch directly to the hiring manager's dashboard."
  },
  {
    question: "How are employers and job listings verified?",
    answer: "Our automated AI & compliance team verifies corporate tax IDs, official domain records, and recruiter identities for every company before approving any job posting."
  },
  {
    question: "Can I apply for global remote jobs outside my home country?",
    answer: "Absolutely. Over 40% of positions on CareerConnect are global remote roles offering cross-border contracts, USD/EUR compensation, and visa sponsorship."
  },
  {
    question: "How does the AI Resume Score Card work?",
    answer: "Our AI engine analyzes your resume against industry standards, ATS keyword density, formatting readability, and role-specific skills to provide an instant optimization score."
  }
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-blue">
            <HelpCircle size={16} /> Got Questions?
          </span>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about navigating your career journey on CareerConnect.
          </p>
        </div>

        <div className="faq-accordion-container">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item glass-card ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="faq-question-box">
                  <h3 className="faq-question">{faq.question}</h3>
                  <ChevronDown className={`faq-arrow ${isOpen ? 'rotate' : ''}`} size={20} />
                </div>
                {isOpen && (
                  <div className="faq-answer-box animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 5rem 0;
        }
        .faq-accordion-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .faq-item {
          padding: 1.5rem 1.75rem;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .faq-item:hover {
          border-color: var(--secondary-blue);
        }
        .faq-question-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .faq-question {
          font-size: 1.15rem;
          font-weight: 700;
        }
        .faq-arrow {
          color: var(--secondary-blue);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .faq-arrow.rotate {
          transform: rotate(180deg);
        }
        .faq-answer-box {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;
