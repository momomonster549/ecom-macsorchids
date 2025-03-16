import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Droplet, Sun, Gift, Award } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/productService'
import { ProductCard } from '../components/ProductCard'

export const HomePage: React.FC = () => {
  const { data: featuredProducts = [] } = useQuery({
    queryKey: ['products', { featured: true, limit: 4 }],
    queryFn: () => getProducts({ featured: true, limit: 4 }),
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  const { data: newArrivals = [] } = useQuery({
    queryKey: ['products', { isNew: true, limit: 4 }],
    queryFn: () => getProducts({ isNew: true, limit: 4 }),
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://scontent-mia3-3.xx.fbcdn.net/v/t39.30808-6/324858760_1541586179654147_1453101609349260581_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=WNC2cjtqwckQ7kNvgFWUIIc&_nc_oc=AdhZhodQEnXZoL-mFooEMJTNWAbnHs-lIQCSubi-N6Q8H4FU_-csgpTDh-xY2ssUQVLvE1rGKFYyLPK3Ffwem5fN&_nc_zt=23&_nc_ht=scontent-mia3-3.xx&_nc_gid=NB7fMq5ZkPjWW4YhdmXzxA&oh=00_AYGl8YcoUjJBombEfyDZ4krrnsnxZoFs42wYqMASvYuPMg&oe=67DCDDE5"
            alt="Beautiful orchid display"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Discover the Beauty of</span>
                  <span className="block text-green-300">Exotic Orchids</span>
                </h1>
                <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Explore our curated collection of premium orchids, from beginner-friendly varieties to rare specimens for collectors and enthusiasts.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/shop"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/care-guides"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10"
                    >
                      Care Guides
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Category Tiles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTiles.map((category, index) => (
            <Link 
              key={index} 
              to={category.link} 
              className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-white/80 text-sm mb-4 max-w-xs">{category.description}</p>
                <div className="flex items-center text-white font-medium text-sm">
                  <span>Shop Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Orchids</h2>
            <Link to="/shop" className="text-green-600 hover:text-green-700 font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} featured={true} />
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Mac's Orchids</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center">
                <div className="bg-green-100 rounded-full p-4 inline-flex">
                  {feature.icon}
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <Link to="/shop?sort=newest" className="text-green-600 hover:text-green-700 font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Care Tips Banner */}
      <div className="relative bg-green-700 py-16">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Expert Orchid Care Tips</h2>
          <p className="text-green-100 max-w-2xl mx-auto mb-8">
            Learn how to help your orchids thrive with our expert care guides, tailored for beginners and experienced growers alike.
          </p>
          <Link
            to="/care-guides"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
          >
            Explore Care Guides
          </Link>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Orchid Community</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to receive care tips, special offers, and updates on new arrivals.
            </p>
            <form className="sm:flex justify-center">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-green-500 focus:border-green-500 sm:max-w-xs rounded-md"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              We care about your data. Read our <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Data for category tiles
const categoryTiles = [
  {
    title: 'Phalaenopsis Orchids',
    description: 'Perfect for beginners with elegant blooms that last for months.',
    image: 'https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    link: '/?category=Phalaenopsis'
  },
  {
    title: 'Dendrobium Orchids',
    description: 'Known for their colorful, long-lasting flowers and unique growth habits.',
    image: 'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    link: '/?category=Dendrobium'
  },
  {
    title: 'Cattleya Orchids',
    description: 'Stunning, fragrant flowers that are considered the "Queen of Orchids".',
    image: 'https://images.unsplash.com/photo-1588873281272-14886b8aes3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    link: '/?category=Cattleya'
  },
  {
    title: 'Rare Varieties',
    description: 'Unique and hard-to-find orchid species for collectors and enthusiasts.',
    image: 'https://images.unsplash.com/photo-1589393922695-ef4c2f9deb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    link: '/?category=Rare'
  },
  {
    title: 'Orchid Care Supplies',
    description: 'Everything you need to help your orchids thrive, from potting media to fertilizers.',
    image: 'https://images.unsplash.com/photo-1622467827417-bbe6542801eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    link: '/?category=Supplies'
  },
  {
    title: 'Gift Collections',
    description: 'Curated orchid gift sets perfect for any occasion.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    link: '/?category=Gifts'
  }
]

// Data for features section
const features = [
  {
    title: 'Expert Selection',
    description: 'Each orchid is hand-selected by our team of experienced growers.',
    icon: <Award className="h-6 w-6 text-green-600" />
  },
  {
    title: 'Care Guidance',
    description: 'Detailed care instructions with every purchase to ensure your orchid thrives.',
    icon: <Leaf className="h-6 w-6 text-green-600" />
  },
  {
    title: 'Premium Quality',
    description: 'We source only the healthiest, most vibrant plants for our customers.',
    icon: <Award className="h-6 w-6 text-green-600" />
  },
  {
    title: 'Satisfaction Guaranteed',
    description: "If your orchid arrives damaged, we'll replace it free of charge.",
    icon: <Gift className="h-6 w-6 text-green-600" />
  }
]
