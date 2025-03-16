import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, X, Leaf, Droplets, Sun, ThermometerSnowflake } from 'lucide-react'
import { getProducts, getProductCategories, getProductSubcategories } from '../services/productService'
import { ProductFilter } from '../types/product'
import { ProductCard } from '../components/ProductCard'

export const ProductListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilter>({
    searchQuery: searchParams.get('search') || '',
    category: searchParams.get('category') || undefined,
    subcategory: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    inStockOnly: false,
    difficulty: undefined,
    bloomingSeason: undefined,
    isFragrant: undefined
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  // Update filters when URL search params change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      searchQuery: searchParams.get('search') || '',
      category: searchParams.get('category') || undefined
    }));
  }, [searchParams]);
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters)
  });
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductCategories
  });
  
  const { data: subcategories = [] } = useQuery({
    queryKey: ['subcategories', filters.category],
    queryFn: () => filters.category ? getProductSubcategories(filters.category) : Promise.resolve([]),
    enabled: !!filters.category
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };
  
  const handleCategoryChange = (category: string | undefined) => {
    setFilters(prev => ({ 
      ...prev, 
      category,
      subcategory: undefined // Reset subcategory when category changes
    }));
  };
  
  const handleSubcategoryChange = (subcategory: string | undefined) => {
    setFilters(prev => ({ ...prev, subcategory }));
  };
  
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    setFilters(prev => ({ 
      ...prev, 
      [type === 'min' ? 'minPrice' : 'maxPrice']: numValue 
    }));
  };
  
  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }));
  };
  
  const handleDifficultyChange = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | undefined) => {
    setFilters(prev => ({ ...prev, difficulty }));
  };
  
  const handleBloomingSeasonChange = (season: string | undefined) => {
    setFilters(prev => ({ ...prev, bloomingSeason: season }));
  };
  
  const handleFragranceChange = (isFragrant: boolean | undefined) => {
    setFilters(prev => ({ ...prev, isFragrant }));
  };
  
  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      category: undefined,
      subcategory: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      inStockOnly: false,
      difficulty: undefined,
      bloomingSeason: undefined,
      isFragrant: undefined
    });
  };
  
  const hasActiveFilters = filters.category !== undefined || 
                          filters.subcategory !== undefined ||
                          filters.minPrice !== undefined || 
                          filters.maxPrice !== undefined || 
                          filters.inStockOnly || 
                          filters.difficulty !== undefined ||
                          filters.bloomingSeason !== undefined ||
                          filters.isFragrant !== undefined ||
                          filters.searchQuery !== '';
  
  // Get featured products (first 2 products for demo)
  const featuredProducts = products.slice(0, 2);
  const regularProducts = products.slice(2);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          {filters.category ? filters.category : 'All Orchids & Supplies'}
        </h1>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search orchids, supplies, and more..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>
      
      {/* Featured Products Section (only show if we have featured products and no active filters) */}
      {featuredProducts.length > 0 && !hasActiveFilters && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-green-700 flex items-center">
            <Leaf className="h-6 w-6 mr-2" />
            Featured Orchids
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} featured={true} />
            ))}
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`md:block ${showFilters ? 'block' : 'hidden'} w-full md:w-64 bg-white p-4 rounded-lg shadow-md`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-sm text-green-600 hover:text-green-800"
              >
                Clear All
              </button>
            )}
            <button 
              onClick={() => setShowFilters(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-2 flex items-center">
              <Leaf className="h-4 w-4 mr-1 text-green-600" />
              Category
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="category-all"
                  name="category"
                  checked={filters.category === undefined}
                  onChange={() => handleCategoryChange(undefined)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="category-all" className="ml-2 text-gray-700">All Categories</label>
              </div>
              
              {categories.map(category => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    checked={filters.category === category}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">{category}</label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Subcategory Filter (only show if category is selected) */}
          {filters.category && subcategories.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Subcategory</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="subcategory-all"
                    name="subcategory"
                    checked={filters.subcategory === undefined}
                    onChange={() => handleSubcategoryChange(undefined)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="subcategory-all" className="ml-2 text-gray-700">All {filters.category}</label>
                </div>
                
                {subcategories.map(subcategory => (
                  <div key={subcategory} className="flex items-center">
                    <input
                      type="radio"
                      id={`subcategory-${subcategory}`}
                      name="subcategory"
                      checked={filters.subcategory === subcategory}
                      onChange={() => handleSubcategoryChange(subcategory)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`subcategory-${subcategory}`} className="ml-2 text-gray-700">{subcategory}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice ?? ''}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice ?? ''}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          {/* Availability Filter */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="in-stock"
                checked={filters.inStockOnly}
                onChange={handleInStockChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="in-stock" className="ml-2 text-gray-700">In Stock Only</label>
            </div>
          </div>
          
          {/* Care Level Filter (only for orchid categories) */}
          {filters.category && !['Supplies', 'Accessories'].includes(filters.category) && (
            <div className="mb-6">
              <h3 className="font-medium mb-2 flex items-center">
                <Leaf className="h-4 w-4 mr-1 text-green-600" />
                Care Level
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="difficulty-all"
                    name="difficulty"
                    checked={filters.difficulty === undefined}
                    onChange={() => handleDifficultyChange(undefined)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="difficulty-all" className="ml-2 text-gray-700">All Levels</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="difficulty-beginner"
                    name="difficulty"
                    checked={filters.difficulty === 'Beginner'}
                    onChange={() => handleDifficultyChange('Beginner')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="difficulty-beginner" className="ml-2 text-gray-700">Beginner</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="difficulty-intermediate"
                    name="difficulty"
                    checked={filters.difficulty === 'Intermediate'}
                    onChange={() => handleDifficultyChange('Intermediate')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="difficulty-intermediate" className="ml-2 text-gray-700">Intermediate</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="difficulty-advanced"
                    name="difficulty"
                    checked={filters.difficulty === 'Advanced'}
                    onChange={() => handleDifficultyChange('Advanced')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="difficulty-advanced" className="ml-2 text-gray-700">Advanced</label>
                </div>
              </div>
            </div>
          )}
          
          {/* Blooming Season Filter (only for orchid categories) */}
          {filters.category && !['Supplies', 'Accessories'].includes(filters.category) && (
            <div className="mb-6">
              <h3 className="font-medium mb-2 flex items-center">
                <ThermometerSnowflake className="h-4 w-4 mr-1 text-green-600" />
                Blooming Season
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="season-all"
                    name="season"
                    checked={filters.bloomingSeason === undefined}
                    onChange={() => handleBloomingSeasonChange(undefined)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="season-all" className="ml-2 text-gray-700">Any Season</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="season-spring"
                    name="season"
                    checked={filters.bloomingSeason === 'Spring'}
                    onChange={() => handleBloomingSeasonChange('Spring')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="season-spring" className="ml-2 text-gray-700">Spring</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="season-summer"
                    name="season"
                    checked={filters.bloomingSeason === 'Summer'}
                    onChange={() => handleBloomingSeasonChange('Summer')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="season-summer" className="ml-2 text-gray-700">Summer</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="season-fall"
                    name="season"
                    checked={filters.bloomingSeason === 'Fall'}
                    onChange={() => handleBloomingSeasonChange('Fall')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="season-fall" className="ml-2 text-gray-700">Fall</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="season-winter"
                    name="season"
                    checked={filters.bloomingSeason === 'Winter'}
                    onChange={() => handleBloomingSeasonChange('Winter')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="season-winter" className="ml-2 text-gray-700">Winter</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="season-year-round"
                    name="season"
                    checked={filters.bloomingSeason === 'Year-round'}
                    onChange={() => handleBloomingSeasonChange('Year-round')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="season-year-round" className="ml-2 text-gray-700">Year-round</label>
                </div>
              </div>
            </div>
          )}
          
          {/* Fragrance Filter (only for orchid categories) */}
          {filters.category && !['Supplies', 'Accessories'].includes(filters.category) && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Fragrance</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="fragrance-all"
                    name="fragrance"
                    checked={filters.isFragrant === undefined}
                    onChange={() => handleFragranceChange(undefined)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="fragrance-all" className="ml-2 text-gray-700">All Orchids</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="fragrance-yes"
                    name="fragrance"
                    checked={filters.isFragrant === true}
                    onChange={() => handleFragranceChange(true)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="fragrance-yes" className="ml-2 text-gray-700">Fragrant Only</label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
              <button 
                onClick={clearFilters}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div>
              {/* Product Count */}
              <p className="text-gray-600 mb-4">Showing {products.length} products</p>
              
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hasActiveFilters ? products.map(product => (
                  <ProductCard key={product.id} product={product} />
                )) : regularProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Care Tips Section */}
      <div className="mt-16 bg-green-50 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Orchid Care Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start">
            <Sun className="h-8 w-8 text-yellow-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-700 mb-1">Light Requirements</h3>
              <p className="text-gray-700 text-sm">Most orchids thrive in bright, indirect light. Avoid direct sunlight which can burn leaves.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Droplets className="h-8 w-8 text-blue-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-700 mb-1">Watering</h3>
              <p className="text-gray-700 text-sm">Water thoroughly when the growing medium begins to dry out. Different varieties have different needs.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <ThermometerSnowflake className="h-8 w-8 text-purple-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-700 mb-1">Temperature</h3>
              <p className="text-gray-700 text-sm">Most orchids prefer temperatures between 65-80°F during the day and slightly cooler at night.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <a href="/care-guides" className="text-green-700 hover:text-green-900 font-medium">
            View Complete Care Guides →
          </a>
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Join Our Orchid Community</h2>
          <p className="text-gray-600 mb-6">Subscribe to receive care tips, special offers, and updates on new arrivals.</p>
          
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button 
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to receive marketing emails from Mac's Orchids. 
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}
