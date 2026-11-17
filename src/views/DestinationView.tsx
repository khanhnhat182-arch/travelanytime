import React, { useState } from 'react';
import { Destination, Tour } from '../types/travel';
import { TourCard } from '../components/TourCard';
import { SafeImage } from '../components/SafeImage';
import { ArrowLeft, Filter } from 'lucide-react';

interface DestinationViewProps {
  destination: Destination;
  allTours: Tour[];
  onBack: () => void;
  onSelectTour: (tour: Tour) => void;
  onBookNow: (tour: Tour, e: React.MouseEvent) => void;
  onSwitchDestination: (dest: Destination) => void;
  allDestinations: Destination[];
}

export const DestinationView: React.FC<DestinationViewProps> = ({
  destination,
  allTours,
  onBack,
  onSelectTour,
  onBookNow,
  onSwitchDestination,
  allDestinations,
}) => {
  const [priceFilter, setPriceFilter] = useState<'all' | 'under15' | '15to30' | 'above30'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'priceLowToHigh' | 'priceHighToLow' | 'rating'>('recommended');

  const matchingTours = allTours.filter((t) => {
    const byId = t.destinationId.toLowerCase() === destination.id.toLowerCase();
    const byName = t.destinationName.toLowerCase().includes(destination.name.toLowerCase());
    const byLoc = t.location.toLowerCase().includes(destination.name.toLowerCase());
    return byId || byName || byLoc;
  });

  let filtered = matchingTours.filter((tour) => {
    if (priceFilter === 'under15') return tour.salePrice < 15000000;
    if (priceFilter === '15to30') return tour.salePrice >= 15000000 && tour.salePrice <= 30000000;
    if (priceFilter === 'above30') return tour.salePrice > 30000000;
    return true;
  });

  if (sortBy === 'priceLowToHigh') {
    filtered = [...filtered].sort((a, b) => a.salePrice - b.salePrice);
  } else if (sortBy === 'priceHighToLow') {
    filtered = [...filtered].sort((a, b) => b.salePrice - a.salePrice);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-16 select-none space-y-8">
      {/* Top back & breadcrumbs */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[var(--ink)] hover:text-[var(--accent)] bg-[var(--bg-alt)] border border-[var(--line)] px-4 py-2 rounded-[6px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
          <span>Quay lại trang chủ</span>
        </button>

        <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--text-muted)]">
          <span>Trang chủ</span>
          <span>/</span>
          <span>Điểm đến</span>
          <span>/</span>
          <span className="text-[var(--ink)] font-semibold">{destination.name}</span>
        </div>
      </div>

      {/* Asymmetric Editorial Destination Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-[var(--line)]">
        <div className="lg:col-span-7 space-y-4">
          <span className="font-mono-code text-xs tracking-[0.14em] uppercase text-[var(--sea)] inline-block pb-1 border-b border-[var(--sea)]">
            {destination.isDomestic ? 'Du lịch trong nước' : 'Du lịch nước ngoài'} · {destination.tourCount} tour
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight leading-tight">
            Khám phá {destination.name}
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
            {destination.description}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono-code text-xs text-[var(--sea)] pt-1">
            {destination.highlights.map((h, i) => (
              <span key={i}>· {h}</span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-[6px] overflow-hidden border border-[var(--line)] bg-[var(--bg-alt)] aspect-[4/3]">
            <SafeImage
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Filter & Sort Toolbar */}
      <div className="bg-[var(--bg-alt)] p-4 rounded-[6px] border border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-[var(--ink)] flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-[var(--sea)]" />
            <span>Mức giá:</span>
          </span>
          {[
            { id: 'all', label: 'Tất cả giá' },
            { id: 'under15', label: 'Dưới 15 triệu' },
            { id: '15to30', label: '15 – 30 triệu' },
            { id: 'above30', label: 'Trên 30 triệu' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setPriceFilter(opt.id as any)}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-medium border transition-colors cursor-pointer ${
                priceFilter === opt.id
                  ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                  : 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-[var(--text-muted)]">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-[4px] border border-[var(--line)] bg-[var(--bg)] font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
          >
            <option value="recommended">Gợi ý tốt nhất</option>
            <option value="priceLowToHigh">Giá thấp đến cao</option>
            <option value="priceHighToLow">Giá cao đến thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </div>
      </div>

      {/* Tour List */}
      <div>
        <h2 className="font-display text-2xl font-normal text-[var(--ink)] mb-5">
          Tour du lịch tại {destination.name} ({filtered.length} kết quả)
        </h2>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onSelectTour={onSelectTour}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[var(--bg-alt)] rounded-[6px] p-10 text-center border border-[var(--line)] space-y-3">
            <p className="text-[var(--text-muted)] text-sm font-medium">
              Hiện tại không có tour phù hợp với mức giá đã lọc.
            </p>
            <button
              onClick={() => setPriceFilter('all')}
              className="bg-[var(--ink)] text-[var(--bg)] px-4 py-2 rounded-[6px] text-xs font-semibold hover:bg-[var(--accent)] transition-colors cursor-pointer"
            >
              Xem tất cả tour {destination.name}
            </button>
          </div>
        )}
      </div>

      {/* Other Destinations */}
      <div className="pt-8 border-t border-[var(--line)]">
        <h3 className="font-display text-xl font-medium text-[var(--ink)] mb-3">
          Khám phá thêm các điểm đến khác
        </h3>
        <div className="flex flex-wrap gap-2">
          {allDestinations
            .filter((d) => d.id !== destination.id)
            .map((dest) => (
              <button
                key={dest.id}
                onClick={() => onSwitchDestination(dest)}
                className="bg-[var(--bg-alt)] hover:bg-[var(--ink)] hover:text-[var(--bg)] border border-[var(--line)] text-[var(--ink)] px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors cursor-pointer"
              >
                {dest.name} ({dest.tourCount} tour)
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
