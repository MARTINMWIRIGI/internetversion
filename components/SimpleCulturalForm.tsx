"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Save, CheckCircle, Globe } from 'lucide-react'

export default function SimpleCulturalForm() {
  const [formData, setFormData] = useState({
    language1: '',
    language2: '', 
    language3: '',
    language4: '',
    culturalPractice: '',
    location: '',
    description: '',
    source: '',
    yearDocumented: new Date().getFullYear().toString()
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    // Validate at least one language is filled
    if (!formData.language1.trim()) {
      setError('Please fill in at least Language 1')
      setSaving(false)
      return
    }

    try {
      const supabase = createClient()

      // Prepare data for Supabase
      const culturalData = {
        languages: [
          formData.language1.trim(),
          formData.language2.trim(),
          formData.language3.trim(),
          formData.language4.trim()
        ].filter(lang => lang.length > 0), // Remove empty strings
        
        cultural_practice: formData.culturalPractice.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        source: formData.source.trim(),
        year_documented: parseInt(formData.yearDocumented) || new Date().getFullYear(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Save to Supabase
      const { data, error: supabaseError } = await supabase
        .from('cultural_records')
        .insert([culturalData])
        .select()

      if (supabaseError) throw supabaseError

      console.log('✅ Saved to Supabase:', data)

      setSuccess(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          language1: '',
          language2: '',
          language3: '',
          language4: '',
          culturalPractice: '',
          location: '',
          description: '',
          source: '',
          yearDocumented: new Date().getFullYear().toString()
        })
        setSuccess(false)
      }, 3000)

    } catch (err: any) {
      console.error('Error saving cultural data:', err)
      setError(err.message || 'Failed to save cultural data. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4 md:p-8"
    >
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Cultural Heritage Record
          </h1>
        </div>
        <p className="text-gray-400">
          Document and preserve cultural practices and languages for future generations
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-red-400 text-lg">⚠</span>
            </div>
            <p className="text-red-400">{error}</p>
          </div>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-1">Success!</h3>
              <p className="text-green-300">
                Cultural data has been preserved in the Soul Internet vault.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <span className="text-cyan-400 text-xl">🌍</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Languages to Preserve</h2>
              <p className="text-gray-400 text-sm">Record up to 4 languages associated with this cultural practice</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['language1', 'language2', 'language3', 'language4'].map((field, index) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Language {index + 1} {index === 0 && <span className="text-red-400">*</span>}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required={index === 0}
                  placeholder={`e.g., ${['Swahili', 'Kikuyu', 'Meru', 'Maasai'][index]}`}
                  className="w-full bg-black/30 border border-gray-700/50 rounded-xl px-4 py-3 text-white 
                           placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 
                           hover:border-gray-600 transition-colors backdrop-blur-sm"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cultural Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-purple-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <span className="text-purple-400 text-xl">🎭</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Cultural Details</h2>
              <p className="text-gray-400 text-sm">Provide information about the cultural practice</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Cultural Practice <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="culturalPractice"
                  value={formData.culturalPractice}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Traditional Dance, Wedding Ceremony, Harvest Ritual"
                  className="w-full bg-black/30 border border-gray-700/50 rounded-xl px-4 py-3 text-white 
                           placeholder:text-gray-500 focus:outline-none focus:border-purple-500 
                           hover:border-gray-600 transition-colors backdrop-blur-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Mount Kenya Region, Coastal Kenya, Rift Valley"
                  className="w-full bg-black/30 border border-gray-700/50 rounded-xl px-4 py-3 text-white 
                           placeholder:text-gray-500 focus:outline-none focus:border-purple-500 
                           hover:border-gray-600 transition-colors backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Source</label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700/50 rounded-xl px-4 py-3 text-white 
                           focus:outline-none focus:border-blue-500 hover:border-gray-600 
                           transition-colors backdrop-blur-sm"
                >
                  <option value="">Select source...</option>
                  <option value="personal_knowledge">Personal/Family Knowledge</option>
                  <option value="community_elder">Community Elder</option>
                  <option value="cultural_practitioner">Cultural Practitioner</option>
                  <option value="documented_research">Documented Research</option>
                  <option value="oral_history">Oral History</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Year Documented</label>
                <input
                  type="number"
                  name="yearDocumented"
                  value={formData.yearDocumented}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full bg-black/30 border border-gray-700/50 rounded-xl px-4 py-3 text-white 
                           placeholder:text-gray-500 focus:outline-none focus:border-blue-500 
                           hover:border-gray-600 transition-colors backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the cultural practice in detail. Include its significance, when it's performed, who participates, and any special rituals or meanings..."
                className="w-full bg-black/30 border border-gray-700/50 rounded-xl px-4 py-3 text-white 
                         placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 
                         hover:border-gray-600 transition-colors backdrop-blur-sm resize-none"
              />
              <p className="text-gray-500 text-sm mt-2">
                Your description helps preserve the cultural context for future generations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 
                   bg-gradient-to-r from-gray-900/30 to-black/30 rounded-2xl border border-gray-700/50"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Ready to Preserve?</h3>
            <p className="text-gray-400 text-sm">
              Your contribution helps save endangered cultural heritage on the blockchain
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 
                     rounded-xl font-bold text-white hover:shadow-lg hover:shadow-cyan-500/30 
                     transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-3 min-w-[200px] justify-center"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving to Vault...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Cultural Record</span>
                <span className="absolute -top-2 -right-2 px-2 py-1 bg-white/10 backdrop-blur-sm 
                              rounded-full text-xs text-cyan-300 border border-cyan-500/30">
                  Secure
                </span>
              </>
            )}
          </button>
        </motion.div>
      </form>

      {/* Info Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 pt-8 border-t border-gray-800/50 text-center"
      >
        <p className="text-gray-500 text-sm">
          💎 All cultural data is encrypted and stored immutably on the blockchain
        </p>
        <p className="text-gray-600 text-xs mt-2">
          This form supports the preservation of endangered languages and cultural practices
        </p>
      </motion.div>
    </motion.div>
  )
}