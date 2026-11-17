import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackText || 'TravelAnytime'}
        className={`w-full h-full min-h-[140px] flex flex-col items-center justify-center bg-[var(--bg-alt)] text-[var(--ink)] border border-[var(--line)] p-4 text-center select-none ${containerClassName}`}
      >
        <Compass className="w-6 h-6 mb-2 text-[var(--sea)] stroke-[1.25]" />
        <span className="font-mono-code text-[11px] tracking-wider uppercase text-[var(--text-muted)] line-clamp-2">
          {fallbackText || alt || 'TravelAnytime'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'Travel Tour'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
