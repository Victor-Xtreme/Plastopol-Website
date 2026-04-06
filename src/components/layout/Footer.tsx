'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Plastopol</h3>
            <p className="text-sm">Premium furniture solutions for modern spaces.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="hover:text-white transition">Products</a></li>
              <li><a href="/catalog" className="hover:text-white transition">Catalog</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-sm">Email: info@plastopol.com</p>
            <p className="text-sm">Phone: +91 XXXX XXXXX</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-center text-sm">&copy; 2024 Plastopol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}