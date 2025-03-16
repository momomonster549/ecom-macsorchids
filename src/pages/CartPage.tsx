import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2, ChevronLeft, AlertTriangle, Heart, CreditCard, Truck } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'

export const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore()
  const { addToWishlist, isInWishlist } = useWishlistStore()
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }
  
  const handleMoveToWishlist = (productId: string) => {
    const product = items.find(item => item.id === productId)
    if (product && !isInWishlist(productId)) {
      addToWishlist(product)
      removeFromCart(productId)
    }
  }
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }
    
    // Mock coupon validation
    if (couponCode.toUpperCase() === 'ORCHID10') {
      setCouponError('Coupon applied successfully!')
    } else {
      setCouponError('Invalid coupon code')
    }
  }
  
  // Calculate order summary
  const subtotal = getTotalPrice()
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 12.99) : 0
  const tax = subtotal * 0.07 // 7% tax rate
  const total = subtotal + shipping + tax
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any orchids to your cart yet.</p>
          <Link 
            to="/" 
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="hidden md:grid md:grid-cols-12 bg-gray-100 p-4 text-gray-600 text-sm font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Total</div>
              </div>
              
              {items.map(item => (
                <div key={item.id} className="border-t border-gray-200 p-4">
                  <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center mb-4 md:mb-0">
                      <Link to={`/product/${item.id}`} className="shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      </Link>
                      <div className="ml-4">
                        <Link to={`/product/${item.id}`} className="text-lg font-medium text-gray-800 hover:text-green-600">
                          {item.name}
                        </Link>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-sm text-gray-600">{item.category}</span>
                          {!item.inStock && (
                            <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-800 flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-gray-600 mb-1">Price:</div>
                      <div className="font-medium">${item.price.toFixed(2)}</div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-2 mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-gray-600 mb-1">Quantity:</div>
                      <div className="flex items-center border border-gray-300 rounded-md w-24">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 border-l border-r border-gray-300 w-10 text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="col-span-2 flex justify-between items-center">
                      <div>
                        <div className="md:hidden text-sm text-gray-600 mb-1">Total:</div>
                        <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleMoveToWishlist(item.id)}
                          className="p-1.5 rounded text-gray-500 hover:text-red-600 hover:bg-gray-100"
                          title="Move to Wishlist"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded text-gray-500 hover:text-red-600 hover:bg-gray-100"
                          title="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <Link to="/" className="text-green-600 hover:text-green-800 flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
                
                <button 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </button>
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium text-gray-800 mb-3">Apply Coupon Code</h3>
              <form onSubmit={handleApplyCoupon} className="flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button 
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition"
                >
                  Apply
                </button>
              </form>
              {couponError && (
                <p className={`mt-2 text-sm ${couponError.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {couponError}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Try code "ORCHID10" for 10% off your order!
              </p>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                {couponCode.toUpperCase() === 'ORCHID10' && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${(subtotal * 0.1).toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center py-3 border-t border-b border-gray-200 mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold">
                  ${couponCode.toUpperCase() === 'ORCHID10' 
                    ? (total - subtotal * 0.1).toFixed(2) 
                    : total.toFixed(2)
                  }
                </span>
              </div>
              
              {/* Shipping Notice */}
              <div className="mb-6">
                {subtotal >= 100 ? (
                  <div className="flex items-start bg-green-50 p-3 rounded-md text-green-800 text-sm">
                    <Truck className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>Your order qualifies for FREE shipping!</p>
                  </div>
                ) : (
                  <div className="flex items-start bg-blue-50 p-3 rounded-md text-blue-800 text-sm">
                    <Truck className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>Add ${(100 - subtotal).toFixed(2)} more to qualify for FREE shipping</p>
                  </div>
                )}
              </div>
              
              {/* Checkout Button */}
              <button 
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </button>
              
              {/* Payment Methods */}
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2 text-center">We Accept</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              {/* Shipping Policy */}
              <div className="mt-6 text-xs text-gray-500">
                <p className="mb-1">
                  <strong>Shipping Policy:</strong> Orders typically ship within 1-2 business days.
                </p>
                <p>
                  <strong>Live Plant Guarantee:</strong> All orchids are guaranteed to arrive in excellent condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* You Might Also Like Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Recommended products based on your cart will appear here</p>
        </div>
      </div>
    </div>
  )
}
