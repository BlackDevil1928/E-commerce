
import React, { useState, useEffect } from 'react';
import { products, getCategories, getBrands } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['All', ...getCategories()];
  const brands = getBrands();
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Price range filter
    result = result.filter(product => {
      const finalPrice = product.discountPercentage 
        ? product.price - (product.price * product.discountPercentage / 100) 
        : product.price;
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });
    
    // Rating filter
    if (minRating > 0) {
      result = result.filter(product => product.rating >= minRating);
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, minRating]);
  
  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setMinRating(0);
  };
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Button */}
        <button 
          className="md:hidden btn-outline flex items-center gap-2 mb-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {/* Filters Sidebar */}
        <div className={`md:w-64 shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center justify-between md:hidden">
            <h3 className="font-semibold">Filters</h3>
            <button 
              onClick={() => setShowFilters(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pr-8 border rounded-md"
              />
              <Search size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category}`}>{category}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Brands</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="mr-2"
                  />
                  <label htmlFor={`brand-${brand}`}>{brand}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${minRating >= rating ? 'bg-[hsl(var(--star-rating))] text-white' : 'bg-gray-200'}`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleClearFilters}
            className="btn-outline w-full"
          >
            Clear All Filters
          </button>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <span className="text-gray-500">{filteredProducts.length} products</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-500">Sort by:</span>
              <div className="relative">
                <select className="appearance-none border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--brand))]">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Highest Rated</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <ProductGrid products={filteredProducts} />
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
              <button
                onClick={handleClearFilters}
                className="btn-brand mt-4"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
