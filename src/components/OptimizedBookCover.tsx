import React, { useState } from 'react';

interface OptimizedBookCoverProps {
  alt?: string;
  className?: string;
  priority?: boolean;
  size?: 'full' | 'thumb' | 'print';
}

export const REMOTE_COVER_URL = 'https://i.ibb.co/1tCZ2cK6/Chat-GPT-Image-11-de-set-de-2026-22-07-27.png';
export const LOCAL_WEBP_COVER = '/images/mestra_lin_cover.webp';
export const LOCAL_WEBP_800 = '/images/mestra_lin_cover_800.webp';
export const LOCAL_WEBP_400 = '/images/mestra_lin_cover_400.webp';
export const LOCAL_JPG_800 = '/images/mestra_lin_cover_800.jpg';

export const OptimizedBookCover: React.FC<OptimizedBookCoverProps> = ({
  alt = 'Master Lin - Ancient Secrets of Chinese Medicine',
  className = '',
  priority = false,
  size = 'full',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Responsive sizing attribute based on usage context
  const sizesAttr =
    size === 'thumb'
      ? '(max-width: 768px) 100vw, 320px'
      : size === 'print'
      ? '260px'
      : '(max-width: 640px) 92vw, (max-width: 1024px) 440px, 480px';

  return (
    <div className={`relative overflow-hidden aspect-[2/3] bg-amber-900/10 dark:bg-amber-100/5 ${className}`}>
      {/* Subtle skeleton shimmer placeholder while loading to avoid any layout shift */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#8C3A2B]/10 via-[#8C3A2B]/5 to-transparent animate-pulse" />
      )}

      <picture>
        {/* Next-gen WebP responsive source: up to 90% lighter file sizes */}
        <source
          type="image/webp"
          srcSet={`${LOCAL_WEBP_400} 400w, ${LOCAL_WEBP_800} 800w, ${LOCAL_WEBP_COVER} 1024w`}
          sizes={sizesAttr}
        />
        {/* Optimized JPEG source fallback */}
        <source
          type="image/jpeg"
          srcSet={`${LOCAL_JPG_800} 800w, /src/assets/images/mestra_lin_cover_1785961502884.jpg 1024w`}
          sizes={sizesAttr}
        />
        {/* Main image with eager/lazy loading, async decoding, and seamless fallback */}
        <img
          src={hasError ? REMOTE_COVER_URL : LOCAL_WEBP_COVER}
          alt={alt}
          width={1024}
          height={1535}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (!hasError) {
              setHasError(true);
            }
          }}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </picture>
    </div>
  );
};
