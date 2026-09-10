import React from 'react';
import { Play, ShieldCheck, Flame, Users, Award, Trophy, ArrowRight } from 'lucide-react';
import './Hero.css';

export default function Hero({ onOpenJoinModal, onOpenVideoModal }) {
  return (
    <section id="home" className="hero-section">
      {/* Background Decorative Blur Orbs */}
      <div className="hero-bg-orb orb-blue" />
      <div className="hero-bg-orb orb-orange" />

      <div className="container hero-container">
        {/* Left Side: Copywriting & CTA */}
        <div className="hero-content">
          <div className="hero-badge">
            <Flame className="badge-icon" size={16} />
            <span>#1 Premium Gym & Fitness Center</span>
          </div>

          <h1 className="hero-title">
            Transform Your <span className="text-gradient-blue">Body</span>,
            <br />
            Transform Your <span className="text-gradient-orange">Life</span>
          </h1>

          <p className="hero-description">
            Unlock your full potential with state-of-the-art equipment, personalized workout programs, world-class certified coaches, and an energetic community built to elevate your health and confidence.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary-blue" onClick={onOpenJoinModal}>
              Join Membership
              <ArrowRight size={18} />
            </button>

            <button className="btn btn-outline-blue play-video-btn" onClick={onOpenVideoModal}>
              <div className="play-icon-circle">
                <Play size={14} fill="currentColor" />
              </div>
              Watch Video
            </button>
          </div>

          {/* Fitness Statistics Cards */}
          <div className="hero-stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper blue-icon">
                <Users size={20} />
              </div>
              <div>
                <h3 className="stat-number">10K+</h3>
                <p className="stat-label">Happy Members</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper orange-icon">
                <Award size={20} />
              </div>
              <div>
                <h3 className="stat-number">50+</h3>
                <p className="stat-label">Professional Trainers</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper gradient-icon">
                <Trophy size={20} />
              </div>
              <div>
                <h3 className="stat-number">15+</h3>
                <p className="stat-label">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Graphic & Hero Image */}
        <div className="hero-visual">
          <div className="hero-image-frame">
            {/* Background Graphic Rings & Orbs */}
            <div className="abstract-circle circle-outer animate-rotate" />
            <div className="abstract-circle circle-inner" />

            {/* Hero Trainer Image */}
            <img
              src="/images/hero_trainer.jpg"
              alt="FitZone Professional Fitness Trainer"
              className="hero-trainer-img"
            />

            {/* Floating Badges */}
            <div className="floating-badge badge-top-left animate-float">
              <ShieldCheck className="text-orange" size={20} />
              <div>
                <span className="badge-title">100% Certified</span>
                <span className="badge-sub">Expert Coaches</span>
              </div>
            </div>

            <div className="floating-badge badge-bottom-right">
              <div className="badge-avatar-group">
                <div className="avatar-dot avatar-1" />
                <div className="avatar-dot avatar-2" />
                <div className="avatar-dot avatar-3" />
              </div>
              <div>
                <span className="badge-title">4.9 ★ Rating</span>
                <span className="badge-sub">2,500+ Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
