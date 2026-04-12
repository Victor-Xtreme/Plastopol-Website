'use client';

import React from 'react';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { ProductImage } from '../ui/ProductImage';

interface ProductDetailsProps {
  readonly product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Images */}
      <div className="space-y-4">
        <div className="product-detail-bg rounded-lg overflow-hidden h-96">
          <ProductImage
            src={`/products/${product.images[0] || product.thumbnail}`}
            alt={product.modelName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, idx) => (
            <div key={idx} className="product-detail-bg rounded-lg overflow-hidden h-20">
              <ProductImage
                src={`/products/${image}`}
                alt={`${product.modelName} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold product-title mb-2">{product.modelName}</h1>
          <p className="product-desc">{product.description}</p>
        </div>

        <div>
          {product.inStock ? (
            <Badge variant="success" size="md">In Stock</Badge>
          ) : (
            <Badge variant="danger" size="md">Out of Stock</Badge>
          )}
          <p className="product-desc text-sm mt-2">Lead time: {product.leadTime}</p>
        </div>

        {product.colors.length > 0 && (
          <div className="border-t border-b product-detail-border py-6">
            <h3 className="font-semibold mb-3" style={{ color: 'inherit' }}>Available Colors</h3>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="px-4 py-2 rounded-lg border product-color-btn capitalize text-sm select-none"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <button className="product-enquiry-btn">Make an Enquiry</button>
        </div>

        {product.features.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'inherit' }}>Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="product-accent font-bold mt-1">✓</span>
                  <span className="product-desc">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
