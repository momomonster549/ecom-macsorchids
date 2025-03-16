import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Product } from '../types/product'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  
  const addToCart = useCartStore(state => state.addToCart)
  const addToWishlist = useWishlistStore(state => state.addToWishlist)
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id))
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    
    // Show toast notification
    const toast = document.createElement('div')
    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn'
    toast.textContent = `${product.name} added to cart`
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-500')
      setTimeout(() => document.body.removeChild(toast), 500)
    }, 3000)
  }
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToWishlist(product)
  }
  
  // Get the image URL safely
  const imageUrl = product.imageUrl || (product.images && product.images.length > 0 ? product.images[0] : '')
  
  return (
    <div 
      className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
        featured ? 'ring-2 ring-green-500 ring-opacity-50' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featured && (
        <div className="absolute top-0 left-0 bg-green-600 text-white text-xs font-bold px-3 py-1 z-10">
          Featured
        </div>
      )}
      
      {product.isNew && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 z-10">
          New
        </div>
      )}
      
      {product.discount > 0 && (
        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 z-10">
          {product.discount}% OFF
        </div>
      )}
      
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-w-1 aspect-h-1 bg-gray-200">
          <img
            src={imageUrl}
            alt={product.name}
            className={`w-full h-64 object-cover transform transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className={`absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ${
            isHovered ? 'bg-opacity-10' : ''
          }`}></div>
          
          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transform transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-md flex items-center justify-center transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className={`p-2 rounded-md transition-colors ${
                  isInWishlist 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {product.rating > 0 && (
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : i < product.rating 
                        ? 'text-yellow-400 fill-current opacity-50' 
                        : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
            </div>
          )}
          
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="mt-1 text-xs text-gray-500 line-clamp-1">{product.category}</p>
          
          <div className="mt-2 flex items-center">
            {product.discount > 0 ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
            
            {product.freeShipping && (
              <span className="ml-auto text-xs text-green-600 font-medium">Free Shipping</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
