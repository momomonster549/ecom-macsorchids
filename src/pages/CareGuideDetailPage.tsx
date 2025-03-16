import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'

export const CareGuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  
  // In a real app, you would fetch the guide data based on the slug
  // For this example, we'll use a mock guide
  const guide = {
    title: 'The Complete Guide to Phalaenopsis Orchid Care',
    publishDate: 'May 15, 2023',
    readTime: '12 min read',
    author: 'Dr. Maria Chen',
    authorTitle: 'Botanical Specialist',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    heroImage: 'https://images.unsplash.com/photo-1566907225472-514215c9e5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Beginner Guides',
    content: `
      <h2>Introduction to Phalaenopsis Orchids</h2>
      <p>Phalaenopsis orchids, commonly known as moth orchids, are one of the most popular and beginner-friendly orchid varieties. Their elegant, long-lasting blooms and relatively forgiving nature make them an excellent choice for those new to orchid growing.</p>
      
      <p>Native to tropical regions of Southeast Asia, these epiphytic plants naturally grow attached to trees or rocks rather than in soil. Understanding this natural habitat helps us provide the right conditions for them to thrive in our homes.</p>
      
      <h2>Light Requirements</h2>
      <p>Phalaenopsis orchids prefer bright, indirect light. An east-facing window is ideal, providing gentle morning sun. They can also thrive near north-facing windows with bright, filtered light throughout the day.</p>
      
      <p>Avoid placing your orchid in direct sunlight, especially during the intense midday hours, as this can burn the leaves. Signs of too much light include yellowing or reddish leaves, while dark green leaves may indicate insufficient light.</p>
      
      <div class="tip-box">
        <h4>Light Tip:</h4>
        <p>If you're unsure about light levels, try the "hand test" - hold your hand between your orchid and the light source. If you can see a distinct shadow with clear outlines, the light is appropriate. A very faint shadow means too little light, while a sharp, dark shadow suggests too much direct light.</p>
      </div>
      
      <h2>Watering Your Phalaenopsis</h2>
      <p>Proper watering is perhaps the most crucial aspect of orchid care. Phalaenopsis orchids should be watered thoroughly but allowed to dry out slightly between waterings. The frequency will depend on your home environment, potting medium, and the season.</p>
      
      <p>As a general rule, water your orchid when the potting medium feels dry to the touch about an inch below the surface. In most home environments, this translates to watering once every 7-10 days.</p>
      
      <h3>Watering Methods</h3>
      <ol>
        <li><strong>Sink Method:</strong> Place the orchid pot under a faucet and allow lukewarm water to run through the potting medium for about 15-20 seconds. Let all excess water drain completely before returning the plant to its decorative pot or saucer.</li>
        <li><strong>Soaking Method:</strong> Submerge the orchid pot in a container of lukewarm water for 10-15 minutes, allowing the medium to absorb moisture. Remove and let drain thoroughly.</li>
      </ol>
      
      <div class="warning-box">
        <h4>Important:</h4>
        <p>Never leave your orchid sitting in water, as this can lead to root rot. Always ensure excess water has drained away completely.</p>
      </div>
      
      <h2>Humidity and Air Circulation</h2>
      <p>Phalaenopsis orchids appreciate humidity levels between 50-70%. Most homes, especially in winter with heating systems running, have much lower humidity levels (around 30-40%).</p>
      
      <p>To increase humidity:</p>
      <ul>
        <li>Use a humidity tray (a shallow tray filled with pebbles and water, with the orchid pot sitting on the pebbles above the water line)</li>
        <li>Group plants together to create a microclimate with higher humidity</li>
        <li>Use a room humidifier near your orchids</li>
        <li>Mist the air around your orchids (not directly on the leaves) in the morning so any moisture can evaporate during the day</li>
      </ul>
      
      <p>Good air circulation is equally important to prevent fungal and bacterial issues. A gentle fan nearby or placing orchids where they receive natural air movement helps maintain plant health.</p>
      
      <h2>Temperature Requirements</h2>
      <p>Phalaenopsis orchids are considered "warm-growing" orchids and prefer consistent temperatures:</p>
      <ul>
        <li>Daytime: 70-85°F (21-29°C)</li>
        <li>Nighttime: 60-70°F (16-21°C)</li>
      </ul>
      
      <p>They can tolerate temperatures as low as 55°F (13°C) and as high as 95°F (35°C) for short periods, but prolonged exposure to temperature extremes can stress the plant and affect blooming.</p>
      
      <p>A temperature differential between day and night of about 10-15°F can help trigger blooming in mature plants.</p>
      
      <h2>Fertilizing Your Phalaenopsis</h2>
      <p>Orchids benefit from regular but dilute fertilization. Use a balanced orchid fertilizer (such as 20-20-20) diluted to ¼ to ½ the recommended strength.</p>
      
      <p>During active growth (spring and summer), fertilize every 2-3 weeks. Reduce to once a month during fall and winter when growth slows. Always apply fertilizer to damp potting medium, never to dry roots.</p>
      
      <p>Every fourth watering, use plain water without fertilizer to flush out any accumulated salts from the potting medium.</p>
      
      <h2>Repotting</h2>
      <p>Phalaenopsis orchids typically need repotting every 1-2 years, or when:</p>
      <ul>
        <li>The potting medium has broken down and retains too much moisture</li>
        <li>Roots are growing out of the pot or over the edge</li>
        <li>The plant has outgrown its container</li>
      </ul>
      
      <p>The best time to repot is after flowering, when new growth begins (usually in spring). Use a specialized orchid potting mix that provides good drainage and aeration.</p>
      
      <h2>Encouraging Reblooming</h2>
      <p>Phalaenopsis orchids typically bloom once a year, with flowers lasting 2-3 months. To encourage reblooming:</p>
      
      <ol>
        <li>Provide a slight temperature drop at night (about 10-15°F cooler than daytime)</li>
        <li>Ensure the plant receives adequate light</li>
        <li>Continue regular care with proper watering and fertilizing</li>
        <li>After the flowers fade, cut the flower spike just above a visible node (joint) if the stem is still green. A new flower spike may develop from this node.</li>
      </ol>
      
      <p>If the flower spike turns yellow or brown, cut it off at the base of the plant and allow the orchid to focus on vegetative growth until the next blooming cycle.</p>
      
      <h2>Troubleshooting Common Issues</h2>
      
      <h3>Yellow Leaves</h3>
      <p>A few yellow bottom leaves are normal as older leaves age and are replaced. However, excessive yellowing may indicate:</p>
      <ul>
        <li>Overwatering or poor drainage</li>
        <li>Too much direct sunlight</li>
        <li>Nutrient deficiencies</li>
      </ul>
      
      <h3>Wrinkled Leaves</h3>
      <p>Wrinkled, leathery leaves usually indicate dehydration, which can be caused by:</p>
      <ul>
        <li>Underwatering</li>
        <li>Root damage or rot preventing water uptake</li>
        <li>Extremely low humidity</li>
      </ul>
      
      <h3>Root Problems</h3>
      <p>Healthy Phalaenopsis roots are firm and silvery-green when dry, turning bright green when wet. Brown, mushy roots indicate rot, usually from overwatering or poor drainage.</p>
      
      <h2>Conclusion</h2>
      <p>With their stunning blooms and relatively straightforward care requirements, Phalaenopsis orchids make rewarding houseplants. By providing the right balance of light, water, humidity, and nutrients, you can enjoy these elegant plants for many years, with regular displays of their magnificent flowers.</p>
      
      <p>Remember that orchids are resilient plants that have evolved to withstand varying conditions in their natural habitats. Don't be discouraged by small setbacks - with observation and consistent care, your Phalaenopsis will thrive and reward you with its beautiful blooms.</p>
    `
  }
  
  // Related guides would be dynamically generated in a real app
  const relatedGuides = [
    {
      id: 1,
      title: 'Watering Orchids: How Often and How Much',
      slug: 'watering-orchids',
      image: 'https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      title: 'Light Requirements for Healthy Orchids',
      slug: 'orchid-light-requirements',
      image: 'https://images.unsplash.com/photo-1589393922695-ef4c2f9deb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 3,
      title: 'Repotting Your Orchid: Step-by-Step Guide',
      slug: 'repotting-orchids',
      image: 'https://images.unsplash.com/photo-1622467827417-bbe6542801eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    }
  ]

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Care Guides', path: '/care-guides' },
            { label: guide.title, path: `/care-guides/${slug}` }
          ]} 
        />
        
        {/* Hero Section */}
        <div className="mt-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                {guide.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{guide.title}</h1>
            </div>
            <Link 
              to="/care-guides" 
              className="mt-4 md:mt-0 inline-flex items-center text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guides
            </Link>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {guide.publishDate}
            </span>
            <span className="mx-3">•</span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {guide.readTime}
            </span>
          </div>
          
          <div className="relative rounded-lg overflow-hidden mb-8">
            <img 
              src={guide.heroImage} 
              alt={guide.title}
              className="w-full h-96 object-cover"
            />
          </div>
          
          {/* Author Info */}
          <div className="flex items-center mb-8 p-4 bg-green-50 rounded-lg">
            <img 
              src={guide.authorImage} 
              alt={guide.author}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-medium text-gray-900">{guide.author}</h3>
              <p className="text-sm text-gray-600">{guide.authorTitle}</p>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="prose prose-green max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
        </div>
        
        {/* Styling for custom content boxes */}
        <style jsx>{`
          .prose .tip-box, .prose .warning-box {
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 0.5rem;
          }
          
          .prose .tip-box {
            background-color: #f0fdf4;
            border-left: 4px solid #16a34a;
          }
          
          .prose .warning-box {
            background-color: #fff7ed;
            border-left: 4px solid #ea580c;
          }
          
          .prose .tip-box h4, .prose .warning-box h4 {
            margin-top: 0;
            color: #166534;
          }
          
          .prose .warning-box h4 {
            color: #9a3412;
          }
        `}</style>
        
        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-10 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGuides.map(guide => (
              <Link 
                key={guide.id}
                to={`/care-guides/${guide.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={guide.image} 
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                      {guide.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-gray-100 rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Enjoyed this guide?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for more care tips, guides, and updates on new orchid varieties.
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
        
        {/* Navigation between guides */}
        <div className="flex justify-between border-t border-gray-200 pt-6">
          <Link 
            to="/care-guides/watering-orchids" 
            className="flex items-center text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>
              <div className="text-sm text-gray-500">Previous</div>
              <div className="font-medium">Watering Orchids</div>
            </span>
          </Link>
          
          <Link 
            to="/care-guides/orchid-light-requirements" 
            className="flex items-center text-right text-green-600 hover:text-green-700"
          >
            <span>
              <div className="text-sm text-gray-500">Next</div>
              <div className="font-medium">Light Requirements</div>
            </span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
