import React from 'react';
import { Dumbbell, Utensils, Clock, Users, DollarSign, HeartHandshake, Zap } from 'lucide-react';
import './WhyChooseUs.css';

const reasonsList = [
  {
    icon: Dumbbell,
    title: 'Modern Machines',
    description: 'State-of-the-art strength and cardio equipment featuring smart workout tracking touchscreens and biometric sensors.',
    color: 'blue'
  },
  {
    icon: Utensils,
    title: 'Nutrition Guidance',
    description: 'Customized macro-balanced meal strategy and nutrition advice provided by certified sports dietitians.',
    color: 'orange'
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: '24/7 round-the-clock gym access so you can workout whenever it fits your busy daily lifestyle.',
    color: 'blue'
  },
  {
    icon: Users,
    title: 'Expert Coaches',
    description: 'Elite personal trainers who guide your posture, technique, and keep you energized every single workout.',
    color: 'orange'
  },
  {
    icon: DollarSign,
    title: 'Affordable Membership',
    description: 'Flexible tiered pricing plans with zero hidden fees, hassle-free monthly billing, and complete value.',
    color: 'blue'
  },
  {
    icon: HeartHandshake,
    title: 'Friendly Environment',
    description: 'A welcoming, supportive, and inclusive fitness community that celebrates everyone’s personal milestones.',
    color: 'orange'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding why-choose-section">
      <div className="container">
        <div className="text-center section-header">
          <div className="section-badge">Why FitZone Fitness</div>
          <h2 className="section-title">
            The Ultimate Fitness Experience Designed <span className="text-gradient-orange">For You</span>
          </h2>
          <p className="section-subtitle">
            We provide an unparalleled training ecosystem combining top-tier equipment, science-backed guidance, and constant encouragement.
          </p>
        </div>

        <div className="why-grid">
          {reasonsList.map((reason, idx) => {
            const IconComp = reason.icon;
            return (
              <div key={idx} className="why-card card-hover">
                <div className={`why-icon-box ${reason.color === 'orange' ? 'icon-orange' : 'icon-blue'}`}>
                  <IconComp size={28} />
                </div>
                <h3 className="why-card-title">{reason.title}</h3>
                <p className="why-card-desc">{reason.description}</p>
                <div className="why-hover-bar" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
