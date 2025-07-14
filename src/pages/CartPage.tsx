
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Trash2, ShoppingCart, Plus, Minus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from cart`);
  };

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="btn-brand inline-flex items-center gap-2">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 hidden sm:flex">
            <div className="w-1/2">
              <h3 className="font-semibold">Product</h3>
            </div>
            <div className="w-1/4 text-center">
              <h3 className="font-semibold">Quantity</h3>
            </div>
            <div className="w-1/4 text-right">
              <h3 className="font-semibold">Price</h3>
            </div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="bg-white border rounded-lg p-4">
              {/* Mobile View */}
              <div className="sm:hidden space-y-4">
                <div className="flex gap-4">
                  <Link to={`/product/${item.id}`} className="w-20 h-20 bg-gray-100 rounded">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                  <div className="flex-grow">
                    <Link to={`/product/${item.id}`} className="font-medium hover:text-[hsl(var(--brand))]">
                      {item.name}
                    </Link>
                    <div className="text-lg font-semibold mt-1">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 hover:bg-gray-50"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      className="w-10 text-center py-1 focus:outline-none"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="px-2 py-1 hover:bg-gray-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="text-right font-medium">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:flex items-center">
                <div className="w-1/2 flex gap-4">
                  <Link to={`/product/${item.id}`} className="w-20 h-20 bg-gray-100 rounded">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                  <div>
                    <Link to={`/product/${item.id}`} className="font-medium hover:text-[hsl(var(--brand))]">
                      {item.name}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">
                      ${item.price.toFixed(2)} each
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm mt-2"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="w-1/4 flex justify-center">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 hover:bg-gray-50"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      className="w-10 text-center py-1 focus:outline-none"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="px-2 py-1 hover:bg-gray-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-1/4 text-right font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(totalPrice * 0.07).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.07).toFixed(2)}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="btn-brand w-full flex justify-center">
              Proceed to Checkout
            </Link>
            
            <div className="mt-4">
              <Link to="/products" className="text-[hsl(var(--brand))] hover:underline flex items-center justify-center gap-2">
                <ArrowRight size={14} className="rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
