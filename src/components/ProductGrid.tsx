
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../data/products";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No products found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              discountPercentage={product.discountPercentage}
              rating={product.rating}
              thumbnail={product.thumbnail}
              stock={product.stock}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
