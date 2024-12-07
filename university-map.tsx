'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RatingWindow } from './rating-window'
import { Button } from '@/components/ui/button'
import { pathPoints } from '../data/paths'

export function UniversityMap() {
  const [currentPoint, setCurrentPoint] = useState(0)
  const [showRating, setShowRating] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const moveToNextPoint = () => {
    setCurrentPoint((prev) => (prev + 1) % pathPoints.length)
  }

  const handleSlide = (direction: 'left' | 'right') => {
    setCurrentSlide((prev) => {
      if (direction === 'left') {
        return prev === 0 ? 0 : prev - 1
      }
      return prev === 7 ? 7 : prev + 1
    })
  }

  return (
    <div className="relative w-[980px] h-[630px] bg-emerald-600">
      {/* Background Map Image */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=630&width=980')] bg-cover" />
      
      {/* Character */}
      <motion.div
        className="absolute w-8 h-16"
        animate={{
          x: pathPoints[currentPoint].x,
          y: pathPoints[currentPoint].y,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* Bottom UI */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
        {/* Avatar Slider */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSlide('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2 overflow-hidden w-[400px]">
            <motion.div
              className="flex gap-2"
              animate={{
                x: -currentSlide * 52, // 48px avatar + 4px gap
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-white/20 flex-shrink-0"
                />
              ))}
            </motion.div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSlide('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Center Button */}
        <Button
          className="px-8 py-2 bg-brown-500 text-white"
          onClick={moveToNextPoint}
        >
          В УНИВЕР
        </Button>

        {/* Rating Button */}
        <Button
          variant="ghost"
          size="icon"
          className="bg-yellow-500"
          onClick={() => setShowRating(true)}
        >
          <span className="sr-only">Show Rating</span>
          <div className="w-6 h-6 bg-yellow-600" />
        </Button>
      </div>

      {/* Rating Window */}
      <AnimatePresence>
        {showRating && (
          <RatingWindow onClose={() => setShowRating(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

