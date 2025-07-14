
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { getCategories } from "../data/products";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  LogIn,
  Package
} from "lucide-react";

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const categories = getCategories();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleCategoriesMenu = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[hsl(var(--brand))]">
            ShopEase
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="hover:text-[hsl(var(--brand))] transition-colors">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={toggleCategoriesMenu}
                className="hover:text-[hsl(var(--brand))] transition-colors flex items-center gap-1"
              >
                Categories
              </button>
              {showCategoriesMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-10">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowCategoriesMenu(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/products" className="hover:text-[hsl(var(--brand))] transition-colors">
              All Products
            </Link>
          </nav>

          {/* Search, Cart, User Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/search" className="p-2 hover:text-[hsl(var(--brand))] transition-colors">
              <Search size={20} />
            </Link>
            <Link to="/cart" className="p-2 hover:text-[hsl(var(--brand))] transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[hsl(var(--brand))] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center gap-2 hover:text-[hsl(var(--brand))] transition-colors"
                >
                  <User size={20} />
                  <span className="text-sm">{user?.name}</span>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Orders
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-outline flex items-center gap-1">
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-t py-4">
          <div className="container space-y-4">
            <div className="flex items-center justify-between border rounded-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 focus:outline-none"
              />
              <button className="p-2">
                <Search size={20} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="hover:text-[hsl(var(--brand))] transition-colors"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <button
                onClick={toggleCategoriesMenu}
                className="text-left hover:text-[hsl(var(--brand))] transition-colors flex items-center gap-1"
              >
                Categories
              </button>
              {showCategoriesMenu && (
                <div className="pl-4 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}`}
                      className="block hover:text-[hsl(var(--brand))] transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
              <Link 
                to="/products" 
                className="hover:text-[hsl(var(--brand))] transition-colors"
                onClick={toggleMobileMenu}
              >
                All Products
              </Link>
              <Link 
                to="/cart" 
                className="hover:text-[hsl(var(--brand))] transition-colors flex items-center gap-2"
                onClick={toggleMobileMenu}
              >
                <ShoppingCart size={20} />
                Cart 
                {totalItems > 0 && (
                  <span className="bg-[hsl(var(--brand))] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="hover:text-[hsl(var(--brand))] transition-colors flex items-center gap-2"
                    onClick={toggleMobileMenu}
                  >
                    <User size={20} />
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="hover:text-[hsl(var(--brand))] transition-colors flex items-center gap-2"
                    onClick={toggleMobileMenu}
                  >
                    <Package size={20} />
                    My Orders
                  </Link>
                  {user?.role === "admin" && (
                    <Link 
                      to="/admin" 
                      className="hover:text-[hsl(var(--brand))] transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}
                    className="text-left text-red-600 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="btn-brand"
                  onClick={toggleMobileMenu}
                >
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
