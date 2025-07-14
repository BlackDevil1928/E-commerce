
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopEase</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/electronics" className="text-gray-300 hover:text-white transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/category/clothing" className="text-gray-300 hover:text-white transition-colors">Clothing</Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-300 hover:text-white transition-colors">Accessories</Link>
              </li>
              <li>
                <Link to="/category/home-office" className="text-gray-300 hover:text-white transition-colors">Home & Office</Link>
              </li>
              <li>
                <Link to="/category/kitchen-dining" className="text-gray-300 hover:text-white transition-colors">Kitchen & Dining</Link>
              </li>
              <li>
                <Link to="/category/beauty-personal-care" className="text-gray-300 hover:text-white transition-colors">Beauty & Personal Care</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 mt-1" size={18} />
                <span className="text-gray-300">
                  123 Commerce Street, Shopping District, City, Country
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <span className="text-gray-300">support@shopease.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Copyright */}
        <div className="border-t border-gray-700 pt-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Subscribe to our newsletter</h4>
              <p className="text-gray-300 mb-4">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
              />
              <button className="bg-[hsl(var(--brand))] text-white px-4 py-2 rounded-r-md hover:bg-[hsl(var(--brand))/90] transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm pt-4 border-t border-gray-800">
            <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
            <p className="mt-2">
              <span>
                Designed and built with ♥ for e-commerce entrepreneurs
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
