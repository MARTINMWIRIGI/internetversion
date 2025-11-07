"use client"

import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TooltipHelpProps {
  term: string
  description: string
  className?: string
}

export function TooltipHelp({ term, description, className = "" }: TooltipHelpProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors ${className}`}
          >
            <span>{term}</span>
            <HelpCircle className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-purple-900 border border-purple-500/30 text-gray-200 max-w-xs text-sm">
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
