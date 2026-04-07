import React from 'react';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { getProductBySlug } from '@/features/products/getProductsBySlug';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Container maxWidth="2xl" className="py-12">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-600">
            <a href="/products" className="hover:text-blue-600 transition">Products</a>
            {' > '}
            <span>{product.modelName}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left: Images */}
            <div>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Product Image</div>
                  <div className="text-sm text-gray-500">{product.thumbnail}</div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {product.modelName}
                </h1>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Pricing */}
              <div className="border-t border-b border-gray-200 py-6">
                <h3 className="font-semibold text-gray-900 mb-3">Pricing</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Recycled (REP):</span>
                    <span className="font-bold">₹{product.pricing.rep.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Semi-Virgin:</span>
                    <span className="font-bold">₹{product.pricing.semi.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Virgin:</span>
                    <span className="font-bold">₹{product.pricing.virgin.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <p className="text-gray-600 text-sm mt-2">Lead time: {product.leadTime}</p>
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Available Colors</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className="px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-blue-600 capitalize"
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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

          {/* Specifications */}
          {product.specifications.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specifications.map((spec, idx) => (
                  <div key={idx}>
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
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
