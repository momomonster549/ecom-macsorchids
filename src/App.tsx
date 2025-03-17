import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductListPage } from './pages/ProductListPage'
import { CartPage } from './pages/CartPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { WishlistPage } from './pages/WishlistPage'
import { HomePage } from './pages/HomePage'
import { CareGuidesPage } from './pages/CareGuidesPage'
import { CareGuideDetailPage } from './pages/CareGuideDetailPage'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navigation />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ProductListPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/care-guides" element={<CareGuidesPage />} />
              <Route path="/care-guides/:slug" element={<CareGuideDetailPage />} />
              <Route path="/about" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">About Mac's Orchids</h1><p className="mt-4">Coming soon...</p></div>} />
              <Route path="/account" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">My Account</h1><p className="mt-4">Coming soon...</p></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
