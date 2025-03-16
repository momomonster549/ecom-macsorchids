import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types/product'
import { getProducts } from '../services/productService'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface RecentlyViewedProps {
  currentProductId: number
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ currentProductId }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const maxScrollPosition = Math.max(0, products.length * 220 - 880) // Assuming each card is ~220px wide and container is ~880px
  
  useEffect(() => {
    // In a real app, this would fetch from localStorage or user history
    // For demo purposes, we'll just fetch random products
    const fetchRecentlyViewed = async () => {
      try {
        const recentProducts = await getProducts({ limit: 8 })
        // Filter out the current product
        setProducts(recentProducts.filter(p => p.id !== currentProductId))
      } catch (error) {
        console.error('Error fetching recently viewed products:', error)
      }
    }
    
    fetchRecentlyViewed()
  }, [currentProductId])
  
  const handleScrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 440))
  }
  
  const handleScrollRight = () => {
    setScrollPosition(Math.min(maxScrollPosition, scrollPosition + 440))
  }
  
  if (products.length === 0) return null
  
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recently Viewed</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleScrollLeft}
            disabled={scrollPosition === 0}
            className={`p-1 rounded-full border border-gray-300 ${
              scrollPosition === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleScrollRight}
            disabled={scrollPosition >= maxScrollPosition}
            className={`p-1 rounded-full border border-gray-300 ${
              scrollPosition >= maxScrollPosition
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div
          className="flex space-x-4 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {products.map(product => (
            <div key={product.id} className="flex-shrink-0 w-52">
              <Link to={`/product/${product.id}`} className="block group">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
