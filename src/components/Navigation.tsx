import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, User, Menu, X, Search, Home, Leaf, Gift, Package, Info } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const cartItemCount = useCartStore(state => state.getTotalItems());
  const wishlistItemCount = useWishlistStore(state => state.getTotalWishlistItems());

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    setIsSearchOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-green-700 flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80" 
                alt="Mac's Orchids Logo" 
                className="h-8 w-8 mr-2 rounded-full"
              />
              Mac's Orchids
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex ml-8 space-x-6">
              <Link to="/" className={`flex items-center text-gray-700 hover:text-green-600 ${
                location.pathname === '/' ? 'text-green-600 font-medium' : ''
              }`}>
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              
              <Link to="/shop" className={`flex items-center text-gray-700 hover:text-green-600 ${
                location.pathname === '/shop' ? 'text-green-600 font-medium' : ''
              }`}>
                <Package className="h-4 w-4 mr-1" />
                Shop
              </Link>
              
              <Link to="/care-guides" className={`flex items-center text-gray-700 hover:text-green-600 ${
                location.pathname === '/care-guides' ? 'text-green-600 font-medium' : ''
              }`}>
                <Leaf className="h-4 w-4 mr-1" />
                Plant Care
              </Link>
              
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-green-600">
                  <Info className="h-4 w-4 mr-1" />
                  Orchid Varieties
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 hidden group-hover:block">
                  <Link to="/shop?category=Phalaenopsis" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                    Phalaenopsis
                  </Link>
                  <Link to="/shop?category=Cattleya" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                    Cattleya
                  </Link>
                  <Link to="/shop?category=Dendrobium" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                    Dendrobium
                  </Link>
                  <Link to="/shop?category=Oncidium" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                    Oncidium
                  </Link>
                  <Link to="/shop?category=Vanda" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                    Vanda
                  </Link>
                </div>
              </div>
              
              <Link to="/shop?category=Supplies" className={`flex items-center text-gray-700 hover:text-green-600 ${
                location.pathname === '/supplies' ? 'text-green-600 font-medium' : ''
              }`}>
                <Package className="h-4 w-4 mr-1" />
                Supplies
              </Link>
              
              <Link to="/shop?category=Gifts" className={`flex items-center text-gray-700 hover:text-green-600 ${
                location.pathname === '/gifts' ? 'text-green-600 font-medium' : ''
              }`}>
                <Gift className="h-4 w-4 mr-1" />
                Gifts
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-green-600 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Account */}
            <Link 
              to="/account" 
              className="hidden md:block text-gray-700 hover:text-green-600 transition-colors"
              aria-label="My Account"
            >
              <User className="h-5 w-5" />
            </Link>
            
            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative text-gray-700 hover:text-green-600 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-green-600 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-50 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                placeholder="Search for orchids, supplies, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
              <button 
                type="submit"
                className="bg-green-600 text-white p-2 rounded-r-md hover:bg-green-700 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50 animate-fadeIn">
            <div className="flex flex-col p-4">
              <Link 
                to="/" 
                className="flex items-center py-3 text-gray-700 hover:text-green-600"
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
              
              <Link 
                to="/shop" 
                className="flex items-center py-3 text-gray-700 hover:text-green-600"
              >
                <Package className="h-5 w-5 mr-2" />
                Shop
              </Link>
              
              <Link 
                to="/care-guides" 
                className="flex items-center py-3 text-gray-700 hover:text-green-600"
              >
                <Leaf className="h-5 w-5 mr-2" />
                Plant Care
              </Link>
              
              <div className="py-3">
                <h4 className="flex items-center font-medium text-gray-700 mb-2">
                  <Info className="h-5 w-5 mr-2" />
                  Orchid Varieties
                </h4>
                <div className="pl-7 space-y-2">
                  <Link 
                    to="/shop?category=Phalaenopsis" 
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    Phalaenopsis
                  </Link>
                  <Link 
                    to="/shop?category=Cattleya" 
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    Cattleya
                  </Link>
                  <Link 
                    to="/shop?category=Dendrobium" 
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    Dendrobium
                  </Link>
                  <Link 
                    to="/shop?category=Oncidium" 
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    Oncidium
                  </Link>
                  <Link 
                    to="/shop?category=Vanda" 
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    Vanda
                  </Link>
                </div>
              </div>
              
              <Link 
                to="/shop?category=Supplies" 
                className="flex items-center py-3 text-gray-700 hover:text-green-600"
              >
                <Package className="h-5 w-5 mr-2" />
                Supplies
              </Link>
              
              <Link 
                to="/shop?category=Gifts" 
                className="flex items-center py-3 text-gray-700 hover:text-green-600"
              >
                <Gift className="h-5 w-5 mr-2" />
                Gifts
              </Link>
              
              <Link 
                to="/account" 
                className="flex items-center py-3 text-gray-700 hover:text-green-600"
              >
                <User className="h-5 w-5 mr-2" />
                My Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
