import React from 'react';
import { CheckCircle2, Clock, Calendar, Award, UserCheck } from 'lucide-react';

const STEPS = [
  { label: 'Applied', status: 'completed', icon: CheckCircle2, date: 'Aug 1' },
  { label: 'Under Review', status: 'completed', icon: Clock, date: 'Aug 3' },
  { label: 'Shortlisted', status: 'completed', icon: UserCheck, date: 'Aug 5' },
  { label: 'Interview', status: 'active', icon: Calendar, date: 'Aug 10' },
  { label: 'Selected', status: 'pending', icon: Award, date: 'TBD' }
];

const ApplicationTimeline = ({ currentStatus = 'Interviewing' }) => {
  return (
    <div className="application-timeline-wrapper">
      <h4 className="timeline-section-title">Application Status Timeline</h4>
      <div className="timeline-steps-container">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone = step.status === 'completed';
          const isActive = step.status === 'active';

          return (
            <div key={idx} className={`timeline-step-item ${isDone ? 'done' : isActive ? 'active' : ''}`}>
              <div className="step-circle">
                <Icon size={16} />
              </div>
              <p className="step-label">{step.label}</p>
              <span className="step-date">{step.date}</span>
              {idx < STEPS.length - 1 && <div className="step-line"></div>}
            </div>
          );
        })}
      </div>

      <style>{`
        .application-timeline-wrapper {
          padding: 1.25rem 0;
        }
        .timeline-section-title {
          font-size: 0.95rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
          color: var(--text-main);
        }
        .timeline-steps-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .timeline-step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
          flex: 1;
          text-align: center;
        }
        .step-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-main);
          border: 2px solid var(--border-color);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
        }
        .timeline-step-item.done .step-circle {
          background: #10B981;
          border-color: #10B981;
          color: #FFF;
        }
        .timeline-step-item.active .step-circle {
          background: var(--secondary-blue);
          border-color: var(--secondary-blue);
          color: #FFF;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
        }
        .step-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .step-date {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        .step-line {
          position: absolute;
          top: 18px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: var(--border-color);
          z-index: -1;
        }
        .timeline-step-item.done .step-line {
          background: #10B981;
        }
      `}</style>
    </div>
  );
};

export default ApplicationTimeline;
