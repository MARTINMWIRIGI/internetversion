"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LayerCardProps {
  title: string
  description: string
  icon: string
  color: string
  dataCount: number
  isActive: boolean
}

export function LayerCard({ title, description, icon, color, dataCount, isActive }: LayerCardProps) {
  return (
    <Card className={`border-2 ${isActive ? 'border-purple-500' : 'border-gray-700'} bg-gray-900/50`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center`}>
              <span className="text-lg">{icon}</span>
            </div>
            {title}
          </CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
            {dataCount} items
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400">{description}</p>
        {isActive ? (
          <button className="mt-3 w-full py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition text-sm">
            View Layer
          </button>
        ) : (
          <button className="mt-3 w-full py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition text-sm">
            Add Data
          </button>
        )}
      </CardContent>
    </Card>
  )
}