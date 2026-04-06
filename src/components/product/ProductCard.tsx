'use client';

import Link from 'next/link';
import React from 'react';
import { Product } from '../../types';
import { formatPrice } from '../../lib/formatPrice';
import { Badge } from '../ui/Badge';

interface ProductCardProps {
  readonly product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = `/products/${product.thumbnail}`;
  const priceDisplay = formatPrice(product.pricing.rep);
  const isSoldOut = !product.inStock;

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group cursor-pointer h-full">
        {/* Image Container */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden h-64 mb-4">
          <img
            src={imageUrl}
            alt={product.modelName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.png';
            }}
          />

          {/* Stock Badge */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Badge variant="danger" size="md">
                Out of Stock
              </Badge>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="info" size="sm">
              {product.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
            {product.modelName}
          </h3>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Price */}
          <p className="text-xl font-bold text-blue-600 mt-3">
            {priceDisplay}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>

          {/* Lead Time */}
          <p className="text-gray-500 text-xs mt-3">
            Lead time: {product.leadTime}
          </p>
        </div>
      </div>
    </Link>
  );
}