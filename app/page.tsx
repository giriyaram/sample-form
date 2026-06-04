'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import FormModal from '@/components/FormModal'

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar onBookNow={() => setShowForm(true)} />

      <main className="flex items-center justify-center min-h-screen px-4 pt-16">
        <div className="text-center max-w-2xl">
          <span className="inline-block text-red-400 text-xs font-bold tracking-widest uppercase mb-5 bg-red-400/10 px-4 py-1.5 rounded-full border border-red-400/20">
            Expression of Interest
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
            Your Dream Home<br />
            <span className="text-red-500">Awaits.</span>
          </h1>

          <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-lg mx-auto">
            Register your interest in our premium residences. Limited units available across 3 exclusive towers with world-class amenities.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all duration-150 shadow-lg shadow-red-600/30"
          >
            Register Interest →
          </button>

          <div className="flex gap-10 justify-center mt-16">
            {[['3', 'Towers'], ['4', 'Unit Sizes'], ['50+', 'Floors'], ['500+', 'Units']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-white">{num}</div>
                <div className="text-slate-500 text-xs mt-1 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showForm && <FormModal onClose={() => setShowForm(false)} />}
    </div>
  )
}
