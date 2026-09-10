import React from 'react';
import { Award, Star } from 'lucide-react';
import './Trainers.css';

// Inline Social Icon Components
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const trainersData = [
  {
    name: 'Marcus Vance',
    role: 'Head Bodybuilding & Strength Coach',
    image: '/images/trainer_1.jpg',
    experience: '8+ Years Exp',
    rating: '4.9 ★',
    bio: 'Specializes in hypertrophy, heavy barbell mechanics, and competitive body transformation.',
    socials: { instagram: true, twitter: true, linkedin: true }
  },
  {
    name: 'Elena Rostova',
    role: 'Lead Yoga & Mobility Specialist',
    image: '/images/trainer_2.jpg',
    experience: '6+ Years Exp',
    rating: '5.0 ★',
    bio: 'Certified Vinyasa practitioner dedicated to posture restoration, flexibility, and stress release.',
    socials: { instagram: true, youtube: true, linkedin: true }
  },
  {
    name: 'David Miller',
    role: 'Strength & Conditioning Specialist',
    image: '/images/trainer_3.jpg',
    experience: '10+ Years Exp',
    rating: '4.9 ★',
    bio: 'Former collegiate athlete coaching powerlifting, endurance, and high-performance agility.',
    socials: { instagram: true, twitter: true, linkedin: true }
  },
  {
    name: 'Sophia Chen',
    role: 'HIIT & CrossFit Lead Trainer',
    image: '/images/trainer_4.jpg',
    experience: '7+ Years Exp',
    rating: '4.95 ★',
    bio: 'Energetic group fitness coach focused on fat burn, kettlebell technique, and stamina.',
    socials: { instagram: true, youtube: true, twitter: true }
  }
];

export default function Trainers() {
  return (
    <section id="trainers" className="section-padding trainers-section">
      <div className="container">
        <div className="text-center section-header">
          <div className="section-badge">World-Class Coaches</div>
          <h2 className="section-title">
            Meet Our <span className="text-gradient-orange">Certified Trainers</span>
          </h2>
          <p className="section-subtitle">
            Train with passionate fitness professionals who inspire, motivate, and guide you every single step of the way.
          </p>
        </div>

        <div className="trainers-grid">
          {trainersData.map((trainer, idx) => (
            <div key={idx} className="trainer-card">
              <div className="trainer-img-wrapper">
                <img src={trainer.image} alt={trainer.name} className="trainer-img" />
                <div className="trainer-exp-badge">
                  <Award size={14} /> {trainer.experience}
                </div>
                <div className="trainer-rating-badge">
                  <Star size={12} fill="#F97316" color="#F97316" /> {trainer.rating}
                </div>
              </div>

              <div className="trainer-content">
                <h3 className="trainer-name">{trainer.name}</h3>
                <span className="trainer-role">{trainer.role}</span>
                <p className="trainer-bio">{trainer.bio}</p>

                {/* Social Media Links */}
                <div className="trainer-socials">
                  {trainer.socials.instagram && (
                    <a href="#instagram" className="social-link" aria-label="Instagram">
                      <InstagramIcon />
                    </a>
                  )}
                  {trainer.socials.twitter && (
                    <a href="#twitter" className="social-link" aria-label="Twitter">
                      <TwitterIcon />
                    </a>
                  )}
                  {trainer.socials.linkedin && (
                    <a href="#linkedin" className="social-link" aria-label="LinkedIn">
                      <LinkedinIcon />
                    </a>
                  )}
                  {trainer.socials.youtube && (
                    <a href="#youtube" className="social-link" aria-label="YouTube">
                      <YoutubeIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
