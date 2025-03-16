import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  productName: string
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  const mainImageRef = useRef<HTMLDivElement>(null)
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    setIsZoomed(false)
  }
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    setIsZoomed(false)
  }
  
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    setIsZoomed(false)
  }
  
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed || !mainImageRef.current) return
    
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    
    setZoomPosition({ x, y })
  }
  
  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      handleNext()
    }
    
    if (isRightSwipe) {
      handlePrevious()
    }
    
    setTouchStart(null)
    setTouchEnd(null)
  }
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomed])
  
  // Preload adjacent images
  useEffect(() => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    
    const preloadImages = [images[prevIndex], images[nextIndex]]
    
    preloadImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [currentIndex, images])
  
  return (
    <div className="w-full">
      {/* Main Image */}
      <div 
        ref={mainImageRef}
        className={`relative overflow-hidden rounded-lg mb-4 ${
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={handleZoomToggle}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="aspect-w-1 aspect-h-1 bg-gray-100">
          <img
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : undefined
            }
          />
        </div>
        
        {/* Navigation Arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            handlePrevious()
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        
        {/* Zoom Button */}
        <button
          className="absolute bottom-2 right-2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            handleZoomToggle()
          }}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {images.map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? 'border-green-600 opacity-100'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View image ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
