import React from 'react';
import { Globe, MapPin, Palmtree, Flower2 } from 'lucide-react';
import { TourCategory } from '../types/travel';

interface QuickCategoriesProps {
  selectedCategory: TourCategory;
  onSelectCategory: (cat: TourCategory) => void;
}

export const QuickCategories: React.FC<QuickCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    {
      id: 'international' as TourCategory,
      num: '01',
      label: 'Tour nước ngoài',
      sub: 'Châu Á · Úc · Châu Âu',
      icon: Globe,
    },
    {
      id: 'domestic' as TourCategory,
      num: '02',
      label: 'Tour trong nước',
      sub: 'Di sản & núi rừng',
      icon: MapPin,
    },
    {
      id: 'summer' as TourCategory,
      num: '03',
      label: 'Tour hè',
      sub: 'Biển đảo & nghỉ dưỡng',
      icon: Palmtree,
    },
    {
      id: 'tet' as TourCategory,
      num: '04',
      label: 'Tour du lịch Tết',
      sub: 'Du xuân đón lộc 2027',
      icon: Flower2,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 border border-[var(--line)] rounded-[6px] divide-y lg:divide-y-0 lg:divide-x divide-[var(--line)] bg-[var(--bg)]">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className={`p-4 sm:p-5 text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? 'bg-[var(--ink)] text-[var(--bg)]'
                  : 'hover:bg-[var(--bg-alt)] text-[var(--ink)]'
              }`}
            >
              <div>
                <span
                  className={`font-mono-code text-[11px] block mb-1 ${
                    isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {cat.num}
                </span>
                <div className="font-display text-base sm:text-lg font-medium leading-snug">
                  {cat.label}
                </div>
                <div
                  className={`text-xs mt-0.5 ${
                    isSelected ? 'text-[var(--bg)]/80' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {isSelected ? 'Đang lọc · Nhấn để bỏ' : cat.sub}
                </div>
              </div>
              <Icon
                className={`w-5 h-5 stroke-[1.25] shrink-0 mt-1 ${
                  isSelected ? 'text-[var(--accent)]' : 'text-[var(--sea)]'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
