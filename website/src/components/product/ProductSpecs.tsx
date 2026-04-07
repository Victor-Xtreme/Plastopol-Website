'use client';

import React from 'react';
import { Product } from '../../types';

interface ProductSpecsProps {
  readonly product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  if (product.specifications.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.specifications.map((spec, idx) => (
          <div key={idx} className="space-y-1">
            <dt className="text-sm font-semibold text-gray-600 uppercase">
              {spec.key}
            </dt>
            <dd className="text-base text-gray-900">
              {spec.value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}