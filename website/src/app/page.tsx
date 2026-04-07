import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Container } from '../components/layout/Container';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
import { getProducts } from '../features/products/getProducts';

export default function HomePage() {
  const allProducts = getProducts();
  const featuredProducts = allProducts.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <Container maxWidth="2xl">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold">
                Premium Chair Furniture
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Discover our collection of ergonomic, stylish, and durable chairs for any space
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Link href="/products">
                  <Button variant="secondary" size="lg">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <Container maxWidth="2xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Check out our most popular items</p>
            </div>

            <ProductGrid 
              products={featuredProducts}
              itemsPerRow={3}
            />

            <div className="text-center mt-12">
              <Link href="/products">
                <Button variant="primary" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Categories Section */}
        <section className="bg-gray-50 py-16">
          <Container maxWidth="2xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Browse by Category
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['office', 'dining', 'lounge', 'outdoor'].map((category) => (
                <Link key={category} href={`/products?category=${category}`}>
                  <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer text-center">
                    <h3 className="text-xl font-semibold text-gray-900 capitalize">
                      {category}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      Explore {category} furniture
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <Container maxWidth="2xl">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold">Ready to Find Your Perfect Chair?</h2>
              <p className="text-xl text-blue-100">
                Explore our complete collection of premium furniture
              </p>
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
