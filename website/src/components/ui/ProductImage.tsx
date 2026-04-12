'use client';

import React, { useState, useRef } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500;

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const retryCount = useRef(0);
  const retryTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleError() {
    if (retryTimeout.current) clearTimeout(retryTimeout.current);

    if (retryCount.current >= MAX_RETRIES) {
      setFailed(true);
      return;
    }

    const delay = BASE_DELAY_MS * Math.pow(2, retryCount.current);
    retryCount.current += 1;

    retryTimeout.current = setTimeout(() => {
      setImgSrc(`${src}?retry=${retryCount.current}`);
    }, delay);
  }

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 text-gray-500 text-sm text-center px-3 ${className ?? ''}`}
        role="img"
        aria-label={alt}
      >
        <span className="leading-snug">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
