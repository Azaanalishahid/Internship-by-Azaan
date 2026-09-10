import React from 'react';
import { CheckCircle2, Dumbbell, Award, Target, ArrowRight } from 'lucide-react';
import './About.css';

const aboutFeatures = [
  {
    icon: Dumbbell,
    title: 'Modern Equipment',
    description: 'Equipped with the latest cutting-edge cardio, strength, and functional training machinery from leading global fitness brands.',
  },
  {
    icon: Award,
    title: 'Certified Trainers',
    description: 'Our world-class certified fitness coaches design custom workout plans tailored to your specific goals and body composition.',
  },
  {
    icon: Target,
    title: 'Personalized Workout Plans',
    description: 'Get continuous progress tracking, customized meal plans, and one-on-one guidance to ensure consistent results.',
  },
];

export default function About({ onOpenJoinModal }) {
  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Side: Large Facility Image */}
          <div className="about-visual">
            <div className="about-img-wrapper">
              <img
                src="/images/about_gym.jpg"
                alt="FitZone Fitness Gym Interior & Equipment"
                className="about-main-img"
              />
              <div className="about-experience-badge">
                <span className="exp-years">15+</span>
                <span className="exp-text">Years of Excellence in Fitness</span>
              </div>
            </div>
          </div>

          {/* Right Side: Copy & Features */}
          <div className="about-content">
            <div className="section-badge">About FitZone Fitness</div>

            <h2 className="section-title">
              We Are Dedicated To Your <span className="text-gradient-orange">Fitness Journey</span>
            </h2>

            <p className="about-paragraph">
              Founded with a mission to empower individuals of all fitness levels, FitZone Fitness combines world-class facility infrastructure, energetic group training atmospheres, and empathetic expert guidance to transform lives through health.
            </p>

            {/* Three Feature Cards with Checkmarks */}
            <div className="about-features-list">
              {aboutFeatures.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div key={idx} className="about-feature-card card-hover">
                    <div className="feature-check-icon">
                      <CheckCircle2 size={24} className="icon-check" />
                    </div>
                    <div className="feature-text-content">
                      <h3 className="feature-card-title">{feature.title}</h3>
                      <p className="feature-card-desc">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="about-cta-wrapper">
              <button className="btn btn-primary-blue" onClick={onOpenJoinModal}>
                Learn More & Join Us
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
