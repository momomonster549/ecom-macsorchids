import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Search, ChevronDown, Leaf, Droplet, Sun, Wind, Thermometer } from 'lucide-react'

export const CareGuidesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  // Filter guides based on search query and active category
  const filteredGuides = careGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Care Guides', path: '/care-guides' }
        ]} 
      />
      
      <div className="mt-6 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Orchid Care Guides</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl">
          Learn how to help your orchids thrive with our expert care guides, tailored for beginners and experienced growers alike.
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search care guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              id="category-menu"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {categoryLabels[activeCategory]}
              <ChevronDown className="ml-2 h-5 w-5" />
            </button>
          </div>
          
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 hidden group-hover:block">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="category-menu">
              {Object.entries(categoryLabels).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setActiveCategory(value)}
                  className={`${
                    activeCategory === value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block px-4 py-2 text-sm w-full text-left hover:bg-gray-50`}
                  role="menuitem"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Guide */}
      <div className="mb-12">
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={featuredGuide.image} 
            alt={featuredGuide.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
            <span className="text-green-300 text-sm font-medium mb-2">Featured Guide</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{featuredGuide.title}</h2>
            <p className="text-white/80 mb-6 max-w-2xl">{featuredGuide.excerpt}</p>
            <Link 
              to={`/care-guides/${featuredGuide.slug}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Read Full Guide
            </Link>
          </div>
        </div>
      </div>
      
      {/* Guide Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredGuides.length > 0 ? (
          filteredGuides.map(guide => (
            <div key={guide.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Link to={`/care-guides/${guide.slug}`}>
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {categoryLabels[guide.category]}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{guide.readTime} min read</span>
                </div>
                <Link to={`/care-guides/${guide.slug}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600">{guide.title}</h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2">{guide.excerpt}</p>
                <Link 
                  to={`/care-guides/${guide.slug}`}
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Read More
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No care guides found matching your search criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      {/* Care Basics Section */}
      <div className="bg-green-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Orchid Care Basics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careBasics.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-green-100 rounded-full p-3 inline-flex mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Care Tips in Your Inbox</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for seasonal care reminders, new guide notifications, and expert tips.
        </p>
        <form className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-r-md hover:bg-green-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

// Category labels mapping
const categoryLabels: Record<string, string> = {
  'all': 'All Categories',
  'beginner': 'Beginner Guides',
  'watering': 'Watering & Humidity',
  'lighting': 'Light Requirements',
  'repotting': 'Repotting & Medium',
  'fertilizing': 'Fertilizing',
  'troubleshooting': 'Troubleshooting',
  'seasonal': 'Seasonal Care'
}

// Featured guide
const featuredGuide = {
  id: 'featured-1',
  title: 'The Complete Guide to Phalaenopsis Orchid Care',
  slug: 'complete-phalaenopsis-care',
  excerpt: 'Learn everything you need to know about caring for the most popular and beginner-friendly orchid variety, from watering and light requirements to reblooming tips.',
  image: 'https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  category: 'beginner',
  readTime: 12
}

// Care guides data
const careGuides = [
  {
    id: 1,
    title: 'Watering Orchids: How Often and How Much',
    slug: 'watering-orchids',
    excerpt: 'Learn the proper watering techniques for different orchid varieties and how to adjust based on your home environment.',
    image: 'https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'watering',
    readTime: 8
  },
  {
    id: 2,
    title: 'Light Requirements for Healthy Orchids',
    slug: 'orchid-light-requirements',
    excerpt: 'Discover the ideal light conditions for different orchid species and how to provide the right amount of light in your home.',
    image: 'https://images.unsplash.com/photo-1589393922695-ef4c2f9deb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'lighting',
    readTime: 6
  },
  {
    id: 3,
    title: 'Repotting Your Orchid: Step-by-Step Guide',
    slug: 'repotting-orchids',
    excerpt: 'Learn when and how to repot your orchids, including selecting the right potting medium and container size.',
    image: 'https://images.unsplash.com/photo-1622467827417-bbe6542801eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'repotting',
    readTime: 10
  },
  {
    id: 4,
    title: 'Orchid Fertilizing Schedule and Tips',
    slug: 'orchid-fertilizing',
    excerpt: 'Understand the nutritional needs of orchids and how to establish an effective fertilizing routine.',
    image: 'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'fertilizing',
    readTime: 7
  },
  {
    id: 5,
    title: 'Troubleshooting Common Orchid Problems',
    slug: 'orchid-troubleshooting',
    excerpt: 'Identify and resolve common issues like yellow leaves, root rot, pests, and failure to bloom.',
    image: 'https://images.unsplash.com/photo-1588873281272-14886b8aes3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'troubleshooting',
    readTime: 9
  },
  {
    id: 6,
    title: 'Seasonal Orchid Care: Winter to Summer',
    slug: 'seasonal-orchid-care',
    excerpt: 'Adjust your orchid care routine throughout the year to account for seasonal changes in temperature, humidity, and light.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'seasonal',
    readTime: 8
  },
  {
    id: 7,
    title: 'Orchids for Beginners: Top 5 Easy-to-Grow Varieties',
    slug: 'beginner-orchid-varieties',
    excerpt: 'Start your orchid journey with these forgiving, beautiful varieties perfect for novice growers.',
    image: 'https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'beginner',
    readTime: 5
  },
  {
    id: 8,
    title: 'Creating the Perfect Humidity Environment for Orchids',
    slug: 'orchid-humidity-guide',
    excerpt: 'Learn different methods to increase humidity for your orchids, from humidity trays to room humidifiers.',
    image: 'https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'watering',
    readTime: 6
  },
  {
    id: 9,
    title: 'How to Get Your Orchid to Rebloom',
    slug: 'orchid-reblooming',
    excerpt: 'Discover the secrets to encouraging your orchids to produce new flower spikes and bloom again.',
    image: 'https://images.unsplash.com/photo-1589393922695-ef4c2f9deb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'beginner',
    readTime: 7
  }
]

// Care basics data
const careBasics = [
  {
    title: 'Light',
    description: 'Most orchids need bright, indirect light. Avoid direct sunlight which can burn leaves.',
    icon: <Sun className="h-6 w-6 text-green-600" />
  },
  {
    title: 'Water',
    description: 'Water thoroughly when the potting medium is nearly dry. Frequency varies by species and season.',
    icon: <Droplet className="h-6 w-6 text-green-600" />
  },
  {
    title: 'Temperature',
    description: 'Most common orchids thrive in temperatures between 65-75°F during the day and 55-65°F at night.',
    icon: <Thermometer className="h-6 w-6 text-green-600" />
  },
  {
    title: 'Airflow',
    description: 'Good air circulation helps prevent disease and promotes healthy growth.',
    icon: <Wind className="h-6 w-6 text-green-600" />
  }
]
