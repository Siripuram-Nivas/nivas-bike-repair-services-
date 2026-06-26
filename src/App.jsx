import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BikeServices from './components/BikeServices';
import WhyChooseUs from './components/WhyChooseUs';
import ServiceProcess from './components/ServiceProcess';
import BikeCareTips from './components/BikeCareTips';
import StatsCounters from './components/StatsCounters';
import MechanicTestimonials from './components/MechanicTestimonials';
import BikeFAQ from './components/BikeFAQ';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <BikeServices />
          <WhyChooseUs />
          <ServiceProcess />
          <StatsCounters />
          <BikeCareTips />
          <MechanicTestimonials />
          <BikeFAQ />
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </LanguageProvider>
  );
}

export default App;
