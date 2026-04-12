'use client';

import React, { useState, useRef } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const PLACEHOLDER = '/images/placeholder.png';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500; // doubles each attempt: 500ms, 1000ms, 2000ms

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const retryCount = useRef(0);
  const retryTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleError() {
    // Already showing placeholder — stop entirely
    if (failed || imgSrc === PLACEHOLDER) {
      setFailed(true);
      return;
    }

    if (retryCount.current >= MAX_RETRIES) {
      // Give up, show placeholder permanently
      setFailed(true);
      setImgSrc(PLACEHOLDER);
      return;
    }

    const delay = BASE_DELAY_MS * Math.pow(2, retryCount.current);
    retryCount.current += 1;

    retryTimeout.current = setTimeout(() => {
      // Force a cache-bust so the browser actually re-requests
      setImgSrc(`${src}?retry=${retryCount.current}`);
    }, delay);
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
