import React from 'react';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { ProductDetails } from '@/components/product/ProductDetails';
import { getProductBySlug } from '@/features/products/getProductsBySlug';

import '@/styles/categories/office.css';
import '@/styles/categories/dining.css';
import '@/styles/categories/lounge.css';
import '@/styles/categories/outdoor.css';
import '@/styles/categories/other.css';

export default function ProductPage() {
  const product = getProductBySlug('ergo-comfort-chair');

  if (!product) notFound();

  return (
    <div data-category={product.category}>
      <Navbar dark />

      <main className="product-page min-h-screen">
        {/* Page header */}
        <section className="product-page-header py-12">
          <Container maxWidth="2xl">
            <div className="space-y-2 animate-page-enter">
              <p className="category-label text-sm font-semibold uppercase tracking-widest">
                {product.category}
              </p>
              <nav className="text-sm product-desc">
                <a href="/products" className="hover:underline">Products</a>
                {' › '}
                <span>{product.modelName}</span>
              </nav>
            </div>
          </Container>
        </section>

        {/* Product Details */}
        <section className="py-12 animate-on-scroll">
          <Container maxWidth="2xl">
            <ProductDetails product={product} />
          </Container>
        </section>

        {/* Specifications */}
        {product.specifications.length > 0 && (
          <section className="py-12 animate-on-scroll">
            <Container maxWidth="2xl">
              <div className="product-spec-bg">
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'inherit' }}>Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="animate-on-scroll">
                      <dt className="product-spec-key">{spec.key}</dt>
                      <dd className="product-spec-val mt-1">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer dark />
    </div>
  );
}
