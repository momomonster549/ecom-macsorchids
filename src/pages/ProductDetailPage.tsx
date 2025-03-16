import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Heart, ShoppingCart, Truck, Shield, RotateCcw, Check, Info, Minus, Plus, Star } from 'lucide-react'
import { getProductById } from '../services/productService'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ImageGallery } from '../components/ImageGallery'
import { RecentlyViewed } from '../components/RecentlyViewed'

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const productId = parseInt(id || '0')
  
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState('')
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  
  const addToCart = useCartStore(state => state.addToCart)
  const addToWishlist = useWishlistStore(state => state.addToWishlist)
  const isInWishlist = useWishlistStore(state => state.isInWishlist(productId))
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
  
  useEffect(() => {
    // Set default variant if available
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].id.toString())
    }
    
    // Scroll to top when product changes
    window.scrollTo(0, 0)
  }, [product])
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }
  
  const handleAddToCart = () => {
    if (product) {
      const selectedVariantObj = product.variants?.find(v => v.id.toString() === selectedVariant)
      
      addToCart({
        ...product,
        quantity,
        selectedVariant: selectedVariantObj
      })
      
      // Show toast notification
      const toast = document.createElement('div')
      toast.className = 'toast animate-fadeIn'
      toast.innerHTML = `
        <div class="flex items-center">
          <span class="mr-2"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></span>
          <span>${product.name} added to cart</span>
        </div>
      `
      document.body.appendChild(toast)
      
      setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-500')
        setTimeout(() => document.body.removeChild(toast), 500)
      }, 3000)
    }
  }
  
  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product)
    }
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-8">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Link 
          to="/shop" 
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }
  
  const discountedPrice = product.discount > 0 
    ? (product.price * (100 - product.discount)) / 100 
    : product.price
  
  return (
    <div className="bg-white animate-fadeIn">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: product.category, path: `/shop?category=${encodeURIComponent(product.category)}` },
            { label: product.name, path: `/product/${product.id}` }
          ]} 
        />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* Product Images */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            {product.isNew && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                New Arrival
              </span>
            )}
            
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
            
            <div className="mt-2">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : i < product.rating 
                            ? 'text-yellow-400 fill-current opacity-50' 
                            : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-end">
              {product.discount > 0 ? (
                <>
                  <p className="text-3xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</p>
                  <p className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</p>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Save {product.discount}%
                  </span>
                </>
              ) : (
                <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              )}
            </div>
            
            {product.stockCount > 0 ? (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" />
                In Stock ({product.stockCount} available)
              </p>
            ) : (
              <p className="mt-2 text-sm text-red-600">Out of Stock</p>
            )}
            
            {/* Product Description Preview */}
            <div className="mt-4">
              <p className={`text-base text-gray-700 ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
                {product.description}
              </p>
              {product.description.length > 150 && (
                <button 
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-1 text-sm font-medium text-green-600 hover:text-green-700"
                >
                  {isDescriptionExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
            
            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Variants</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <label 
                      key={variant.id}
                      className={`relative flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer text-sm font-medium transition-colors ${
                        selectedVariant === variant.id.toString()
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="variant"
                        value={variant.id}
                        checked={selectedVariant === variant.id.toString()}
                        onChange={() => setSelectedVariant(variant.id.toString())}
                        className="sr-only"
                      />
                      {variant.name}
                      {variant.price > 0 && ` (+$${variant.price.toFixed(2)})`}
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={`p-2 border border-gray-300 rounded-l-md ${
                    quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-t border-b border-gray-300 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className={`p-2 border border-gray-300 rounded-r-md ${
                    quantity >= 10 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Add to Cart and Wishlist */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stockCount === 0}
                className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  product.stockCount === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 transition-colors'
                }`}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              
              <button
                type="button"
                onClick={handleAddToWishlist}
                className={`flex items-center justify-center px-6 py-3 border rounded-md shadow-sm text-base font-medium ${
                  isInWishlist
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } transition-colors`}
              >
                <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
            
            {/* Shipping and Returns */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                    <p className="mt-1 text-xs text-gray-500">On orders over $75. Delivery in 3-5 business days.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <RotateCcw className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
                    <p className="mt-1 text-xs text-gray-500">30-day money back guarantee if you're not satisfied.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Secure Checkout</h4>
                    <p className="mt-1 text-xs text-gray-500">SSL encrypted payment processing for your security.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Expert Support</h4>
                    <p className="mt-1 text-xs text-gray-500">Have questions? Our orchid experts are here to help.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'details', 'care', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="mt-6 prose prose-green max-w-none">
            {activeTab === 'description' && (
              <div>
                <h2>Product Description</h2>
                <p>{product.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
                <p>Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div>
                <h2>Product Details</h2>
                <ul>
                  <li><strong>Botanical Name:</strong> {product.name}</li>
                  <li><strong>Category:</strong> {product.category}</li>
                  <li><strong>Bloom Color:</strong> Various</li>
                  <li><strong>Bloom Size:</strong> 3-4 inches</li>
                  <li><strong>Mature Height:</strong> 12-18 inches</li>
                  <li><strong>Pot Size:</strong> 4-inch nursery pot</li>
                  <li><strong>Origin:</strong> Southeast Asia</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'care' && (
              <div>
                <h2>Care Instructions</h2>
                <h3>Light</h3>
                <p>Bright, indirect light. Avoid direct sunlight which can burn the leaves.</p>
                
                <h3>Water</h3>
                <p>Water thoroughly when the potting medium is nearly dry. Frequency varies by season and home environment.</p>
                
                <h3>Temperature</h3>
                <p>Prefers temperatures between 65-75°F during the day and 55-65°F at night.</p>
                
                <h3>Humidity</h3>
                <p>Appreciates humidity levels of 50-70%. Consider using a humidity tray or room humidifier.</p>
                
                <h3>Fertilizer</h3>
                <p>Feed with a balanced orchid fertilizer diluted to half strength every 2-3 weeks during active growth.</p>
                
                <div className="tip-box">
                  <h4>Pro Tip:</h4>
                  <p>Allow your orchid to experience a slight temperature drop at night (about 10°F cooler than daytime) to encourage blooming.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h2>Customer Reviews</h2>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : i < product.rating 
                              ? 'text-yellow-400 fill-current opacity-50' 
                              : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)} out of 5 ({product.reviewCount} reviews)</p>
                </div>
                
                <div className="space-y-6">
                  {/* Sample reviews - in a real app, these would be fetched from an API */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">Beautiful Orchid!</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">By Sarah J. on May 15, 2023</p>
                    <p className="text-sm text-gray-700">This orchid arrived in perfect condition and has been blooming for weeks. The colors are even more vibrant than in the photos. Very happy with my purchase!</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">Healthy Plant</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">By Michael T. on April 3, 2023</p>
                    <p className="text-sm text-gray-700">The orchid arrived well-packaged and in good health. It took a couple of weeks to adjust to my home environment, but now it's thriving. Would buy from Mac's Orchids again.</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link 
                    to="#" 
                    className="text-green-600 hover:text-green-700 font-medium flex items-center"
                  >
                    Write a Review
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Recently Viewed Products */}
        <RecentlyViewed currentProductId={product.id} />
      </div>
    </div>
  )
}
