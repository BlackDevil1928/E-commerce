
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryBannerProps {
  title: string;
  description: string;
  image: string;
  link: string;
  cta?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  title,
  description,
  image,
  link,
  cta = "Shop Now"
}) => {
  return (
    <div className="relative overflow-hidden group rounded-lg h-full">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70"></div>
      
      <div className="relative p-6 flex flex-col h-full justify-end">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        <Link
          to={link}
          className="text-white flex items-center justify-between bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full w-fit transition-all duration-300"
        >
          <span>{cta}</span>
          <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>
    </div>
  );
};

export default CategoryBanner;
