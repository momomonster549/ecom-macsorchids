import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2, AlertTriangle } from 'lucide-react'
import { useWishlistStore } from '../store/wishlistStore'
import { useCartStore } from '../store/cartStore'

export const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore()
  const { addToCart } = useCartStore()
  
  const handleMoveToCart = (productId: string) => {
    const product = items.find(item => item.id === productId)
    if (product) {
      addToCart(product)
      removeFromWishlist(productId)
    }
  }
  
  const handleMoveAllToCart = () => {
    items.forEach(item => {
      if (item.inStock) {
        addToCart(item)
      }
    })
    clearWishlist()
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Add items you love to your wishlist. Review them anytime and easily move them to your cart.</p>
          <Link 
            to="/" 
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist</p>
            <div className="flex gap-4">
              <button 
                onClick={handleMoveAllToCart}
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Move All to Cart
              </button>
              <button 
                onClick={clearWishlist}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Wishlist
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid md:grid-cols-12 bg-gray-100 p-4 text-gray-600 text-sm font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Stock Status</div>
              <div className="col-span-2">Actions</div>
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
                        {item.difficulty && (
                          <span className={`text-xs px-2 py-0.5 rounded text-white ${
                            item.difficulty === 'Beginner' ? 'bg-green-600' :
                            item.difficulty === 'Intermediate' ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}>
                            {item.difficulty}
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
                  
                  {/* Stock Status */}
                  <div className="col-span-2 mb-4 md:mb-0">
                    <div className="md:hidden text-sm text-gray-600 mb-1">Stock Status:</div>
                    {item.inStock ? (
                      <span className="text-green-600 flex items-center">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="col-span-2 flex items-center space-x-2">
                    <button 
                      onClick={() => handleMoveToCart(item.id)}
                      disabled={!item.inStock}
                      className={`p-2 rounded ${
                        item.inStock 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      title={item.inStock ? "Add to Cart" : "Out of Stock"}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                    
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <Link to="/" className="text-green-600 hover:text-green-800 font-medium">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
      
      {/* Recommended Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Recommended products based on your wishlist will appear here</p>
        </div>
      </div>
    </div>
  )
}
