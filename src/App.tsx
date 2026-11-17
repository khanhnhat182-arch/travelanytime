import React, { useState, useEffect } from 'react';
import { Tour, Destination, TourCategory, ConfirmedBooking, Hotel, TravelCombo } from './types/travel';
import {
  INITIAL_TOURS,
  INITIAL_HOTELS,
  INITIAL_COMBOS,
  DOMESTIC_DESTINATIONS,
  INTERNATIONAL_DESTINATIONS,
} from './data/travelData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { TourDetailView } from './views/TourDetailView';
import { DestinationView } from './views/DestinationView';
import { HotelsView } from './views/HotelsView';
import { CombosView } from './views/CombosView';
import { ContactView } from './views/ContactView';
import { BookingModal, BookingTargetItem } from './components/BookingModal';
import { BookingReceiptModal } from './components/BookingReceiptModal';
import { AIChatWidget } from './components/AIChatWidget';
import { Phone } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'home' | 'tour-detail' | 'destination' | 'hotels' | 'combos' | 'contact'
  >('home');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TourCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Universal booking item state
  const [bookingTarget, setBookingTarget] = useState<BookingTargetItem | null>(null);
  const [activeVoucher, setActiveVoucher] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Staggered scroll reveal observer
  useEffect(() => {
    const items = document.querySelectorAll('.reveal-item');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView, selectedCategory]);

  // Scroll to top on view change
  const switchView = (
    view: 'home' | 'tour-detail' | 'destination' | 'hotels' | 'combos' | 'contact'
  ) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tour selection
  const handleSelectTour = (tour: Tour) => {
    setSelectedTour(tour);
    switchView('tour-detail');
  };

  // Destination selection
  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    switchView('destination');
  };

  // Book a tour
  const handleBookTour = (tour: Tour, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookingTarget({
      type: 'tour',
      title: tour.title,
      duration: tour.duration,
      price: tour.salePrice,
      originalPrice: tour.originalPrice,
      departureDates: tour.departureDates,
    });
  };

  // Book a hotel
  const handleBookHotel = (hotel: Hotel) => {
    setBookingTarget({
      type: 'hotel',
      title: hotel.name + ' - ' + hotel.city,
      duration: 'Theo đêm lưu trú',
      price: hotel.pricePerNight,
      originalPrice: hotel.originalPrice,
      departureDates: ['2026-10-25', '2026-11-01', '2026-11-15', '2026-12-05'],
    });
  };

  // Book a travel combo
  const handleBookCombo = (combo: TravelCombo) => {
    setBookingTarget({
      type: 'combo',
      title: combo.title,
      duration: combo.duration,
      price: combo.comboPrice,
      originalPrice: combo.originalPrice,
      departureDates: ['2026-10-28', '2026-11-05', '2026-11-12', '2026-11-20'],
    });
  };

  // Open voucher from banner
  const handleOpenVoucher = (voucherCode: string) => {
    setActiveVoucher(voucherCode);
    handleBookTour(INITIAL_TOURS[0]);
  };

  // Filter tours by search query if any
  const displayedTours = searchQuery.trim()
    ? INITIAL_TOURS.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.destinationName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : INITIAL_TOURS;

  const allDestinations = [...DOMESTIC_DESTINATIONS, ...INTERNATIONAL_DESTINATIONS];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] antialiased">
      {/* 1. STICKY HEADER WITH LIVE SEARCH & AUTOCOMPLETE */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'home') {
            setSelectedCategory('all');
            setSearchQuery('');
            switchView('home');
          } else if (view === 'hotels') {
            switchView('hotels');
          } else if (view === 'combos') {
            switchView('combos');
          } else if (view === 'contact') {
            switchView('contact');
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={(e) => {
          e.preventDefault();
          if (currentView !== 'home') switchView('home');
        }}
        tours={INITIAL_TOURS}
        hotels={INITIAL_HOTELS}
        combos={INITIAL_COMBOS}
        destinations={allDestinations}
        onSelectTour={handleSelectTour}
        onSelectDestination={handleSelectDestination}
        onSelectHotel={handleBookHotel}
        onSelectCombo={handleBookCombo}
      />

      {/* 2. MAIN VIEW CONTAINER (SPA ROUTER) */}
      <main className="flex-1">
        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <HomeView
            tours={displayedTours}
            domesticDestinations={DOMESTIC_DESTINATIONS}
            internationalDestinations={INTERNATIONAL_DESTINATIONS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectTour={handleSelectTour}
            onSelectDestination={handleSelectDestination}
            onBookNow={handleBookTour}
            onOpenVoucher={handleOpenVoucher}
          />
        )}

        {/* VIEW 2: TOUR DETAIL */}
        {currentView === 'tour-detail' && selectedTour && (
          <TourDetailView
            tour={selectedTour}
            onBack={() => switchView('home')}
            onBookNow={(tour) => handleBookTour(tour)}
          />
        )}

        {/* VIEW 3: DESTINATION */}
        {currentView === 'destination' && selectedDestination && (
          <DestinationView
            destination={selectedDestination}
            allTours={INITIAL_TOURS}
            allDestinations={allDestinations}
            onBack={() => switchView('home')}
            onSelectTour={handleSelectTour}
            onBookNow={handleBookTour}
            onSwitchDestination={(dest) => {
              setSelectedDestination(dest);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 4: HOTELS & RESORTS */}
        {currentView === 'hotels' && (
          <HotelsView
            hotels={INITIAL_HOTELS}
            onBookHotel={handleBookHotel}
            onBackToHome={() => switchView('home')}
          />
        )}

        {/* VIEW 5: TRAVEL COMBOS */}
        {currentView === 'combos' && (
          <CombosView
            combos={INITIAL_COMBOS}
            onBookCombo={handleBookCombo}
            onBackToHome={() => switchView('home')}
          />
        )}

        {/* VIEW 6: CONTACT & SUPPORT */}
        {currentView === 'contact' && (
          <ContactView onBack={() => switchView('home')} />
        )}
      </main>

      {/* 3. FOOTER */}
      <Footer
        onSelectDestinationName={(name) => {
          const match = allDestinations.find((d) => d.name.toLowerCase() === name.toLowerCase());
          if (match) {
            handleSelectDestination(match);
          } else {
            setSearchQuery(name);
            switchView('home');
          }
        }}
        onSelectTourLine={() => {
          setSelectedCategory('all');
          switchView('home');
        }}
        onContactClick={() => switchView('contact')}
      />

      {/* 4. MODALS */}
      {bookingTarget && (
        <BookingModal
          item={bookingTarget}
          initialVoucher={activeVoucher}
          onClose={() => {
            setBookingTarget(null);
            setActiveVoucher('');
          }}
          onSuccess={async (confirmed) => {
            // Gửi dữ liệu đặt tour xuống Backend API để lưu vào Database
            try {
              await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  fullName: confirmed.fullName,
                  phone: confirmed.phone,
                  tourName: confirmed.tourTitle,
                }),
              });
              console.log('Đã lưu booking thành công vào database!');
            } catch (err) {
              console.error('Lỗi khi gửi booking lên server:', err);
            }

            setBookingTarget(null);
            setActiveVoucher('');
            setConfirmedBooking(confirmed);
          }}
        />
      )}

      {confirmedBooking && (
        <BookingReceiptModal
          booking={confirmedBooking}
          onClose={() => {
            setConfirmedBooking(null);
            switchView('home');
          }}
        />
      )}

      {/* 5. 24/7 AI CUSTOMER SERVICE CHATBOT */}
      <AIChatWidget
        onSelectTourById={(tourId) => {
          const match = INITIAL_TOURS.find((t) => t.id === tourId);
          if (match) handleSelectTour(match);
        }}
        onOpenBooking={(tour) => handleBookTour(tour)}
      />

      {/* 6. QUIET FLOATING QUICK CALL BUTTON (consistent with AIChatWidget: solid --ink, 6px radius, no bounce/gradient) */}
      <aside aria-label="Hotline tư vấn nhanh" className="fixed bottom-5 right-5 z-30">
        <a
          href="tel:0911708015"
          className="flex items-center gap-2 bg-[var(--ink)] hover:bg-[var(--accent)] text-[var(--bg)] font-medium text-xs sm:text-sm px-4 py-2.5 rounded-[6px] border border-[var(--line)]/40 transition-colors cursor-pointer"
        >
          <Phone className="w-4 h-4 stroke-[1.5]" />
          <span className="hidden sm:inline">Tư vấn ngay:</span>
          <span className="font-mono-code">0911 708 015</span>
        </a>
      </aside>
    </div>
  );
}
