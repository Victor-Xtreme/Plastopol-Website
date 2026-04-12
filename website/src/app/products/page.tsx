import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/layout/Container';
import { ProductGrid } from '../../components/product/ProductGrid';
import { getProducts } from '../../features/products/getProducts';

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100">
      <Navbar dark />

      <main className="flex-1">
        {/* Page header with brown gradient */}
        <section className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-950 py-16 border-b border-stone-800">
          <Container maxWidth="2xl">
            <div className="space-y-3">
              <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
                Collection
              </p>
              <h1 className="text-5xl font-bold text-stone-100">All Products</h1>
              <p className="text-stone-400 text-lg">
                Browse our complete range of premium plastic chairs
              </p>
            </div>
          </Container>
        </section>

        {/* Grid */}
        <section className="py-16">
          <Container maxWidth="2xl">
            <ProductGrid
              products={products}
              itemsPerRow={3}
              emptyMessage="No products available"
              dark
            />
          </Container>
        </section>
      </main>

      <Footer dark />
    </div>
  );
}
