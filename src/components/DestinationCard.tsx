import React from 'react';
import { Destination } from '../types/travel';
import { SafeImage } from './SafeImage';

interface DestinationCardProps {
  destination: Destination;
  onSelectDestination: (dest: Destination) => void;
  tall?: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelectDestination,
  tall = false,
}) => {
  return (
    <article
      onClick={() => onSelectDestination(destination)}
      className={`group relative rounded-[6px] overflow-hidden border border-[var(--line)] hover:border-[var(--ink)] transition-colors duration-300 cursor-pointer bg-[var(--bg-alt)] flex flex-col ${
        tall ? 'h-64 sm:h-72' : 'h-56 sm:h-64'
      }`}
    >
      <div className="relative flex-1 overflow-hidden">
        <SafeImage
          src={destination.image}
          alt={`${destination.name} — ${destination.description}`}
          fallbackText={destination.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
      </div>

      {/* Solid flat caption band (zero gradients, crisp WCAG AA contrast) */}
      <div className="bg-[var(--bg)] border-t border-[var(--line)] px-4 py-3 flex items-baseline justify-between gap-2">
        <h3 className="font-display text-lg sm:text-xl font-medium tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
          {destination.name}
        </h3>
        <span className="font-mono-code text-[11px] text-[var(--text-muted)] shrink-0">
          {destination.tourCount} tour
        </span>
      </div>
    </article>
  );
};
