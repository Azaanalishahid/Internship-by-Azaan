import React from 'react';
import { X, Play, Dumbbell } from 'lucide-react';
import './VideoModal.css';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-video-btn" onClick={onClose} aria-label="Close Video">
          <X size={24} />
        </button>

        <div className="video-player-box">
          {/* Commercial Fitness Video Preview simulation iframe / video element */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube-nocookie.com/embed/gC_L9qAHVJ8?autoplay=1"
            title="FitZone Fitness Commercial Preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
