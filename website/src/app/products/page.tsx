import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/layout/Container';
import { ProductGrid } from '../../components/product/ProductGrid';
import { getProducts } from '../../features/products/getProducts';
export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Container maxWidth="2xl" className="py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Browse our complete collection of premium furniture</p>
          </div>

          <ProductGrid 
            products={products}
            itemsPerRow={3}
            emptyMessage="No products available"
          />
        </Container>
      </main>

      <Footer />
    </div>
  );
}