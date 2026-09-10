import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import SearchBar from './components/SearchBar';
import DoctorList from './components/DoctorList';
import AppointmentCounter from './components/AppointmentCounter';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import EmergencyBanner from './components/EmergencyBanner';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import DoctorProfileModal from './components/DoctorProfileModal';

function App() {
  // Application State
  const [appointmentCount, setAppointmentCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingDoctor, setSelectedBookingDoctor] = useState(null);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProfileDoctor, setSelectedProfileDoctor] = useState(null);

  // Handlers
  const handleOpenBooking = (doctor = null) => {
    setSelectedBookingDoctor(doctor);
    setIsBookingOpen(true);
  };

  const handleOpenProfile = (doctor) => {
    setSelectedProfileDoctor(doctor);
    setIsProfileOpen(true);
  };

  const handleBookingSuccess = () => {
    // Automatically increase today's appointment counter when an appointment is booked!
    setAppointmentCount((prev) => prev + 1);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Fixed Sticky Header */}
      <Header onOpenBookingModal={() => handleOpenBooking()} />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Hero onOpenBookingModal={() => handleOpenBooking()} />

        {/* Statistics Cards */}
        <Stats />

        {/* Doctor Search & Filter Section */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
        />

        {/* Doctor Appointment Dashboard (JSONPlaceholder Fetch) */}
        <DoctorList
          searchTerm={searchTerm}
          selectedDepartment={selectedDepartment}
          availabilityFilter={availabilityFilter}
          onBookDoctor={(doc) => handleOpenBooking(doc)}
          onViewProfileDoctor={(doc) => handleOpenProfile(doc)}
        />

        {/* Appointment Counter Section */}
        <AppointmentCounter
          count={appointmentCount}
          setCount={setAppointmentCount}
        />

        {/* Hospital Services */}
        <Services />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Patient Testimonials */}
        <Testimonials />

        {/* Emergency Call Banner */}
        <EmergencyBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedDoctor={selectedBookingDoctor}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Doctor Profile Modal */}
      <DoctorProfileModal
        doctor={selectedProfileDoctor}
        onClose={() => setIsProfileOpen(false)}
        onBookDoctor={(doc) => handleOpenBooking(doc)}
      />

    </div>
  );
}

export default App;
