'use client';

import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  readonly products: Product[];
  readonly isEmpty?: boolean;
  readonly emptyMessage?: string;
  readonly itemsPerRow?: 1 | 2 | 3 | 4;
}

export function ProductGrid({
  products,
  isEmpty = false,
  emptyMessage = 'No products found',
  itemsPerRow = 3,
}: ProductGridProps) {
  const gridColsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  if (isEmpty || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridColsMap[itemsPerRow]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}