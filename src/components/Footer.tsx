import React from 'react';
import { MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectDestinationName: (name: string) => void;
  onSelectTourLine: (line: string) => void;
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectDestinationName,
  onSelectTourLine,
  onContactClick,
}) => {
  const domesticCol1 = ['Hà Nội', 'Hải Phòng', 'Ninh Bình', 'Phú Quốc', 'Phan Thiết', 'Hà Giang', 'Lạng Sơn', 'Cao Bằng'];
  const domesticCol2 = ['Nha Trang', 'Nghệ An', 'Hà Tĩnh', 'Thanh Hóa', 'Quảng Bình', 'Huế', 'Cà Mau', 'Đà Nẵng', 'Đà Lạt'];
  const international = ['Trung Quốc', 'Hàn Quốc', 'Mỹ', 'Ấn Độ', 'Úc', 'Ý', 'Canada'];
  const tourLines = ['Cao cấp', 'Bình Thường', 'Tiết kiệm', 'Tiêu Chuẩn'];

  return (
    <footer className="bg-[var(--bg-alt)] border-t border-[var(--line)] text-[var(--text)] pt-14 pb-10 mt-16 text-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top 3 link columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[var(--line)]">
          {/* Column 1: Du lịch trong nước */}
          <div className="md:col-span-5">
            <h4 className="font-display text-lg font-medium text-[var(--ink)] mb-4 tracking-tight">
              Du lịch trong nước
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm text-[var(--text-muted)]">
              <div className="space-y-2">
                {domesticCol1.map((item) => (
                  <button
                    key={item}
                    onClick={() => onSelectDestinationName(item)}
                    className="block hover:text-[var(--accent)] transition-colors cursor-pointer text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {domesticCol2.map((item) => (
                  <button
                    key={item}
                    onClick={() => onSelectDestinationName(item)}
                    className="block hover:text-[var(--accent)] transition-colors cursor-pointer text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Du lịch nước ngoài */}
          <div className="md:col-span-4">
            <h4 className="font-display text-lg font-medium text-[var(--ink)] mb-4 tracking-tight">
              Du lịch nước ngoài
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[var(--text-muted)]">
              {international.map((item) => (
                <button
                  key={item}
                  onClick={() => onSelectDestinationName(item)}
                  className="block hover:text-[var(--accent)] transition-colors cursor-pointer text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Dòng tour */}
          <div className="md:col-span-3">
            <h4 className="font-display text-lg font-medium text-[var(--ink)] mb-4 tracking-tight">
              Dòng tour
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[var(--text-muted)]">
              {tourLines.map((item) => (
                <button
                  key={item}
                  onClick={() => onSelectTourLine(item)}
                  className="block hover:text-[var(--accent)] transition-colors cursor-pointer text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Liên hệ & Chứng nhận */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10">
          {/* Liên hệ */}
          <div className="md:col-span-7">
            <h4 className="font-display text-lg font-medium text-[var(--ink)] mb-4 tracking-tight">
              Liên hệ
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[var(--text-muted)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--ink)] shrink-0 mt-0.5 stroke-[1.5]" />
                <span>
                  Số 51, đường Lý Tự Trọng, khối 12, phường Hà Huy Tập, thành phố Vinh, tỉnh Nghệ An, Việt Nam.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--ink)] shrink-0 stroke-[1.5]" />
                <a
                  href="mailto:tramanh150618@gmail.com"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  tramanh150618@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--ink)] shrink-0 stroke-[1.5]" />
                <a
                  href="tel:0911708015"
                  className="font-mono-code font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                >
                  0911 708 015 - 0909 885 681
                </a>
              </div>
            </div>

            {/* Minimal Social Links in hairline boxes (zero gradients) */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href="#tumblr"
                title="Tumblr"
                onClick={(e) => { e.preventDefault(); onContactClick(); }}
                className="w-9 h-9 rounded-[6px] border border-[var(--ink)]/30 bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] flex items-center justify-center font-display font-semibold text-base transition-colors"
              >
                t
              </a>

              <a
                href="#instagram"
                title="Instagram"
                onClick={(e) => { e.preventDefault(); onContactClick(); }}
                className="w-9 h-9 rounded-[6px] border border-[var(--ink)]/30 bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a
                href="#chat"
                title="Live Chat"
                onClick={(e) => { e.preventDefault(); onContactClick(); }}
                className="w-9 h-9 rounded-[6px] border border-[var(--ink)]/30 bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] flex items-center justify-center transition-colors"
                aria-label="Hỗ trợ trực tuyến"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Chứng nhận & Bảo mật (không dùng Bộ Công Thương theo yêu cầu trước) */}
          <div className="md:col-span-5 flex flex-col justify-start">
            <h4 className="font-display text-lg font-medium text-[var(--ink)] mb-4 tracking-tight">
              Chứng nhận &amp; Bảo mật
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-[var(--ink)]/30 bg-[var(--bg)] text-[var(--ink)] font-mono-code text-xs px-3 py-2 rounded-[6px] uppercase tracking-wide">
                <span className="bg-[var(--ink)] text-[var(--bg)] px-1.5 py-0.5 rounded-[3px] text-[10px] mr-2 font-semibold">
                  DMCA
                </span>
                <span className="font-semibold text-[11px]">PROTECTED</span>
              </div>

              <div className="inline-flex items-center border border-[var(--ink)]/30 bg-[var(--bg)] text-[var(--ink)] font-mono-code font-medium text-xs px-3 py-2 rounded-[6px]">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[var(--sea)] stroke-[1.5]" />
                <span>BẢO HIỂM 100%</span>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-xs mt-5">
              © {new Date().getFullYear()} TravelAnytime. Giữ toàn quyền tác quyền và thương hiệu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
