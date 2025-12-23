import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import SymptomChecker from './components/SymptomChecker';
import BookingModal from './components/BookingModal';
import ActionSidebar from './components/ActionSidebar';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openBooking = (service?: string) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-brand-accent/30 overflow-x-hidden">
      <Navbar onBook={() => openBooking()} />
      <ActionSidebar onBook={() => openBooking()} />
      
      <main className="relative z-10">
        <Hero onBook={() => openBooking()} />
        <div className="reveal"><SymptomChecker onBook={(service) => openBooking(service)} /></div>
        <div className="reveal"><Services onBook={(service) => openBooking(service)} /></div>
        <div className="reveal"><About /></div>
        <div className="reveal"><Contact /></div>
      </main>
      
      <Footer />
      <ChatWidget />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialService={selectedService}
      />
    </div>
  );
};

export default App;