import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  Search,
  Menu,
  X,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { Tour, Destination, Hotel, TravelCombo } from '../types/travel';
import { formatPrice } from './TourCard';
import { SafeImage } from './SafeImage';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: 'home' | 'tours' | 'hotels' | 'combos' | 'destinations' | 'contact', params?: any) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  tours?: Tour[];
  hotels?: Hotel[];
  combos?: TravelCombo[];
  destinations?: Destination[];
  onSelectTour?: (tour: Tour) => void;
  onSelectDestination?: (dest: Destination) => void;
  onSelectHotel?: (hotel: Hotel) => void;
  onSelectCombo?: (combo: TravelCombo) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  tours = [],
  hotels = [],
  combos = [],
  destinations = [],
  onSelectTour,
  onSelectDestination,
  onSelectHotel,
  onSelectCombo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(target)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularSearches = [
    { label: 'Tour hè Phú Quốc', query: 'Phú Quốc' },
    { label: 'Tour Tết 2027', query: 'Tết' },
    { label: 'Combo Đà Nẵng', query: 'Đà Nẵng' },
    { label: 'Vinpearl Luxury', query: 'Vinpearl' },
    { label: 'Combo Quy Nhơn FLC', query: 'Quy Nhơn' },
    { label: 'Sa Pa Fansipan', query: 'Sa Pa' },
    { label: 'Hàn Quốc Seoul', query: 'Seoul' },
    { label: 'Nhật Bản Phú Sĩ', query: 'Nhật Bản' },
  ];

  const query = searchQuery.trim().toLowerCase();

  const matchedTours = query
    ? tours.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.location.toLowerCase().includes(query) ||
          t.destinationName.toLowerCase().includes(query) ||
          (query === 'hè' && t.category === 'summer') ||
          (query === 'tết' && t.category === 'tet')
      ).slice(0, 4)
    : [];

  const matchedCombos = query
    ? combos.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.destinationName.toLowerCase().includes(query) ||
          c.hotelName.toLowerCase().includes(query)
      ).slice(0, 3)
    : [];

  const matchedHotels = query
    ? hotels.filter(
        (h) =>
          h.name.toLowerCase().includes(query) ||
          h.city.toLowerCase().includes(query) ||
          h.address.toLowerCase().includes(query)
      ).slice(0, 3)
    : [];

  const matchedDestinations = query
    ? destinations.filter((d) => d.name.toLowerCase().includes(query)).slice(0, 3)
    : [];

  const totalResults =
    matchedTours.length + matchedCombos.length + matchedHotels.length + matchedDestinations.length;

  const handleQuickClick = (q: string) => {
    onSearchChange(q);
    setIsSearchFocused(true);
  };

  const handleItemSelect = (action: () => void) => {
    action();
    setIsSearchFocused(false);
  };

  return (
    <header className="w-full select-none sticky top-0 z-40 bg-[var(--bg)] border-b border-[var(--line)]">
      {/* 1. TOP MINI BAR */}
      <div className="border-b border-[var(--line)] text-[var(--text-muted)] text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-5 font-medium">
          <button
            onClick={() => onNavigate('contact')}
            className="editorial-link hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            Trung tâm trợ giúp
          </button>
          <span aria-hidden="true" className="text-[var(--line)]">/</span>
          <button
            onClick={() => onNavigate('contact')}
            className="editorial-link hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            Hợp tác với chúng tôi
          </button>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Logo Brand Zone — muted navy & burnt orange */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-baseline gap-1 cursor-pointer text-left shrink-0"
            aria-label="TravelAnytime - Trang chủ"
          >
            <span className="font-display font-semibold text-xl sm:text-2xl tracking-tight text-[var(--ink)]">
              Travel<span className="text-[var(--accent)] italic">Anytime</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[var(--text)]" aria-label="Điều hướng chính">
            <button
              onClick={() => onNavigate('home')}
              className={`editorial-link whitespace-nowrap cursor-pointer ${
                currentView === 'home' ? 'is-active text-[var(--ink)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Du lịch
            </button>
            <button
              onClick={() => onNavigate('hotels')}
              className={`editorial-link whitespace-nowrap cursor-pointer ${
                currentView === 'hotels' ? 'is-active text-[var(--ink)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Khách sạn
            </button>
            <button
              onClick={() => onNavigate('combos')}
              className={`editorial-link whitespace-nowrap cursor-pointer ${
                currentView === 'combos' ? 'is-active text-[var(--ink)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Thông tin Combo
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`editorial-link whitespace-nowrap cursor-pointer ${
                currentView === 'contact' ? 'is-active text-[var(--ink)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Liên hệ
            </button>
          </nav>

          {/* Smaller subtle-border search field with live suggestions */}
          <div ref={searchContainerRef} className="flex-1 max-w-[260px] xl:max-w-[300px] relative hidden md:block">
            <form onSubmit={onSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm tour, khách sạn, combo..."
                aria-label="Tìm kiếm tour, khách sạn, điểm đến"
                className="w-full bg-[var(--bg-alt)] text-[var(--text)] placeholder-[var(--text-muted)] text-xs rounded-md py-1.5 pl-3 pr-12 border border-[var(--line)] focus:outline-none focus:border-[var(--ink)] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Xóa tìm kiếm"
                  className="absolute right-7 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--ink)] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--ink)] hover:text-[var(--accent)] p-0.5 cursor-pointer transition-colors"
              >
                <Search className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </form>

            {/* Desktop Suggestions Dropdown Panel */}
            {isSearchFocused && (
              <div className="absolute right-0 w-[380px] top-full mt-2 bg-[var(--bg)] rounded-md border border-[var(--ink)]/25 overflow-hidden z-50 text-[var(--text)] max-h-[460px] overflow-y-auto">
                {!query ? (
                  <div className="p-4 space-y-2.5">
                    <span className="font-mono-code text-[11px] text-[var(--text-muted)] uppercase tracking-wider block">
                      Tìm kiếm phổ biến
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {popularSearches.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleQuickClick(item.query)}
                          className="bg-[var(--bg-alt)] hover:bg-[var(--ink)] hover:text-[var(--bg)] text-[var(--ink)] text-xs font-medium px-2.5 py-1 rounded-sm transition-colors cursor-pointer border border-[var(--line)]"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : totalResults > 0 ? (
                  <div className="divide-y divide-[var(--line)] text-xs">
                    <div className="bg-[var(--bg-alt)] px-4 py-2 font-mono-code text-[11px] text-[var(--ink)] flex justify-between items-center">
                      <span>{totalResults} kết quả cho “{searchQuery}”</span>
                      <button
                        type="button"
                        onClick={() => setIsSearchFocused(false)}
                        className="text-[var(--text-muted)] hover:text-[var(--ink)] underline cursor-pointer"
                      >
                        Đóng
                      </button>
                    </div>

                    {matchedTours.length > 0 && (
                      <div className="p-3 space-y-1">
                        <span className="font-mono-code text-[10px] uppercase tracking-wider text-[var(--text-muted)] block px-1">
                          Tour du lịch
                        </span>
                        {matchedTours.map((t) => (
                          <div
                            key={t.id}
                            onClick={() => handleItemSelect(() => onSelectTour && onSelectTour(t))}
                            className="p-2 rounded-sm hover:bg-[var(--bg-alt)] transition-colors cursor-pointer flex items-center gap-3 group"
                          >
                            <div className="w-12 h-9 rounded-sm overflow-hidden shrink-0 border border-[var(--line)]">
                              <SafeImage src={t.image} alt={t.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors truncate">
                                {t.title}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] mt-0.5">
                                <span className="font-mono-code">{t.duration}</span>
                                <span>·</span>
                                <span className="text-[var(--accent)] font-semibold font-mono-code">{formatPrice(t.salePrice)}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {matchedCombos.length > 0 && (
                      <div className="p-3 space-y-1">
                        <span className="font-mono-code text-[10px] uppercase tracking-wider text-[var(--text-muted)] block px-1">
                          Combo vé máy bay + khách sạn
                        </span>
                        {matchedCombos.map((c) => (
                          <div
                            key={c.id}
                            onClick={() =>
                              handleItemSelect(() => {
                                if (onSelectCombo) onSelectCombo(c);
                                else onNavigate('combos');
                              })
                            }
                            className="p-2 rounded-sm hover:bg-[var(--bg-alt)] transition-colors cursor-pointer flex items-center gap-3 group"
                          >
                            <div className="w-12 h-9 rounded-sm overflow-hidden shrink-0 border border-[var(--line)]">
                              <SafeImage src={c.image} alt={c.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors truncate">
                                {c.title}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] mt-0.5">
                                <span>Tiết kiệm {c.discountPercent}%</span>
                                <span>·</span>
                                <span className="text-[var(--accent)] font-semibold font-mono-code">{formatPrice(c.comboPrice)}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {matchedHotels.length > 0 && (
                      <div className="p-3 space-y-1">
                        <span className="font-mono-code text-[10px] uppercase tracking-wider text-[var(--text-muted)] block px-1">
                          Khách sạn &amp; Resort
                        </span>
                        {matchedHotels.map((h) => (
                          <div
                            key={h.id}
                            onClick={() =>
                              handleItemSelect(() => {
                                if (onSelectHotel) onSelectHotel(h);
                                else onNavigate('hotels');
                              })
                            }
                            className="p-2 rounded-sm hover:bg-[var(--bg-alt)] transition-colors cursor-pointer flex items-center gap-3 group"
                          >
                            <div className="w-12 h-9 rounded-sm overflow-hidden shrink-0 border border-[var(--line)]">
                              <SafeImage src={h.image} alt={h.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors truncate">
                                {h.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] mt-0.5">
                                <span>{h.starRating} sao · {h.city}</span>
                                <span>·</span>
                                <span className="text-[var(--accent)] font-semibold font-mono-code">{formatPrice(h.pricePerNight)}/đêm</span>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {matchedDestinations.length > 0 && (
                      <div className="p-3 space-y-1">
                        <span className="font-mono-code text-[10px] uppercase tracking-wider text-[var(--text-muted)] block px-1">
                          Địa danh
                        </span>
                        {matchedDestinations.map((d) => (
                          <div
                            key={d.id}
                            onClick={() => handleItemSelect(() => onSelectDestination && onSelectDestination(d))}
                            className="p-2 rounded-sm hover:bg-[var(--bg-alt)] transition-colors cursor-pointer flex items-center gap-2.5 group"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[var(--sea)] shrink-0" />
                            <div className="flex-1">
                              <span className="font-semibold text-[var(--ink)] group-hover:text-[var(--accent)]">{d.name}</span>
                              <span className="text-[var(--text-muted)] text-[11px] ml-2">({d.tourCount} tour)</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-5 text-center space-y-2">
                    <p className="text-xs text-[var(--text-muted)]">
                      Không tìm thấy kết quả cho “<strong className="text-[var(--ink)]">{searchQuery}</strong>”
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                      {['Đà Nẵng', 'Phú Quốc', 'Quy Nhơn', 'Tết'].map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => handleQuickClick(k)}
                          className="bg-[var(--bg-alt)] border border-[var(--line)] text-[var(--ink)] text-xs px-2.5 py-1 rounded-sm hover:bg-[var(--ink)] hover:text-[var(--bg)] cursor-pointer"
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quiet Hotline Link + Mobile Menu */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:0911708015"
              className="flex items-center gap-1.5 text-[var(--ink)] hover:text-[var(--accent)] transition-colors font-mono-code font-medium text-xs sm:text-sm whitespace-nowrap border border-[var(--line)] px-3 py-1.5 rounded-md bg-[var(--bg-alt)]"
            >
              <Phone className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>0911708015</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[var(--ink)] border border-[var(--line)] rounded-md cursor-pointer"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div ref={mobileSearchRef} className="mt-2.5 md:hidden relative">
          <form onSubmit={onSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm tour, khách sạn, combo..."
              className="w-full bg-[var(--bg-alt)] text-[var(--text)] placeholder-[var(--text-muted)] text-xs rounded-md py-2 pl-3 pr-14 border border-[var(--line)] focus:outline-none focus:border-[var(--ink)]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-[var(--text-muted)] p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--ink)]"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {isSearchFocused && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-[var(--bg)] rounded-md border border-[var(--ink)]/25 overflow-hidden z-50 text-[var(--text)] max-h-[340px] overflow-y-auto">
              {!query ? (
                <div className="p-3 space-y-2">
                  <span className="font-mono-code text-[10px] text-[var(--text-muted)] uppercase block">
                    Gợi ý tìm kiếm
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {popularSearches.slice(0, 5).map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickClick(item.query)}
                        className="bg-[var(--bg-alt)] border border-[var(--line)] text-[var(--ink)] text-[11px] font-medium px-2 py-1 rounded-sm"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : totalResults > 0 ? (
                <div className="divide-y divide-[var(--line)] text-xs">
                  {matchedTours.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleItemSelect(() => onSelectTour && onSelectTour(t))}
                      className="p-2.5 hover:bg-[var(--bg-alt)] flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-[var(--ink)] truncate">{t.title}</div>
                        <div className="font-mono-code text-[10px] text-[var(--accent)]">{t.duration} · {formatPrice(t.salePrice)}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                    </div>
                  ))}
                  {matchedHotels.map((h) => (
                    <div
                      key={h.id}
                      onClick={() =>
                        handleItemSelect(() => {
                          if (onSelectHotel) onSelectHotel(h);
                          else onNavigate('hotels');
                        })
                      }
                      className="p-2.5 hover:bg-[var(--bg-alt)] flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-[var(--ink)] truncate">{h.name}</div>
                        <div className="font-mono-code text-[10px] text-[var(--text-muted)]">{h.city} · {formatPrice(h.pricePerNight)}/đêm</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-alt)] text-[var(--ink)] px-4 py-3 space-y-1 border-t border-[var(--line)]">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-2 border-b border-[var(--line)] font-display text-lg"
          >
            01. Du lịch
          </button>
          <button
            onClick={() => { onNavigate('hotels'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-2 border-b border-[var(--line)] font-display text-lg"
          >
            02. Khách sạn
          </button>
          <button
            onClick={() => { onNavigate('combos'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-2 border-b border-[var(--line)] font-display text-lg"
          >
            03. Thông tin Combo
          </button>
          <button
            onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-2 font-display text-lg"
          >
            04. Trung tâm trợ giúp &amp; Liên hệ
          </button>
        </div>
      )}
    </header>
  );
};
