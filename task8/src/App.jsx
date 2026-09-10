import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import WhyChooseUs from './components/WhyChooseUs';
import Membership from './components/Membership';
import Trainers from './components/Trainers';
import BMI from './components/BMI';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import CTA from './components/CTA';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import JoinModal from './components/JoinModal';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="app-main-wrapper">
      {/* Header (Sticky / Fixed) */}
      <Header
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
        />

        {/* About Gym Section */}
        <About
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />

        {/* Programs Section */}
        <Programs
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Membership Plans Section */}
        <Membership
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />

        {/* Meet Our Trainers Section */}
        <Trainers />

        {/* BMI Calculator Preview Section */}
        <BMI />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Gallery Section */}
        <Gallery />

        {/* Call To Action Banner */}
        <CTA
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Modals */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}
