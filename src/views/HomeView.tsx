import React, { useState } from 'react';
import { Tour, Destination, TourCategory } from '../types/travel';
import { HeroBanner } from '../components/HeroBanner';
import { QuickCategories } from '../components/QuickCategories';
import { TourCard } from '../components/TourCard';
import { DestinationCard } from '../components/DestinationCard';
import { Compass, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  tours: Tour[];
  domesticDestinations: Destination[];
  internationalDestinations: Destination[];
  selectedCategory: TourCategory;
  onSelectCategory: (cat: TourCategory) => void;
  onSelectTour: (tour: Tour) => void;
  onSelectDestination: (dest: Destination) => void;
  onBookNow: (tour: Tour, e: React.MouseEvent) => void;
  onOpenVoucher: (code: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  tours,
  domesticDestinations,
  internationalDestinations,
  selectedCategory,
  onSelectCategory,
  onSelectTour,
  onSelectDestination,
  onBookNow,
  onOpenVoucher,
}) => {
  const [visibleTourCount, setVisibleTourCount] = useState(6);
  const [visibleDomesticCount, setVisibleDomesticCount] = useState(6);
  const [visibleIntlCount, setVisibleIntlCount] = useState(3);

  const filteredTours =
    selectedCategory === 'all'
      ? tours
      : tours.filter((t) => t.category === selectedCategory);

  const displayedTours = filteredTours.slice(0, visibleTourCount);
  const leadTour = displayedTours[0];
  const restTours = displayedTours.slice(1);

  const displayedDomestic = domesticDestinations.slice(0, visibleDomesticCount);
  const displayedIntl = internationalDestinations.slice(0, visibleIntlCount);

  const marqueeItems = [
    'Huế',
    'Quảng Bình',
    'Cao Bằng',
    'Sài Gòn',
    'Hội An',
    'Đà Lạt',
    'Phú Quốc',
    'Nha Trang',
    'Sa Pa',
    'Quy Nhơn',
    'Hàn Quốc',
    'Nhật Bản',
    'Thụy Sỹ',
    'Úc',
    'Canada',
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. ASYMMETRIC HERO BANNER + TICKET STRIP */}
      <HeroBanner
        onExploreTours={() => {
          const section = document.getElementById('cheap-tours-section');
          section?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenVoucher={onOpenVoucher}
      />

      {/* 2. QUICK CATEGORIES BAR + DESTINATION MARQUEE STRIP */}
      <div>
        <QuickCategories
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />

        <div
          className="border-y border-[var(--line)] bg-[var(--bg-alt)] py-3 overflow-hidden mt-6"
          aria-label="Điểm đến nổi bật"
        >
          <div className="marquee-track font-mono-code text-xs text-[var(--ink)] tracking-wider uppercase">
            {[...marqueeItems, ...marqueeItems].map((place, idx) => (
              <span key={idx} className="inline-flex items-center">
                <span className="px-4">{place}</span>
                <span aria-hidden="true" className="text-[var(--accent)]">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SECTION 01: DU LỊCH GIÁ RẺ */}
      <section
        id="cheap-tours-section"
        className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24 reveal-item"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--line)] mb-8">
          <div>
            <span className="font-mono-code text-xs tracking-[0.14em] uppercase text-[var(--sea)] block mb-2">
              01 / Du lịch giá rẻ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight leading-tight">
              Hành trình chọn lọc mỗi ngày
            </h2>
            <p className="text-[var(--text-muted)] text-sm mt-2 max-w-xl">
              Nhanh tay chớp cơ hội săn tour giá tốt mỗi ngày — khởi hành đúng hẹn, dịch vụ rõ ràng.
            </p>
          </div>

          {selectedCategory !== 'all' && (
            <div className="flex items-center gap-3 text-xs border border-[var(--line)] bg-[var(--bg-alt)] px-3.5 py-2 rounded-[6px] shrink-0">
              <span className="text-[var(--text-muted)]">Đang lọc danh mục</span>
              <button
                onClick={() => onSelectCategory('all')}
                className="text-[var(--accent)] font-semibold underline cursor-pointer"
              >
                Xem tất cả
              </button>
            </div>
          )}
        </div>

        {/* Varied Rhythm: Lead Horizontal Featured Tour + Asymmetric 7/5 Grid */}
        {displayedTours.length > 0 ? (
          <div className="space-y-6">
            {leadTour && (
              <TourCard
                tour={leadTour}
                featured
                onSelectTour={onSelectTour}
                onBookNow={onBookNow}
              />
            )}

            {restTours.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                {restTours.map((tour, idx) => {
                  // Alternate 7/5 and 5/7 spans on desktop for editorial cadence
                  const colSpan =
                    idx % 4 === 0 || idx % 4 === 3
                      ? 'lg:col-span-7'
                      : 'lg:col-span-5';
                  return (
                    <div key={tour.id} className={colSpan}>
                      <TourCard
                        tour={tour}
                        onSelectTour={onSelectTour}
                        onBookNow={onBookNow}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-14 bg-[var(--bg-alt)] rounded-[6px] border border-[var(--line)] p-8">
            <Compass className="w-10 h-10 text-[var(--sea)] mx-auto mb-3 stroke-[1.25]" />
            <p className="text-[var(--text-muted)] font-medium text-sm">
              Không tìm thấy tour phù hợp với danh mục này.
            </p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-4 bg-[var(--ink)] text-[var(--bg)] font-semibold px-5 py-2.5 rounded-[6px] text-xs hover:bg-[var(--accent)] transition-colors cursor-pointer"
            >
              Hiển thị tất cả các tour
            </button>
          </div>
        )}

        {/* Button "Xem thêm tour" — hairline border, 6px radius */}
        {filteredTours.length > visibleTourCount ? (
          <div className="mt-10 flex justify-start sm:justify-end">
            <button
              onClick={() => setVisibleTourCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[6px] border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <span>Xem thêm tour ({filteredTours.length - visibleTourCount} tour nữa)</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>
        ) : visibleTourCount > 6 ? (
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setVisibleTourCount(6)}
              className="editorial-link text-xs text-[var(--text-muted)] hover:text-[var(--ink)] font-semibold cursor-pointer"
            >
              Thu gọn danh sách
            </button>
          </div>
        ) : (
          <div className="mt-10 flex justify-start sm:justify-end">
            <button
              onClick={() => setVisibleTourCount(tours.length)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[6px] border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <span>Xem thêm tour</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>
        )}
      </section>

      {/* 4. SECTION 02: KHÁM PHÁ ĐỊA DANH TRONG NƯỚC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 reveal-item">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--line)] mb-8">
          <div>
            <span className="font-mono-code text-xs tracking-[0.14em] uppercase text-[var(--sea)] block mb-2">
              02 / Khám phá địa danh trong nước
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight leading-tight">
              Dọc dải đất hình chữ S
            </h2>
            <p className="text-[var(--text-muted)] text-sm mt-2">
              Những danh lam thắng cảnh tuyệt đẹp từ miền núi phía Bắc đến đảo ngọc phương Nam.
            </p>
          </div>

          <button
            onClick={() => {
              if (visibleDomesticCount < domesticDestinations.length) {
                setVisibleDomesticCount(domesticDestinations.length);
              } else {
                onSelectDestination(domesticDestinations[0]);
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] font-semibold text-xs transition-colors cursor-pointer w-fit shrink-0"
          >
            <span>
              {visibleDomesticCount < domesticDestinations.length
                ? `Xem thêm địa danh (${domesticDestinations.length - visibleDomesticCount})`
                : 'Xem chi tiết điểm đến'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetric Mosaic Grid (6/3/3 + 4/4/4 rhythm on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
          {displayedDomestic.map((dest, idx) => {
            const spanClass =
              idx === 0
                ? 'lg:col-span-6'
                : idx === 1 || idx === 2
                ? 'lg:col-span-3'
                : 'lg:col-span-4';
            return (
              <div key={dest.id} className={spanClass}>
                <DestinationCard
                  destination={dest}
                  onSelectDestination={onSelectDestination}
                  tall={idx === 0}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SECTION 03: KHÁM PHÁ ĐỊA DANH NƯỚC NGOÀI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 reveal-item">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--line)] mb-8">
          <div>
            <span className="font-mono-code text-xs tracking-[0.14em] uppercase text-[var(--sea)] block mb-2">
              03 / Khám phá địa danh nước ngoài
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight leading-tight">
              Kỳ quan khắp năm châu
            </h2>
            <p className="text-[var(--text-muted)] text-sm mt-2">
              Khám phá những nền văn minh rực rỡ từ Đông Á đến Châu Âu, Úc và Bắc Mỹ.
            </p>
          </div>

          <button
            onClick={() => {
              if (visibleIntlCount < internationalDestinations.length) {
                setVisibleIntlCount(internationalDestinations.length);
              } else {
                onSelectDestination(internationalDestinations[0]);
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] font-semibold text-xs transition-colors cursor-pointer w-fit shrink-0"
          >
            <span>
              {visibleIntlCount < internationalDestinations.length
                ? `Xem thêm tour (${internationalDestinations.length - visibleIntlCount})`
                : 'Xem chi tiết điểm đến'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetric 6/3/3 Mosaic for International Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
          {displayedIntl.map((dest, idx) => {
            const spanClass =
              idx === 0
                ? 'lg:col-span-6'
                : idx === 1 || idx === 2
                ? 'lg:col-span-3'
                : 'lg:col-span-4';
            return (
              <div key={dest.id} className={spanClass}>
                <DestinationCard
                  destination={dest}
                  onSelectDestination={onSelectDestination}
                  tall={idx === 0}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
