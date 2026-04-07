'use client';

import React, { useState } from 'react';
import { Product } from '../../types';
import { formatPrice } from '../../lib/formatPrice';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ProductDetailsProps {
  readonly product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedPricingTier, setSelectedPricingTier] = useState<'rep' | 'semi' | 'virgin'>('rep');

  const pricingTiers = {
    rep: { label: 'Recycled (REP)', price: product.pricing.rep },
    semi: { label: 'Semi-Virgin (SEMI)', price: product.pricing.semi },
    virgin: { label: 'Virgin', price: product.pricing.virgin },
  };

  const currentPrice = pricingTiers[selectedPricingTier].price;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Images */}
      <div className="space-y-4">
        <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
          <img
            src={`/products/${product.images[0] || product.thumbnail}`}
            alt={product.modelName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.png';
            }}
          />
        </div>
        {/* Thumbnail Carousel */}
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, idx) => (
            <div key={idx} className="bg-gray-100 rounded-lg overflow-hidden h-20 cursor-pointer hover:ring-2 hover:ring-blue-500">
              <img
                src={`/products/${image}`}
                alt={`${product.modelName} ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.png';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {product.modelName}
          </h1>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Stock Status */}
        <div>
          {product.inStock ? (
            <Badge variant="success" size="md">In Stock</Badge>
          ) : (
            <Badge variant="danger" size="md">Out of Stock</Badge>
          )}
          <p className="text-gray-600 text-sm mt-2">Lead time: {product.leadTime}</p>
        </div>

        {/* Pricing Tiers */}
        <div className="border-t border-b border-gray-200 py-6 space-y-3">
          <h3 className="font-semibold text-gray-900">Pricing Tier</h3>
          <div className="space-y-2">
            {(Object.entries(pricingTiers) as Array<[keyof typeof pricingTiers, typeof pricingTiers['rep']]>).map(([tier, details]) => (
              <button
                key={tier}
                onClick={() => setSelectedPricingTier(tier)}
                className={`w-full p-3 border-2 rounded-lg text-left transition ${
                  selectedPricingTier === tier
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{details.label}</span>
                  <span className="font-bold text-blue-600">{formatPrice(details.price)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Display */}
        <div>
          <p className="text-gray-600 text-sm mb-2">Current Price:</p>
          <p className="text-4xl font-bold text-blue-600">
            {formatPrice(currentPrice)}
          </p>
        </div>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="border-t border-b border-gray-200 py-6">
            <h3 className="font-semibold text-gray-900 mb-3">Available Colors</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border-2 transition ${
                    selectedColor === color
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="capitalize">{color}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            size="lg" 
            className="flex-1"
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            Inquiry
          </Button>
        </div>

        {/* Features */}
        {product.features.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}