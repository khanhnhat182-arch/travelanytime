import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  X as XIcon,
  Phone,
  ShieldCheck,
  Utensils,
  Building,
} from 'lucide-react';
import { Tour } from '../types/travel';
import { formatPrice } from '../components/TourCard';
import { SafeImage } from '../components/SafeImage';

interface TourDetailViewProps {
  tour: Tour;
  onBack: () => void;
  onBookNow: (tour: Tour) => void;
}

export const TourDetailView: React.FC<TourDetailViewProps> = ({ tour, onBack, onBookNow }) => {
  const [selectedImage, setSelectedImage] = useState(tour.image);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'policy' | 'reviews'>('itinerary');

  const [sidebarName, setSidebarName] = useState('');
  const [sidebarPhone, setSidebarPhone] = useState('');
  const [sidebarDate, setSidebarDate] = useState(tour.departureDates[0] || '');
  const [sidebarGuests, setSidebarGuests] = useState(2);
  const [sidebarError, setSidebarError] = useState('');

  const handleQuickSidebarBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sidebarName.trim() || !sidebarPhone.trim()) {
      setSidebarError('Vui lòng nhập Họ tên và Số điện thoại');
      return;
    }
    setSidebarError('');
    onBookNow(tour);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-16 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-[var(--line)] mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[var(--ink)] hover:text-[var(--accent)] border border-[var(--line)] bg-[var(--bg-alt)] px-4 py-2 rounded-[6px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
          <span>Quay lại trang chủ</span>
        </button>

        <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--text-muted)]">
          <span className="hidden sm:inline">Trang chủ</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline">{tour.destinationName}</span>
          <span className="hidden sm:inline">/</span>
          <span className="text-[var(--ink)] font-medium">{tour.duration}</span>
        </div>
      </div>

      {/* Main Tour Header */}
      <div className="mb-8 pb-8 border-b border-[var(--line)]">
        <span className="font-mono-code text-xs tracking-[0.12em] uppercase text-[var(--sea)] inline-block pb-1 border-b border-[var(--sea)] mb-3">
          {tour.category === 'international' ? 'Tour Quốc Tế' : 'Tour Nội Địa'} · {tour.discountBadge}
        </span>

        <h1 className="font-display text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight leading-[1.08] max-w-4xl">
          {tour.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono-code text-xs text-[var(--text-muted)]">
          <span className="text-[var(--ink)] font-semibold">
            {tour.rating.toFixed(1)} Tuyệt vời ({tour.reviewCount} đánh giá)
          </span>
          <span aria-hidden="true">·</span>
          <span>{tour.location}</span>
          <span aria-hidden="true">·</span>
          <span>Thời gian: {tour.duration}</span>
          <span aria-hidden="true">·</span>
          <span>{tour.transportation}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Photo Gallery */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-[420px] rounded-[6px] overflow-hidden border border-[var(--line)] bg-[var(--bg-alt)]">
              <SafeImage
                src={selectedImage}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {[tour.image, ...tour.gallery].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-16 sm:h-20 rounded-[6px] overflow-hidden border transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-[var(--accent)] opacity-100'
                      : 'border-[var(--line)] opacity-75 hover:opacity-100'
                  }`}
                >
                  <SafeImage src={img} alt={`Ảnh ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-[var(--bg-alt)] p-6 rounded-[6px] border border-[var(--line)]">
            <h3 className="font-display text-xl font-medium text-[var(--ink)] mb-4">
              Điểm nổi bật của chương trình
            </h3>
            <ul className="space-y-3">
              {tour.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text)]">
                  <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5 stroke-[2]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[var(--line)] gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`pb-3 transition-colors cursor-pointer ${
                activeTab === 'itinerary'
                  ? 'border-b-2 border-[var(--accent)] text-[var(--ink)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Lịch trình chi tiết ({tour.itinerary.length} ngày)
            </button>
            <button
              onClick={() => setActiveTab('policy')}
              className={`pb-3 transition-colors cursor-pointer ${
                activeTab === 'policy'
                  ? 'border-b-2 border-[var(--accent)] text-[var(--ink)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Dịch vụ bao gồm &amp; Điều khoản
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-[var(--accent)] text-[var(--ink)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Đánh giá ({tour.reviews.length})
            </button>
          </div>

          {/* Tab 1: Itinerary */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {tour.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="bg-[var(--bg)] p-5 rounded-[6px] border border-[var(--line)]"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono-code text-xs font-semibold text-[var(--accent)] uppercase tracking-wider shrink-0">
                      Ngày 0{day.day}
                    </span>
                    <h4 className="font-display text-lg font-medium text-[var(--ink)]">
                      {day.title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {day.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[var(--line)] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-[var(--sea)] shrink-0" />
                      <span>Bữa ăn: <strong className="text-[var(--ink)]">{day.meals}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[var(--sea)] shrink-0" />
                      <span>Lưu trú: <strong className="text-[var(--ink)]">{day.hotel}</strong></span>
                    </div>
                  </div>

                  {day.activities && day.activities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono-code text-[11px] text-[var(--sea)]">
                      {day.activities.map((act, i) => (
                        <span key={i}>· {act}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Policy */}
          {activeTab === 'policy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[var(--bg-alt)] p-5 rounded-[6px] border border-[var(--line)]">
                <h4 className="font-display text-lg font-medium text-[var(--ink)] mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--sea)] stroke-[2]" />
                  <span>Giá tour đã bao gồm</span>
                </h4>
                <ul className="space-y-2 text-xs text-[var(--text)]">
                  {tour.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--sea)] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--bg)] p-5 rounded-[6px] border border-[var(--line)]">
                <h4 className="font-display text-lg font-medium text-[var(--ink)] mb-3 flex items-center gap-2">
                  <XIcon className="w-4 h-4 text-[var(--accent)] stroke-[2]" />
                  <span>Giá tour chưa bao gồm</span>
                </h4>
                <ul className="space-y-2 text-xs text-[var(--text-muted)]">
                  {tour.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="bg-[var(--bg-alt)] p-6 rounded-[6px] border border-[var(--line)] space-y-4">
              <h4 className="font-display text-xl font-medium text-[var(--ink)]">
                Nhận xét từ du khách ({tour.reviews.length})
              </h4>
              <div className="space-y-4">
                {tour.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-[var(--bg)] rounded-[6px] border border-[var(--line)] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-8 h-8 rounded-[4px] object-cover border border-[var(--line)]"
                        />
                        <div>
                          <div className="font-semibold text-xs text-[var(--ink)]">{rev.author}</div>
                          <div className="font-mono-code text-[10px] text-[var(--text-muted)]">{rev.date}</div>
                        </div>
                      </div>
                      <span className="font-mono-code text-xs font-semibold text-[var(--accent)]">
                        {rev.rating} / 10
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] italic">“{rev.comment}”</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="lg:col-span-4 space-y-5">
          <div className="sticky top-24 bg-[var(--bg-alt)] p-5 sm:p-6 rounded-[6px] border border-[var(--ink)] space-y-4">
            <div className="pb-4 border-b border-[var(--line)]">
              <span className="font-mono-code text-[11px] uppercase tracking-wider text-[var(--text-muted)] block">
                Giá trọn gói mỗi khách
              </span>
              <div className="flex items-baseline gap-2.5 mt-1">
                <span className="font-display text-3xl font-semibold text-[var(--accent)] tabular-nums">
                  {formatPrice(tour.salePrice)}
                </span>
                <span className="text-xs text-[var(--text-muted)] line-through tabular-nums">
                  {formatPrice(tour.originalPrice)}
                </span>
              </div>
              <div className="mt-1.5 text-xs font-medium text-[var(--sea)]">
                {tour.discountBadge}
              </div>
            </div>

            <form onSubmit={handleQuickSidebarBook} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[var(--ink)] mb-1">
                  Họ và tên của bạn
                </label>
                <input
                  type="text"
                  value={sidebarName}
                  onChange={(e) => setSidebarName(e.target.value)}
                  placeholder="Nhập họ và tên..."
                  className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs focus:border-[var(--ink)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--ink)] mb-1">
                  Số điện thoại nhận tư vấn
                </label>
                <input
                  type="tel"
                  value={sidebarPhone}
                  onChange={(e) => setSidebarPhone(e.target.value)}
                  placeholder="0912 345 678..."
                  className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs focus:border-[var(--ink)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--ink)] mb-1">
                  Ngày khởi hành dự kiến
                </label>
                <select
                  value={sidebarDate}
                  onChange={(e) => setSidebarDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs focus:border-[var(--ink)] focus:outline-none"
                >
                  {tour.departureDates.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[var(--ink)] mb-1">
                  Số lượng khách: {sidebarGuests}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSidebarGuests(Math.max(1, sidebarGuests - 1))}
                    className="w-8 h-8 rounded-[4px] border border-[var(--line)] bg-[var(--bg)] flex items-center justify-center font-bold text-[var(--ink)] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono-code font-semibold text-sm text-[var(--ink)] min-w-8 text-center">
                    {sidebarGuests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSidebarGuests(sidebarGuests + 1)}
                    className="w-8 h-8 rounded-[4px] border border-[var(--line)] bg-[var(--bg)] flex items-center justify-center font-bold text-[var(--ink)] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {sidebarError && (
                <p className="text-[var(--accent)] text-xs">{sidebarError}</p>
              )}

              <div className="bg-[var(--bg)] border border-[var(--line)] p-3 rounded-[6px] flex items-center justify-between font-semibold text-[var(--ink)]">
                <span>Ước tính ({sidebarGuests} khách):</span>
                <span className="font-display text-lg text-[var(--accent)] tabular-nums">
                  {formatPrice(tour.salePrice * sidebarGuests)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-[6px] bg-[var(--accent)] hover:bg-[#be4921] text-[var(--bg)] font-semibold text-sm transition-colors cursor-pointer"
              >
                Đặt tour ngay
              </button>
            </form>

            <div className="pt-3 border-t border-[var(--line)] text-center space-y-1">
              <span className="text-xs text-[var(--text-muted)] block">Hotline tư vấn 24/7</span>
              <a
                href="tel:0911708015"
                className="inline-flex items-center gap-2 text-[var(--ink)] hover:text-[var(--accent)] font-mono-code font-semibold text-base"
              >
                <Phone className="w-4 h-4 stroke-[1.5]" />
                <span>0911 708 015</span>
              </a>
            </div>

            <div className="pt-2 space-y-1.5 text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--sea)] shrink-0" />
                <span>Bảo hiểm du lịch trọn gói 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--sea)] shrink-0" />
                <span>Hoàn tiền nếu hủy do bất khả kháng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
