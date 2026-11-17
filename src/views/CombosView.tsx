import React, { useState } from 'react';
import { TravelCombo } from '../types/travel';
import { formatPrice } from '../components/TourCard';
import { SafeImage } from '../components/SafeImage';
import { Check, ArrowRight } from 'lucide-react';

interface CombosViewProps {
  combos: TravelCombo[];
  onBookCombo: (combo: TravelCombo) => void;
  onBackToHome: () => void;
}

export const CombosView: React.FC<CombosViewProps> = ({ combos, onBookCombo }) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('all');

  const destinations = ['all', 'Đà Nẵng', 'Phú Quốc', 'Nha Trang', 'Sa Pa', 'Quy Nhơn', 'Đà Lạt'];

  const filteredCombos =
    selectedDestination === 'all'
      ? combos
      : combos.filter((c) => c.destinationName.toLowerCase() === selectedDestination.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-16 select-none space-y-8">
      {/* Editorial Header (zero gradient banner) */}
      <div className="pb-8 border-b border-[var(--line)] max-w-3xl">
        <span className="font-mono-code text-xs tracking-[0.14em] uppercase text-[var(--sea)] inline-block pb-1 border-b border-[var(--sea)] mb-4">
          Combo tiết kiệm mùa hè &amp; dịp lễ
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight leading-tight">
          Combo vé máy bay &amp; khách sạn 4–5 sao
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-3 leading-relaxed">
          Gói du lịch tự do không gò bó lịch trình: đã bao gồm vé máy bay khứ hồi, phòng nghỉ dưỡng sang trọng, buffet sáng và xe đón tiễn sân bay. Tiết kiệm tới 35% so với đặt lẻ.
        </p>
      </div>

      {/* Destination Filter Tabs */}
      <div className="bg-[var(--bg-alt)] p-4 rounded-[6px] border border-[var(--line)] flex items-center gap-2 flex-wrap">
        <span className="font-mono-code text-xs text-[var(--text-muted)] mr-2">Điểm đến:</span>
        {destinations.map((dest) => (
          <button
            key={dest}
            onClick={() => setSelectedDestination(dest)}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-medium border transition-colors cursor-pointer ${
              selectedDestination === dest
                ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                : 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]'
            }`}
          >
            {dest === 'all' ? 'Tất cả Combo' : dest}
          </button>
        ))}
      </div>

      {/* Combos Grid */}
      <div>
        <h2 className="font-display text-2xl font-normal text-[var(--ink)] mb-5">
          Gói Combo du lịch nổi bật ({filteredCombos.length} gói)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCombos.map((combo) => (
            <article
              key={combo.id}
              className="bg-[var(--bg)] rounded-[6px] border border-[var(--line)] hover:border-[var(--ink)] overflow-hidden flex flex-col transition-colors duration-200 group"
            >
              <div className="relative h-52 w-full overflow-hidden bg-[var(--bg-alt)]">
                <SafeImage
                  src={combo.image}
                  alt={combo.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono-code text-[11px] text-[var(--text-muted)]">
                    <span className="text-[var(--accent)] font-semibold">Tiết kiệm {combo.discountPercent}%</span>
                    <span>·</span>
                    <span>{combo.duration}</span>
                    <span>·</span>
                    <span>{combo.destinationName}</span>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-medium text-[var(--ink)] leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                    {combo.title}
                  </h3>

                  <div className="mt-2.5 text-xs text-[var(--sea)] font-medium">
                    {combo.airline} · {combo.hotelName}
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[var(--line)] space-y-1.5">
                    {combo.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                        <Check className="w-3.5 h-3.5 text-[var(--sea)] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3.5 border-t border-[var(--line)] flex items-end justify-between">
                  <div>
                    <span className="text-xs text-[var(--text-muted)] line-through block tabular-nums">
                      {formatPrice(combo.originalPrice)}
                    </span>
                    <span className="font-display text-2xl font-semibold text-[var(--accent)] tabular-nums">
                      {formatPrice(combo.comboPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookCombo(combo)}
                    className="bg-[var(--accent)] hover:bg-[#be4921] text-[var(--bg)] font-semibold text-xs px-4 py-2.5 rounded-[6px] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Săn Combo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
