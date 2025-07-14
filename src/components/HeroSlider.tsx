
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SlideProps {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  position?: "center" | "left" | "right";
  darkOverlay?: boolean;
}

const slides: SlideProps[] = [
  {
    image: "https://images.unsplash.com/photo-1607082351323-de2784d1cdb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "New Season Arrivals",
    subtitle: "Check out our latest collection of premium products",
    ctaText: "Shop Now",
    ctaLink: "/products",
    position: "center",
    darkOverlay: true,
  },
  {
    image: "https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Tech Essentials",
    subtitle: "Upgrade your gadgets with the latest technology",
    ctaText: "Discover Electronics",
    ctaLink: "/category/electronics",
    position: "left",
  },
  {
    image: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    title: "Summer Sale",
    subtitle: "Up to 40% off on selected items",
    ctaText: "View Deals",
    ctaLink: "/sale",
    position: "right",
    darkOverlay: true,
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  // Helper for positioning content
  const getPositionClasses = (position: string = "center") => {
    switch (position) {
      case "left": return "justify-start text-left";
      case "right": return "justify-end text-right";
      default: return "justify-center text-center";
    }
  };

  const positionClasses = getPositionClasses(currentSlideData.position);

  return (
    <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
          
          {/* Optional dark overlay */}
          {slide.darkOverlay && (
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          )}
          
          <div className={`container relative h-full flex items-center ${getPositionClasses(slide.position)}`}>
            <div className="max-w-xl px-6 py-12 lg:py-16 rounded-lg">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-xl text-white mb-8 drop-shadow-md">
                {slide.subtitle}
              </p>
              <Link
                to={slide.ctaLink}
                className="btn-brand flex w-fit items-center gap-2"
              >
                {slide.ctaText}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/40"
            } transition-all`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
