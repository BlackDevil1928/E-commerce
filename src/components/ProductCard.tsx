
import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  thumbnail: string;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  discountPercentage,
  rating,
  thumbnail,
  stock,
}) => {
  const { addItem } = useCart();
  
  const discountedPrice = discountPercentage
    ? price - (price * discountPercentage) / 100
    : price;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price: discountedPrice,
      image: thumbnail,
      stock,
    });
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="product-card group h-full flex flex-col">
        <div className="relative">
          <img
            src={thumbnail}
            alt={name}
            className="product-card-img"
          />
          {discountPercentage && (
            <span className="badge-discount absolute top-2 right-2">
              -{discountPercentage.toFixed(0)}%
            </span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[hsl(var(--brand))] transition-colors">
              {name}
            </h3>
          </div>
          
          <div className="flex items-center gap-1 mb-2">
            <Star className="rating-star" size={16} fill="currentColor" />
            <span>{rating.toFixed(1)}</span>
          </div>
          
          <div className="mt-auto flex items-end justify-between">
            <div>
              {discountPercentage ? (
                <div className="flex flex-col">
                  <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold">${price.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-outline p-2 h-auto hover:text-[hsl(var(--brand))] hover:border-[hsl(var(--brand))]"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
