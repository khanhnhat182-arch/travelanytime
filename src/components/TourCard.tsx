import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Tour } from '../types/travel';
import { SafeImage } from './SafeImage';

interface TourCardProps {
  tour: Tour;
  onSelectTour: (tour: Tour) => void;
  onBookNow: (tour: Tour, e: React.MouseEvent) => void;
  featured?: boolean;
}

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
};

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  onSelectTour,
  onBookNow,
  featured = false,
}) => {
  return (
    <article
      onClick={() => onSelectTour(tour)}
      className={`bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--ink)] rounded-[6px] overflow-hidden flex ${
        featured ? 'flex-col md:flex-row' : 'flex-col'
      } transition-colors duration-200 cursor-pointer group`}
    >
      {/* Tour Image */}
      <div
        className={`relative overflow-hidden bg-[var(--bg-alt)] shrink-0 ${
          featured ? 'md:w-1/2 h-56 md:h-auto min-h-[240px]' : 'h-52 w-full'
        }`}
      >
        <SafeImage
          src={tour.image}
          alt={tour.title}
          fallbackText={tour.destinationName}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      {/* Tour Content */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Clean unboxed metadata with typographic separators */}
          <div className="flex flex-wrap items-center gap-2 font-mono-code text-[11px] text-[var(--text-muted)]">
            <span className="text-[var(--sea)] font-medium">{tour.location}</span>
            <span aria-hidden="true">·</span>
            <span>{tour.duration}</span>
            <span aria-hidden="true">·</span>
            <span>
              {tour.rating.toFixed(1)} ({tour.reviewCount} đánh giá)
            </span>
          </div>

          {/* Title */}
          <h3
            className={`mt-2.5 font-display font-medium text-[var(--ink)] leading-snug group-hover:text-[var(--accent)] transition-colors ${
              featured ? 'text-xl sm:text-2xl' : 'text-lg'
            }`}
          >
            {tour.title}
          </h3>

          {featured && tour.highlights[0] && (
            <p className="mt-2.5 text-xs sm:text-sm text-[var(--text-muted)] line-clamp-2">
              {tour.highlights[0]}
            </p>
          )}

          {/* Promo Notice as plain editorial line */}
          <div className="mt-3 text-xs font-medium text-[var(--sea)]">
            {tour.discountBadge} · Khởi hành: {tour.departureSchedule}
          </div>
        </div>

        {/* Pricing and Action Row */}
        <div className="pt-3.5 border-t border-[var(--line)] flex items-end justify-between gap-3">
          <div>
            <span className="text-xs text-[var(--text-muted)] line-through block tabular-nums">
              {formatPrice(tour.originalPrice)}
            </span>
            <span className="font-display text-xl sm:text-2xl font-semibold text-[var(--accent)] tabular-nums">
              {formatPrice(tour.salePrice)}
            </span>
          </div>

          <button
            onClick={(e) => onBookNow(tour, e)}
            className="bg-[var(--ink)] hover:bg-[var(--accent)] text-[var(--bg)] font-semibold text-xs px-4 py-2.5 rounded-[6px] transition-colors cursor-pointer inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Đặt ngay</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
        </div>
      </div>
    </article>
  );
};
