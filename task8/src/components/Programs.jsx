import React, { useState } from 'react';
import { Dumbbell, Flame, Activity, HeartPulse, ArrowRight, Check, X, Clock, Users, Flame as BurnIcon } from 'lucide-react';
import './Programs.css';

const programsData = [
  {
    id: 'strength',
    title: 'Strength Training',
    category: 'Hypertrophy & Power',
    image: '/images/program_strength.jpg',
    description: 'Build lean muscle mass, maximize physical strength, and improve metabolic rate with progressive overload hyper-focused routines.',
    duration: '60 Mins',
    calories: '450-600 kcal',
    intensity: 'High',
    benefits: [
      'Custom barbell and dumbbell protocols',
      'Hypertrophy and functional power lifting',
      'Body composition transformation',
      'Joint strength & injury prevention'
    ]
  },
  {
    id: 'weightloss',
    title: 'Weight Loss & HIIT',
    category: 'Cardio & Fat Burn',
    image: '/images/program_weightloss.jpg',
    description: 'High-intensity interval training designed to accelerate fat loss, boost cardiovascular endurance, and burn calories after workout.',
    duration: '45 Mins',
    calories: '600-800 kcal',
    intensity: 'Very High',
    benefits: [
      'Caloric burn boost with EPOC effect',
      'High-energy group motivation',
      'Heart rate zone targeted conditioning',
      'Personalized nutrition guide included'
    ]
  },
  {
    id: 'crossfit',
    title: 'CrossFit & Conditioning',
    category: 'Functional Fitness',
    image: '/images/program_crossfit.jpg',
    description: 'Master functional movements, kettlebells, battle ropes, and Olympic lifting WODs for explosive athletic performance.',
    duration: '60 Mins',
    calories: '500-750 kcal',
    intensity: 'Extreme',
    benefits: [
      'WOD (Workout of the Day) variance',
      'Agility, speed, and core stability',
      'Kettlebell and plyometric mastery',
      'Competitive & supportive tribe'
    ]
  },
  {
    id: 'yoga',
    title: 'Yoga & Wellness',
    category: 'Mind & Body',
    image: '/images/program_yoga.jpg',
    description: 'Restore mobility, reduce stress, improve core flexibility, and harmonize body and mind through guided breathwork and poses.',
    duration: '50 Mins',
    calories: '250-350 kcal',
    intensity: 'Low-Medium',
    benefits: [
      'Vinyasa and Hatha yoga practices',
      'Deep spinal & hamstring flexibility',
      'Mindfulness & stress reduction',
      'Postural alignment & breathing'
    ]
  }
];

export default function Programs({ onOpenJoinModal }) {
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <section id="programs" className="section-padding programs-section">
      <div className="container">
        <div className="text-center section-header">
          <div className="section-badge">Our Premium Programs</div>
          <h2 className="section-title">
            Tailored Training For <span className="text-gradient-blue">Every Goal</span>
          </h2>
          <p className="section-subtitle">
            Whether you want to build power, shed weight, or achieve inner balance, our structured training programs deliver real, long-lasting results.
          </p>
        </div>

        <div className="programs-grid">
          {programsData.map((prog) => (
            <div key={prog.id} className="program-card">
              <div className="program-img-container">
                <img src={prog.image} alt={prog.title} className="program-card-img" />
                <span className="program-category-badge">{prog.category}</span>
              </div>

              <div className="program-card-content">
                <h3 className="program-title">{prog.title}</h3>
                <p className="program-desc">{prog.description}</p>

                <div className="program-stats-mini">
                  <div className="mini-stat">
                    <Clock size={14} className="text-blue" />
                    <span>{prog.duration}</span>
                  </div>
                  <div className="mini-stat">
                    <BurnIcon size={14} className="text-orange" />
                    <span>{prog.calories}</span>
                  </div>
                </div>

                <div className="program-card-actions">
                  <button className="btn btn-primary-blue full-width" onClick={() => setSelectedProgram(prog)}>
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="program-modal-backdrop" onClick={() => setSelectedProgram(null)}>
          <div className="program-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedProgram(null)}>
              <X size={22} />
            </button>

            <div className="modal-header-img">
              <img src={selectedProgram.image} alt={selectedProgram.title} />
              <div className="modal-header-overlay">
                <span className="modal-category">{selectedProgram.category}</span>
                <h2>{selectedProgram.title}</h2>
              </div>
            </div>

            <div className="modal-body-content">
              <p className="modal-long-desc">{selectedProgram.description}</p>

              <div className="modal-metrics-grid">
                <div className="metric-box">
                  <Clock size={20} className="text-blue" />
                  <div>
                    <span className="metric-label">Duration</span>
                    <span className="metric-val">{selectedProgram.duration}</span>
                  </div>
                </div>
                <div className="metric-box">
                  <BurnIcon size={20} className="text-orange" />
                  <div>
                    <span className="metric-label">Burn Estimate</span>
                    <span className="metric-val">{selectedProgram.calories}</span>
                  </div>
                </div>
                <div className="metric-box">
                  <Activity size={20} className="text-blue" />
                  <div>
                    <span className="metric-label">Intensity</span>
                    <span className="metric-val">{selectedProgram.intensity}</span>
                  </div>
                </div>
              </div>

              <h4 className="benefits-title">Key Program Highlights</h4>
              <ul className="benefits-list">
                {selectedProgram.benefits.map((b, i) => (
                  <li key={i}>
                    <Check size={18} className="check-icon" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="modal-actions">
                <button
                  className="btn btn-accent-orange full-width"
                  onClick={() => {
                    setSelectedProgram(null);
                    onOpenJoinModal();
                  }}
                >
                  Enroll In This Program
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
