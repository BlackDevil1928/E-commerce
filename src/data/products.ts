
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  features?: string[];
  specifications?: Record<string, string>;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock products data
export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day listening.",
    price: 249.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 45,
    brand: "AudioTech",
    category: "Electronics",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80"
    ],
    features: [
      "Active Noise Cancellation",
      "30-Hour Battery Life",
      "Bluetooth 5.2",
      "Premium Audio Drivers",
      "Voice Assistant Support"
    ],
    specifications: {
      "Battery": "30 hours",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "250g",
      "Color": "Matte Black",
      "Warranty": "2 Years"
    },
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "John Smith",
        rating: 5,
        comment: "Best headphones I've ever owned! The sound quality is amazing and the noise cancellation works perfectly.",
        date: "2023-11-15"
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Sarah Johnson",
        rating: 4,
        comment: "Very comfortable and great sound. The only drawback is they're a bit heavy for long sessions.",
        date: "2023-10-28"
      }
    ]
  },
  {
    id: "2",
    name: "Slim Fit T-shirt",
    description: "A comfortable slim-fit t-shirt made from 100% organic cotton. Perfect for everyday wear with a modern cut and soft feel.",
    price: 24.99,
    rating: 4.2,
    stock: 120,
    brand: "Urban Styles",
    category: "Clothing",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      "https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    ],
    features: [
      "100% Organic Cotton",
      "Machine Washable",
      "Pre-Shrunk",
      "Modern Slim Fit"
    ],
    specifications: {
      "Material": "100% Organic Cotton",
      "Care": "Machine Wash Cold",
      "Origin": "Made in Portugal",
      "Fit": "Slim Fit"
    }
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smart watch. Featuring heart rate monitoring, sleep tracking, and water resistance up to 50m.",
    price: 199.99,
    discountPercentage: 15,
    rating: 4.7,
    stock: 35,
    brand: "TechFit",
    category: "Electronics",
    thumbnail: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
      "https://images.unsplash.com/photo-1623500910423-7753554a6e2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    features: [
      "Heart Rate Monitor",
      "Sleep Tracking",
      "50m Water Resistance",
      "7-Day Battery Life",
      "Smartphone Notifications"
    ],
    specifications: {
      "Battery": "7 days",
      "Water Resistance": "50m",
      "Display": "1.4\" AMOLED",
      "Connectivity": "Bluetooth 5.0, WiFi",
      "Sensors": "Heart Rate, Accelerometer, GPS"
    }
  },
  {
    id: "4",
    name: "Leather Crossbody Bag",
    description: "Elegantly designed leather crossbody bag with multiple compartments. Perfect size for daily essentials with a secure zipper closure.",
    price: 89.99,
    rating: 4.4,
    stock: 28,
    brand: "LuxLeather",
    category: "Accessories",
    thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80"
    ]
  },
  {
    id: "5",
    name: "Professional DSLR Camera",
    description: "Capture stunning photos and 4K video with this professional-grade DSLR camera. Includes a versatile 18-135mm zoom lens.",
    price: 1499.99,
    discountPercentage: 8,
    rating: 4.9,
    stock: 12,
    brand: "FotoMaster",
    category: "Electronics",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ]
  },
  {
    id: "6",
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness levels, flexible neck, and touch controls. Energy efficient and sleek design.",
    price: 59.99,
    rating: 4.3,
    stock: 50,
    brand: "HomeLight",
    category: "Home & Office",
    thumbnail: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1534189724373-e314a310a470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
    ]
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks hot for 12 hours or cold for 24 hours with this vacuum insulated water bottle. Made from high-grade stainless steel with a leak-proof cap.",
    price: 29.99,
    rating: 4.6,
    stock: 100,
    brand: "HydroLife",
    category: "Kitchen & Dining",
    thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    ]
  },
  {
    id: "8",
    name: "Organic Skincare Set",
    description: "A complete skincare routine with all-natural, organic ingredients. Includes facial cleanser, toner, moisturizer, and eye cream in eco-friendly packaging.",
    price: 79.99,
    discountPercentage: 5,
    rating: 4.8,
    stock: 30,
    brand: "PureGlow",
    category: "Beauty & Personal Care",
    thumbnail: "https://images.unsplash.com/photo-1570194065650-d99fb4a8ae65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4a8ae65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    ]
  }
];

// Helper function to get categories from products
export const getCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};

// Helper function to get brands from products
export const getBrands = (): string[] => {
  const brands = new Set(products.map(product => product.brand));
  return Array.from(brands);
};

// Helper function to get a product by id
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Helper function to get featured products (with discount or high rating)
export const getFeaturedProducts = (limit = 4): Product[] => {
  return products
    .filter(product => product.discountPercentage || product.rating >= 4.5)
    .slice(0, limit);
};

// Helper function to get related products (same category but different id)
export const getRelatedProducts = (id: string, limit = 4): Product[] => {
  const currentProduct = getProductById(id);
  if (!currentProduct) return [];
  
  return products
    .filter(product => product.category === currentProduct.category && product.id !== id)
    .slice(0, limit);
};
