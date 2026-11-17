import React, { useState } from 'react';
import { Hotel } from '../types/travel';
import { formatPrice } from '../components/TourCard';
import { SafeImage } from '../components/SafeImage';
import { Star, Search, Building2, ArrowRight } from 'lucide-react';

interface HotelsViewProps {
  hotels: Hotel[];
  onBookHotel: (hotel: Hotel) => void;
  onBackToHome: () => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({ hotels, onBookHotel }) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedStars, setSelectedStars] = useState<number | 'all'>('all');
  const [searchHotel, setSearchHotel] = useState<string>('');

  const cities = ['all', 'Đà Nẵng', 'Phú Quốc', 'Nha Trang', 'Sa Pa', 'Quy Nhơn', 'Đà Lạt'];

  const filteredHotels = hotels.filter((h) => {
    const matchCity = selectedCity === 'all' || h.city.toLowerCase() === selectedCity.toLowerCase();
    const matchStars = selectedStars === 'all' || h.starRating === selectedStars;
    const matchQuery =
      !searchHotel.trim() ||
      h.name.toLowerCase().includes(searchHotel.toLowerCase()) ||
      h.city.toLowerCase().includes(searchHotel.toLowerCase()) ||
      h.address.toLowerCase().includes(searchHotel.toLowerCase());
    return matchCity && matchStars && matchQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-16 select-none space-y-8">
      {/* Editorial Header (no cyan gradient) */}
      <div className="pb-8 border-b border-[var(--line)] max-w-3xl">
        <span className="font-mono-code text-xs tracking-[0.14em] uppercase text-[var(--sea)] inline-block pb-1 border-b border-[var(--sea)] mb-4">
          Khách sạn &amp; Resort nghỉ dưỡng
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight leading-tight">
          Nghỉ dưỡng 4 – 5 sao chọn lọc cùng TravelAnytime
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-3 leading-relaxed">
          Đặt phòng resort hướng biển, khách sạn trung tâm với giá cam kết thấp hơn thị trường 25%, miễn phí hủy linh hoạt và đón tiếp chu đáo.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[var(--bg-alt)] p-4 sm:p-5 rounded-[6px] border border-[var(--line)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-medium border transition-colors cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                    : 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]'
                }`}
              >
                {city === 'all' ? 'Tất cả thành phố' : city}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-[var(--text-muted)] mr-1">Hạng sao:</span>
            {(['all', 5, 4] as const).map((star) => (
              <button
                key={String(star)}
                onClick={() => setSelectedStars(star)}
                className={`px-2.5 py-1 rounded-[4px] font-medium border transition-colors cursor-pointer inline-flex items-center gap-1 ${
                  selectedStars === star
                    ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                    : 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]'
                }`}
              >
                <span>{star === 'all' ? 'Tất cả' : `${star} Sao`}</span>
                {star !== 'all' && <Star className="w-3 h-3 fill-current" />}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchHotel}
            onChange={(e) => setSearchHotel(e.target.value)}
            placeholder="Tìm theo tên khách sạn, địa chỉ hoặc tiện ích (Vinpearl, Mövenpick, bãi biển riêng...)"
            className="w-full pl-9 pr-4 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--ink)]"
          />
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div>
        <h2 className="font-display text-2xl font-normal text-[var(--ink)] mb-5">
          Danh sách khách sạn &amp; resort ({filteredHotels.length} kết quả)
        </h2>

        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <article
                key={hotel.id}
                className="bg-[var(--bg)] rounded-[6px] border border-[var(--line)] hover:border-[var(--ink)] overflow-hidden flex flex-col transition-colors duration-200 group"
              >
                <div className="relative h-52 w-full overflow-hidden bg-[var(--bg-alt)]">
                  <SafeImage
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 font-mono-code text-[11px] text-[var(--text-muted)]">
                      <span className="text-[var(--sea)] font-medium">{hotel.city}</span>
                      <span>·</span>
                      <span>{hotel.starRating} sao</span>
                      <span>·</span>
                      <span>{hotel.ratingScore.toFixed(1)} ({hotel.reviewCount} đánh giá)</span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-medium text-[var(--ink)] leading-snug group-hover:text-[var(--accent)] transition-colors">
                      {hotel.name}
                    </h3>

                    <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">
                      {hotel.address}
                    </p>

                    <div className="mt-3 text-xs text-[var(--sea)] font-medium">
                      {hotel.amenities.slice(0, 3).join(' · ')}
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-[var(--line)] flex items-end justify-between">
                    <div>
                      <span className="text-xs text-[var(--text-muted)] line-through block tabular-nums">
                        {formatPrice(hotel.originalPrice)}
                      </span>
                      <span className="font-display text-xl font-semibold text-[var(--accent)] tabular-nums">
                        {formatPrice(hotel.pricePerNight)}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">/đêm</span>
                    </div>

                    <button
                      onClick={() => onBookHotel(hotel)}
                      className="bg-[var(--ink)] hover:bg-[var(--accent)] text-[var(--bg)] font-semibold text-xs px-4 py-2.5 rounded-[6px] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Đặt phòng</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--bg-alt)] rounded-[6px] p-10 text-center border border-[var(--line)]">
            <Building2 className="w-10 h-10 text-[var(--sea)] mx-auto mb-2 stroke-[1.25]" />
            <p className="text-[var(--text-muted)] font-medium text-sm">
              Không tìm thấy khách sạn phù hợp với bộ lọc hiện tại.
            </p>
            <button
              onClick={() => {
                setSelectedCity('all');
                setSelectedStars('all');
                setSearchHotel('');
              }}
              className="mt-4 bg-[var(--ink)] text-[var(--bg)] text-xs font-semibold px-4 py-2 rounded-[6px] cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
