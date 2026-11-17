import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface HeroBannerProps {
  onExploreTours: () => void;
  onOpenVoucher: (code: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreTours, onOpenVoucher }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-10 sm:pb-16 border-b border-[var(--line)]">
      {/* Asymmetric 12-col split: headline left, overlapping 4:5 photo block right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
        {/* Left Headline Column (spans 8 cols on desktop so photo overlaps gracefully) */}
        <div className="lg:col-span-8 lg:pr-10 relative z-10">
          {/* Plain small uppercase text with thin underline (NOT a pill) */}
          <span className="font-mono-code text-xs tracking-[0.14em] uppercase text-[var(--sea)] inline-block pb-1 border-b border-[var(--sea)] mb-5">
            Mùa hè sôi động 2026 · Ưu đãi độc quyền
          </span>

          {/* Sentence-case editorial headline, dramatic scale contrast, zero text-shadow */}
          <h1
            className="font-display font-normal text-[var(--ink)] tracking-[-0.025em] leading-[0.98]"
            style={{ fontSize: 'clamp(2.75rem, 6.4vw, 5.75rem)' }}
          >
            Rực rỡ sắc hè,{' '}
            <span className="italic text-[var(--sea)] block sm:inline">
              vi vu năm châu.
            </span>
          </h1>

          <p className="mt-6 text-[var(--text-muted)] text-sm sm:text-base leading-relaxed max-w-xl">
            Hơn 100 hành trình trong nước và quốc tế được thiết kế chỉn chu cùng TravelAnytime — lịch trình vừa vặn, lưu trú chọn lọc và mức giá rõ ràng ngay từ đầu.
          </p>

          {/* Primary CTA (solid --accent, small radius) + Secondary underlined link */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              onClick={onExploreTours}
              className="bg-[var(--accent)] hover:bg-[#be4921] text-[var(--bg)] font-semibold text-sm px-6 py-3 rounded-[6px] transition-colors cursor-pointer inline-flex items-center gap-2.5"
            >
              <span>Săn tour ngay</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>

            <a
              href="tel:0909885681"
              className="editorial-link text-sm font-semibold text-[var(--ink)] border-b border-[var(--ink)] pb-0.5"
            >
              Gọi tư vấn: 0909.885.681 · travelanytime.vn
            </a>
          </div>
        </div>

        {/* Right Tall 4:5 Art-Directed Photo Block overlapping headline area */}
        <div className="lg:col-span-4 lg:-ml-10 relative z-0">
          <div className="relative rounded-[8px] overflow-hidden border border-[var(--line)] bg-[var(--bg-alt)] aspect-[4/5]">
            <SafeImage
              src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=85"
              alt="Thuyền gỗ truyền thống trôi nhẹ trên mặt nước xanh ngọc giữa những dãy núi đá vôi vịnh Hạ Long trong nắng sớm mai ấm áp"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[var(--bg)]/95 border-t border-[var(--line)] px-4 py-3 flex items-center justify-between gap-2">
              <span className="font-mono-code text-[11px] text-[var(--ink)]">
                01 / Vịnh Bắc Bộ &amp; 5 Châu
              </span>
              <span className="font-mono-code text-[11px] text-[var(--text-muted)]">
                Tỉ lệ 4:5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Numbered Ticket Strip (01 / 02 / 03) — single neutral surface, accent ONLY on key figure */}
      <div className="mt-10 sm:mt-14 border border-[var(--line)] rounded-[6px] bg-[var(--bg-alt)] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
        <button
          onClick={() => onOpenVoucher('NHOM3T')}
          className="p-5 text-left hover:bg-[var(--bg)] transition-colors cursor-pointer flex items-baseline gap-4 group"
        >
          <span className="font-mono-code text-xs text-[var(--text-muted)]">01</span>
          <div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Ưu đãi đăng ký nhóm</div>
            <div className="font-display text-2xl sm:text-[26px] font-medium text-[var(--accent)] mt-0.5 leading-tight">
              Giảm đến 3 triệu
            </div>
            <div className="text-xs text-[var(--ink)] mt-1 underline decoration-[var(--line)] group-hover:decoration-[var(--accent)]">
              Áp dụng mã NHOM3T
            </div>
          </div>
        </button>

        <button
          onClick={() => onOpenVoucher('VOUCHER500K')}
          className="p-5 text-left hover:bg-[var(--bg)] transition-colors cursor-pointer flex items-baseline gap-4 group"
        >
          <span className="font-mono-code text-xs text-[var(--text-muted)]">02</span>
          <div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Quà tặng đặt chỗ trực tuyến</div>
            <div className="font-display text-2xl sm:text-[26px] font-medium text-[var(--accent)] mt-0.5 leading-tight">
              Voucher 500.000đ
            </div>
            <div className="text-xs text-[var(--ink)] mt-1 underline decoration-[var(--line)] group-hover:decoration-[var(--accent)]">
              Áp dụng mã VOUCHER500K
            </div>
          </div>
        </button>

        <div className="p-5 text-left flex items-baseline gap-4">
          <span className="font-mono-code text-xs text-[var(--text-muted)]">03</span>
          <div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Bộ quà tặng đồng hành</div>
            <div className="font-display text-2xl sm:text-[26px] font-medium text-[var(--accent)] mt-0.5 leading-tight">
              Túi vải Canvas
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              Kèm nón cói &amp; gối cổ du lịch
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
