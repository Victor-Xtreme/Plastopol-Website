// src/app/products/page.tsx

import { getProducts } from "../../features/products/getProducts";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <img
              src={`/products/${product.thumbnail}`}
              alt={product.modelName}
              className="w-full h-48 object-cover mb-3 rounded"
            />

            <h2 className="text-lg font-medium">
              {product.modelName}
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              {product.description}
            </p>

            <p className="font-semibold">
              ₹{product.pricing.rep}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}