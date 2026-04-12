'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset all elements to hidden on route change, then re-observe
    const targets = document.querySelectorAll<Element>('.animate-on-scroll');
    targets.forEach((el) => el.classList.remove('is-visible'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
