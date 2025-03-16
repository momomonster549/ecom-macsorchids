import { Product, ProductFilter } from '../types/product';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Phalaenopsis Orchid - Pink Blush',
    description: 'A stunning pink Phalaenopsis orchid with delicate blooms that last for months. Perfect for beginners and experienced growers alike.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1589393922695-ef4c2f9deb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    category: 'Phalaenopsis',
    inStock: true,
    rating: 4.8,
    difficulty: 'Beginner',
    bloomingSeason: 'Year-round',
    isFragrant: false,
    featured: true,
    isNew: false,
    careInstructions: {
      light: 'Bright, indirect light. Avoid direct sunlight which can burn leaves.',
      watering: 'Water thoroughly when the growing medium is nearly dry. Typically once a week in summer, less in winter.',
      temperature: 'Prefers temperatures between 65-80°F (18-27°C) during the day and slightly cooler at night.',
      humidity: 'Enjoys humidity of 50-70%. Consider using a humidifier or humidity tray.',
      fertilizer: 'Feed with a balanced orchid fertilizer diluted to half strength every 2 weeks during growing season.',
      repotting: 'Repot every 1-2 years or when the growing medium breaks down.',
      additionalNotes: 'Remove spent flower spikes at the base or cut just above a node to encourage reblooming.'
    },
    features: [
      'Long-lasting blooms (up to 3 months)',
      'Elegant arching flower spike',
      'Comes in decorative ceramic pot',
      'Includes care guide'
    ],
    specifications: {
      'Plant Height': '18-24 inches (including pot)',
      'Pot Size': '5 inches',
      'Bloom Size': '3-4 inches',
      'Fragrance': 'None',
      'Light Needs': 'Medium',
      'Water Needs': 'Low'
    }
  },
  {
    id: '2',
    name: 'Cattleya Orchid - Royal Purple',
    description: 'A magnificent Cattleya with vibrant purple blooms and intoxicating fragrance. The queen of orchids for the discerning collector.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1589393922695-ef4c2f9deb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    category: 'Cattleya',
    inStock: true,
    rating: 4.9,
    difficulty: 'Intermediate',
    bloomingSeason: 'Spring',
    isFragrant: true,
    featured: true,
    isNew: false,
    careInstructions: {
      light: 'Bright light with some direct morning sun. Protect from intense afternoon sun.',
      watering: 'Allow to dry slightly between waterings. Water thoroughly when medium is approaching dryness.',
      temperature: 'Prefers temperatures of 70-85°F (21-29°C) during the day and 55-65°F (13-18°C) at night.',
      humidity: 'Requires 50-70% humidity. Use humidity trays or room humidifiers.',
      fertilizer: 'Feed weekly with a balanced orchid fertilizer at 1/4 to 1/2 strength.',
      repotting: 'Repot every 2-3 years when new growth starts, usually after blooming.',
      additionalNotes: 'Provide good air circulation to prevent fungal issues.'
    },
    features: [
      'Intensely fragrant blooms',
      'Vibrant royal purple color',
      'Large, showy flowers (5-7 inches)',
      'Blooms last 2-3 weeks',
      'Mounted on natural cork bark'
    ],
    specifications: {
      'Plant Height': '12-18 inches',
      'Mount Size': '8 x 10 inches',
      'Bloom Size': '5-7 inches',
      'Fragrance': 'Strong, sweet',
      'Light Needs': 'High',
      'Water Needs': 'Medium'
    }
  },
  {
    id: '3',
    name: 'Dendrobium Orchid - Sunshine',
    description: 'A cheerful yellow Dendrobium with multiple flower spikes and abundant blooms. Brings a touch of sunshine to any space.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1589393922695-ef4c2f9deb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Dendrobium',
    inStock: true,
    rating: 4.7,
    difficulty: 'Intermediate',
    bloomingSeason: 'Summer',
    isFragrant: true,
    featured: false,
    isNew: true,
    careInstructions: {
      light: 'Bright light with some direct morning sun. Protect from intense afternoon sun.',
      watering: 'Water thoroughly when the growing medium is nearly dry. Reduce watering in winter.',
      temperature: 'Prefers temperatures of 70-85°F (21-29°C) during the day and 60-65°F (15-18°C) at night.',
      humidity: 'Prefers 50-70% humidity. Mist occasionally during dry periods.',
      fertilizer: 'Feed weekly with a balanced orchid fertilizer at 1/4 strength during growing season.',
      repotting: 'Repot every 2 years or when the medium breaks down.',
      additionalNotes: 'Requires a distinct dry, cool rest period in winter to initiate blooming.'
    }
  },
  {
    id: '4',
    name: 'Vanda Orchid - Blue Magic',
    description: 'A spectacular blue Vanda with large, flat flowers and intense color. A true showstopper for the experienced grower.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1589393922695-ef4c2f9deb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Vanda',
    inStock: false,
    rating: 4.9,
    difficulty: 'Advanced',
    bloomingSeason: 'Summer',
    isFragrant: true,
    featured: false,
    isNew: false
  },
  {
    id: '5',
    name: 'Oncidium Orchid - Dancing Lady',
    description: 'Charming yellow and brown flowers resembling dancing ladies. Produces sprays of numerous small blooms.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Oncidium',
    inStock: true,
    rating: 4.6,
    difficulty: 'Intermediate',
    bloomingSeason: 'Fall',
    isFragrant: false,
    featured: false,
    isNew: true
  },
  {
    id: '6',
    name: 'Premium Orchid Potting Mix',
    description: 'Specially formulated mix for healthy orchid growth. Contains bark, charcoal, and sphagnum moss for optimal drainage and aeration.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1622467827417-bbe6542801eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Supplies',
    subcategory: 'Growing Media',
    inStock: true,
    rating: 4.8,
    featured: false,
    isNew: false
  },
  {
    id: '7',
    name: 'Orchid Fertilizer - Bloom Booster',
    description: 'Specialized fertilizer formulated to encourage abundant blooming in all orchid varieties.',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1622467827417-bbe6542801eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Supplies',
    subcategory: 'Fertilizers',
    inStock: true,
    rating: 4.7,
    featured: false,
    isNew: false
  },
  {
    id: '8',
    name: 'Orchid Gift Set - Beginner\'s Collection',
    description: 'Perfect gift for the aspiring orchid enthusiast. Includes a Phalaenopsis orchid, care guide, and essential supplies.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Gifts',
    inStock: true,
    rating: 4.9,
    featured: true,
    isNew: true
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all products with optional filtering
export const getProducts = async (filters?: ProductFilter): Promise<Product[]> => {
  await delay(500); // Simulate network delay
  
  let filteredProducts = [...mockProducts];
  
  if (filters) {
    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === filters.category
      );
    }
    
    // Apply subcategory filter
    if (filters.subcategory) {
      filteredProducts = filteredProducts.filter(product => 
        product.subcategory === filters.subcategory
      );
    }
    
    // Apply price range filters
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= filters.minPrice!
      );
    }
    
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= filters.maxPrice!
      );
    }
    
    // Apply in-stock filter
    if (filters.inStockOnly) {
      filteredProducts = filteredProducts.filter(product => 
        product.inStock
      );
    }
    
    // Apply difficulty filter
    if (filters.difficulty) {
      filteredProducts = filteredProducts.filter(product => 
        product.difficulty === filters.difficulty
      );
    }
    
    // Apply blooming season filter
    if (filters.bloomingSeason) {
      filteredProducts = filteredProducts.filter(product => 
        product.bloomingSeason === filters.bloomingSeason
      );
    }
    
    // Apply fragrance filter
    if (filters.isFragrant !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.isFragrant === filters.isFragrant
      );
    }
    
    // Apply featured filter
    if (filters.featured) {
      filteredProducts = filteredProducts.filter(product => 
        product.featured === true
      );
    }
    
    // Apply new arrivals filter
    if (filters.isNew) {
      filteredProducts = filteredProducts.filter(product => 
        product.isNew === true
      );
    }
    
    // Apply limit
    if (filters.limit) {
      filteredProducts = filteredProducts.slice(0, filters.limit);
    }
  }
  
  return filteredProducts;
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  await delay(300); // Simulate network delay
  
  const product = mockProducts.find(p => p.id === id);
  return product || null;
};

// Get related products (excluding the current product)
export const getRelatedProducts = async (currentProductId: string): Promise<Product[]> => {
  await delay(400); // Simulate network delay
  
  const currentProduct = mockProducts.find(p => p.id === currentProductId);
  
  if (!currentProduct) {
    return [];
  }
  
  // Find products in the same category, excluding the current product
  let relatedProducts = mockProducts.filter(p => 
    p.id !== currentProductId && 
    p.category === currentProduct.category
  );
  
  // If not enough related products in the same category, add some featured products
  if (relatedProducts.length < 4) {
    const featuredProducts = mockProducts.filter(p => 
      p.id !== currentProductId && 
      p.category !== currentProduct.category &&
      p.featured
    );
    
    relatedProducts = [...relatedProducts, ...featuredProducts];
  }
  
  // Return up to 4 related products
  return relatedProducts.slice(0, 4);
};

// Get product categories
export const getProductCategories = async (): Promise<string[]> => {
  await delay(200); // Simulate network delay
  
  const categories = mockProducts
    .map(product => product.category)
    .filter((category, index, self) => 
      category && self.indexOf(category) === index
    ) as string[];
  
  return categories;
};

// Get product subcategories for a specific category
export const getProductSubcategories = async (category: string): Promise<string[]> => {
  await delay(200); // Simulate network delay
  
  const subcategories = mockProducts
    .filter(product => product.category === category)
    .map(product => product.subcategory)
    .filter((subcategory, index, self) => 
      subcategory && self.indexOf(subcategory) === index
    ) as string[];
  
  return subcategories;
};

// Mock review type
interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userName: 'Jane S.',
    rating: 5,
    title: 'Beautiful and long-lasting',
    comment: 'This Phalaenopsis has been blooming for over 3 months now. The flowers are gorgeous and the plant arrived in perfect condition.',
    date: '2023-05-15'
  },
  {
    id: 'r2',
    productId: '1',
    userName: 'Michael T.',
    rating: 4,
    title: 'Great for beginners',
    comment: 'As a first-time orchid owner, I found this plant easy to care for. The care instructions were very helpful.',
    date: '2023-04-22'
  },
  {
    id: 'r3',
    productId: '2',
    userName: 'Orchid Enthusiast',
    rating: 5,
    title: 'Stunning fragrance',
    comment: 'The fragrance of this Cattleya fills the entire room. Absolutely worth the price for such a spectacular specimen.',
    date: '2023-06-10'
  }
];

// Get reviews for a product
export const getProductReviews = async (productId: string): Promise<Review[]> => {
  await delay(300); // Simulate network delay
  
  return mockReviews.filter(review => review.productId === productId);
};
