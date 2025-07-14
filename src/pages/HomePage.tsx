
import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';
import { getFeaturedProducts } from '../data/products';
import FeaturedCategories from '../components/FeaturedCategories';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts(8);
  
  return (
    <div>
      <HeroSlider />
      
      <FeaturedCategories />
      
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="btn-outline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Shop with Us</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--brand))] text-white flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-xl">Quality Products</h3>
                    <p className="text-gray-600">We curate only the best products that meet our high standards.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--brand))] text-white flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-xl">Fast Shipping</h3>
                    <p className="text-gray-600">Get your order delivered to your doorstep in record time.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--brand))] text-white flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-xl">Secure Payments</h3>
                    <p className="text-gray-600">Shop with confidence with our secure payment methods.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--brand))] text-white flex items-center justify-center shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-xl">Excellent Support</h3>
                    <p className="text-gray-600">Our customer support team is always ready to help.</p>
                  </div>
                </div>
              </div>
              
              <Link to="/about" className="btn-brand mt-6 inline-flex">
                Learn More About Us
              </Link>
            </div>
            
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                alt="Customer shopping experience" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-[hsl(var(--brand))] text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-6">Stay updated with our latest products and deals. Subscribe to our newsletter.</p>
            
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
              />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
