export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  images?: string[];
  category?: string;
  subcategory?: string;
  inStock: boolean;
  rating: number;
  reviewCount?: number;
  stockCount?: number;
  discount?: number;
  freeShipping?: boolean;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  bloomingSeason?: 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'Year-round';
  isFragrant?: boolean;
  featured?: boolean;
  isNew?: boolean;
  variants?: ProductVariant[];
  careInstructions?: {
    light: string;
    watering: string;
    temperature: string;
    humidity?: string;
    fertilizer?: string;
    repotting?: string;
    additionalNotes?: string;
  };
  features?: string[];
  specifications?: Record<string, string>;
  shippingRestrictions?: string[];
}

export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface ProductFilter {
  searchQuery?: string;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  bloomingSeason?: string;
  isFragrant?: boolean;
  featured?: boolean;
  isNew?: boolean;
  limit?: number;
}
