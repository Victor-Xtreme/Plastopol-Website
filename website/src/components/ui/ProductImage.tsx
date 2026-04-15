'use client';

import React, { useState, useRef } from 'react';

interface ProductImageProps {
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
}

const PLACEHOLDER = '/images/placeholder.png';

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const isFallback = useRef(false);

  function handleError() {
    if (isFallback.current) return; // placeholder itself failed, stop
    isFallback.current = true;
    setImgSrc(PLACEHOLDER);
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