import React, { useState } from 'react';
import { ZoomIn, X, Filter } from 'lucide-react';
import './Gallery.css';

const galleryItems = [
  {
    id: 1,
    category: 'equipment',
    title: 'Smart Cardio Treadmills',
    image: '/images/program_weightloss.jpg',
  },
  {
    id: 2,
    category: 'strength',
    title: 'Heavy Dumbbell Free Weight Zone',
    image: '/images/program_strength.jpg',
  },
  {
    id: 3,
    category: 'workout',
    title: 'High Energy CrossFit Arena',
    image: '/images/program_crossfit.jpg',
  },
  {
    id: 4,
    category: 'yoga',
    title: 'Mindful Yoga & Pilates Studio',
    image: '/images/program_yoga.jpg',
  },
  {
    id: 5,
    category: 'equipment',
    title: 'State-of-the-Art Gym Facility',
    image: '/images/about_gym.jpg',
  },
  {
    id: 6,
    category: 'workout',
    title: 'Personal Training Session',
    image: '/images/hero_trainer.jpg',
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImg, setSelectedImg] = useState(null);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="section-padding gallery-section">
      <div className="container">
        <div className="text-center section-header">
          <div className="section-badge">Facility Showcase</div>
          <h2 className="section-title">
            Take A Tour Of Our <span className="text-gradient-orange">FitZone Gallery</span>
          </h2>
          <p className="section-subtitle">
            Explore our world-class gym facilities, premium equipment, group workout sessions, and serene wellness spaces.
          </p>

          {/* Filter Pills */}
          <div className="filter-bar">
            {['all', 'equipment', 'workout', 'yoga', 'strength'].map((category) => (
              <button
                key={category}
                className={`filter-pill ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-card"
              onClick={() => setSelectedImg(item)}
            >
              <img src={item.image} alt={item.title} className="gallery-img" />
              <div className="gallery-overlay">
                <div className="gallery-zoom-icon">
                  <ZoomIn size={24} />
                </div>
                <h4 className="gallery-item-title">{item.title}</h4>
                <span className="gallery-item-cat">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImg && (
        <div className="lightbox-backdrop" onClick={() => setSelectedImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-lightbox" onClick={() => setSelectedImg(null)}>
              <X size={26} />
            </button>
            <img src={selectedImg.image} alt={selectedImg.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <h3>{selectedImg.title}</h3>
              <span className="lightbox-tag">{selectedImg.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
