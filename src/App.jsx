import { LanguageProvider } from './context/LanguageContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BikeServices from './components/BikeServices';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import ServiceProcess from './components/ServiceProcess';
import BikeCareTips from './components/BikeCareTips';
import Reviews from './components/Reviews';
import BikeFAQ from './components/BikeFAQ';
import Booking from './components/Booking';
import Contact from './components/Contact';
import MobileActionBar from './components/MobileActionBar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { useLanguage } from './context/useLanguage';

function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-[4px] focus:bg-white focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
    >
      {t('skip_link')}
    </a>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <div className="min-h-screen pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
          <SkipLink />
          <Navbar />
          <main id="main-content">
            <Hero />
            <BikeServices />
            <WhyChooseUs />
            <Gallery />
            <ServiceProcess />
            <BikeCareTips />
            <Reviews />
            <BikeFAQ />
            <Booking />
            <Contact />
          </main>
          <Footer />
          <MobileActionBar />
          <FloatingWhatsApp />
        </div>
      </BookingProvider>
    </LanguageProvider>
  );
}

export default App;
