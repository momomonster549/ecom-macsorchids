import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80" 
                alt="Mac's Orchids Logo" 
                className="h-10 w-10 mr-2 rounded-full"
              />
              <span className="text-xl font-bold text-green-700">Mac's Orchids</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Specializing in premium orchids and supplies for enthusiasts and collectors since 2010.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-green-600" />
                <span>123 Bloom Street, Orchid City, OC 12345</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-green-600" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-green-600" />
                <span>info@macsorchids.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/shop?category=Phalaenopsis" className="text-sm text-gray-600 hover:text-green-600">
                  Phalaenopsis Orchids
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Cattleya" className="text-sm text-gray-600 hover:text-green-600">
                  Cattleya Orchids
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Dendrobium" className="text-sm text-gray-600 hover:text-green-600">
                  Dendrobium Orchids
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Rare" className="text-sm text-gray-600 hover:text-green-600">
                  Rare Varieties
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Supplies" className="text-sm text-gray-600 hover:text-green-600">
                  Supplies & Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Gifts" className="text-sm text-gray-600 hover:text-green-600">
                  Gift Collections
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Information</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-green-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/care-guides" className="text-sm text-gray-600 hover:text-green-600">
                  Care Guides
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-green-600">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-green-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-green-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-green-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Stay Connected</h3>
            <p className="mt-4 text-sm text-gray-600">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
            
            {/* Social Media */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-green-600">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Mac's Orchids. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-green-600">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-green-600">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-sm text-gray-500 hover:text-green-600">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
