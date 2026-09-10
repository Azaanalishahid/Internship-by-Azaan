import React, { useState } from 'react';
import { Check, X, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import './Membership.css';

export default function Membership({ onOpenJoinModal }) {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      popular: false,
      monthlyPrice: 29,
      annualPrice: 24,
      desc: 'Perfect for beginners starting their fitness routine.',
      features: [
        { text: 'Full Gym Equipment Access', included: true },
        { text: 'Locker & Shower Facility', included: true },
        { text: 'FitZone Fitness Mobile App', included: true },
        { text: 'Group Fitness Classes', included: false },
        { text: 'Personal Fitness Trainer', included: false },
        { text: 'Nutrition & Diet Planner', included: false },
      ],
      btnText: 'Join Basic Plan',
      btnClass: 'btn-outline-blue',
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      popular: true,
      monthlyPrice: 59,
      annualPrice: 47,
      desc: 'Our most popular choice for committed gym-goers.',
      features: [
        { text: 'Full Gym Equipment Access', included: true },
        { text: 'Locker & Shower Facility', included: true },
        { text: 'FitZone Fitness Mobile App', included: true },
        { text: 'Unlimited Group Fitness Classes', included: true },
        { text: '2 Personal Training Sessions / Mo', included: true },
        { text: 'Nutrition & Diet Planner', included: false },
      ],
      btnText: 'Join Standard Plan',
      btnClass: 'btn-primary-blue',
    },
    {
      id: 'premium',
      name: 'VIP Premium Plan',
      popular: false,
      monthlyPrice: 99,
      annualPrice: 79,
      desc: 'All-inclusive VIP experience with top-tier coaching.',
      features: [
        { text: '24/7 Unlimited Gym Access', included: true },
        { text: 'VIP Locker & Sauna Spa Access', included: true },
        { text: 'FitZone Fitness Mobile App', included: true },
        { text: 'Unlimited Group & Specialty Classes', included: true },
        { text: 'Unlimited 1-on-1 Certified Coaching', included: true },
        { text: 'Personalized Macro Nutrition Plan', included: true },
      ],
      btnText: 'Join VIP Premium',
      btnClass: 'btn-accent-orange',
    },
  ];

  return (
    <section id="membership" className="section-padding membership-section">
      <div className="container">
        <div className="text-center section-header">
          <div className="section-badge">Flexible Pricing Plans</div>
          <h2 className="section-title">
            Choose The Plan That Suits <span className="text-gradient-blue">Your Budget</span>
          </h2>
          <p className="section-subtitle">
            No long-term contracts. Transparent pricing with full access to elite facilities and coaching.
          </p>

          {/* Billing Cycle Toggle Switch */}
          <div className="billing-toggle-container">
            <span className={`toggle-label ${!isAnnual ? 'active' : ''}`}>Monthly Billing</span>
            <button
              className={`toggle-switch ${isAnnual ? 'checked' : ''}`}
              onClick={() => setIsAnnual(!isAnnual)}
              aria-label="Toggle Billing Interval"
            >
              <div className="switch-handle" />
            </button>
            <span className={`toggle-label ${isAnnual ? 'active' : ''}`}>
              Annual Billing <span className="discount-tag">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="membership-grid">
          {plans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`membership-card ${plan.popular ? 'popular-card' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Sparkles size={14} /> Most Popular Choice
                  </div>
                )}

                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.desc}</p>

                  <div className="plan-price-wrapper">
                    <span className="price-currency">$</span>
                    <span className="price-amount">{price}</span>
                    <span className="price-period">/ month</span>
                  </div>
                  {isAnnual && <span className="billed-annually">Billed annually (${price * 12}/yr)</span>}
                </div>

                <div className="plan-features">
                  <span className="features-header">Plan Includes:</span>
                  <ul className="feature-list">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className={feat.included ? 'included' : 'not-included'}>
                        {feat.included ? (
                          <Check size={18} className="icon-check" />
                        ) : (
                          <X size={18} className="icon-x" />
                        )}
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="plan-action">
                  <button className={`btn ${plan.btnClass} full-width`} onClick={onOpenJoinModal}>
                    {plan.btnText}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
