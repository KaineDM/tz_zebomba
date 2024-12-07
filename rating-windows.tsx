'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { RatingEntry, Friend } from '../types'

interface RatingWindowProps {
  onClose: () => void
}

// Это обычно должно приходить из вашего файла data.js
const mockRating: RatingEntry[] = Array.from({ length: 20 }).map((_, i) => ({
  position: i + 1,
  name: `Студент ${i + 1}`,
  score: Math.floor(Math.random() * 1000),
}))

const mockFriends: Friend[] = [
  { id: 1, name: 'Студент 3' },
  { id: 2, name: 'Студент 7' },
]

export function RatingWindow({ onClose }: RatingWindowProps) {
  const isFriend = (name: string) => mockFriends.some(friend => friend.name === name)

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ type: 'spring', damping: 20 }}
      className="absolute top-0 left-0 right-0 bg-white rounded-b-lg shadow-lg"
    >
      <div className="p-4 flex items-center justify-between border-b">
        <h2 className="text-xl font-bold">Рейтинг</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[400px] p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Позиция</th>
              <th className="text-left p-2">Имя</th>
              <th className="text-left p-2">Очки</th>
            </tr>
          </thead>
          <tbody>
            {mockRating.map((entry) => (
              <tr
                key={entry.position}
                className={isFriend(entry.name) ? 'bg-blue-100' : undefined}
              >
                <td className="p-2">{entry.position}</td>
                <td className="p-2">{entry.name}</td>
                <td className="p-2">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </motion.div>
  )
}

