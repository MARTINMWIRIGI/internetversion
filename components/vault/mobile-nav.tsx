"use client"

import { useState } from "react"
import { Menu, X, Home, Layers, User, Settings } from "lucide-react"

export function MobileVaultNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true },
    { icon: <Layers size={20} />, label: "Layers", active: false },
    { icon: <User size={20} />, label: "Profile", active: false },
    { icon: <Settings size={20} />, label: "Settings", active: false },
  ]

  return (
    <>
      {/* Mobile Nav Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 rounded-t-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Vault Navigation</h3>
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${
                    item.active 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">Need help?</div>
                <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}