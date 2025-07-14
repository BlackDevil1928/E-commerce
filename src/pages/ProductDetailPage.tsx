
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { 
  Star, 
  Check, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart,
  Share
} from "lucide-react";
import ProductGrid from "../components/ProductGrid";
import { toast } from "sonner";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  const product = getProductById(id!);
  const relatedProducts = getRelatedProducts(id!, 4);
  
  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-brand">
          Browse Products
        </Link>
      </div>
    );
  }
  
  const discountedPrice = product.discountPercentage
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price;
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.thumbnail,
      stock: product.stock,
    });
    toast.success(`${product.name} added to cart`);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToWishlist = () => {
    toast.success(`${product.name} added to wishlist`);
  };
  
  const handleShareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Product link copied to clipboard");
  };

  return (
    <div className="container py-12">
      <div className="mb-6">
        <nav className="flex text-sm">
          <Link to="/" className="text-gray-500 hover:text-[hsl(var(--brand))]">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-gray-500 hover:text-[hsl(var(--brand))]">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link
            to={`/category/${product.category.toLowerCase()}`}
            className="text-gray-500 hover:text-[hsl(var(--brand))]"
          >
            {product.category}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-[hsl(var(--brand))]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          {product.discountPercentage && (
            <span className="badge-discount inline-block mb-2">
              {product.discountPercentage.toFixed(0)}% OFF
            </span>
          )}
          
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={
                    index < Math.floor(product.rating)
                      ? "rating-star fill-current"
                      : "text-gray-300"
                  }
                  fill={index < Math.floor(product.rating) ? "currentColor" : "none"}
                />
              ))}
              <span className="ml-2">{product.rating.toFixed(1)}</span>
            </div>
            
            <span className="text-gray-500">|</span>
            
            <span className="text-gray-500">
              Brand: <span className="text-gray-900">{product.brand}</span>
            </span>
          </div>
          
          <div>
            {product.discountPercentage ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="text-gray-500 text-xl line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="border-t border-b py-4">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <Check size={18} className="text-green-500" />
                <span className="text-green-600 font-medium">
                  In Stock ({product.stock} available)
                </span>
              </>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
          
          {/* Features */}
          {product.features && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center border rounded-md">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="px-3 py-2 border-r hover:bg-gray-50 disabled:opacity-50"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                className="w-12 text-center py-2 focus:outline-none"
                value={quantity}
                readOnly
              />
              <button
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
                className="px-3 py-2 border-l hover:bg-gray-50 disabled:opacity-50"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-brand flex items-center gap-2 h-auto px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className="btn-outline h-auto px-6 py-3 flex items-center gap-2"
              >
                <Heart size={18} />
                Wishlist
              </button>
              
              <button
                onClick={handleShareProduct}
                className="btn-outline h-auto px-3 py-3"
              >
                <Share size={18} />
              </button>
            </div>
          </div>
          
          {/* Specifications */}
          {product.specifications && (
            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">Specifications:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="font-medium w-24 shrink-0">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.userName}</span>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < review.rating
                          ? "rating-star fill-current"
                          : "text-gray-300"
                      }
                      fill={index < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-8 border-t">
          <ProductGrid
            products={relatedProducts}
            title="Related Products"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
