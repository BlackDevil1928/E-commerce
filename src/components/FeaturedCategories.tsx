
import React from 'react';
import CategoryBanner from './CategoryBanner';

const FeaturedCategories: React.FC = () => {
  const categories = [
    {
      title: "Electronics",
      description: "Latest gadgets and tech essentials",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1201&q=80",
      link: "/category/electronics"
    },
    {
      title: "Clothing",
      description: "Stylish apparel for every occasion",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80",
      link: "/category/clothing"
    },
    {
      title: "Accessories",
      description: "Complete your look with premium accessories",
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      link: "/category/accessories"
    }
  ];

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="aspect-square md:aspect-auto md:h-80">
              <CategoryBanner {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
