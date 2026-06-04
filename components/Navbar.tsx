'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn, logout } from '@/lib/store'

interface NavbarProps {
  onBookNow?: () => void
}

export default function Navbar({ onBookNow }: NavbarProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => { setLoggedIn(isLoggedIn()) }, [])

  function handleLogout() {
    logout()
    setLoggedIn(false)
    router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-white font-bold text-xl tracking-tight">
          EOI<span className="text-red-500">.</span>
        </Link>

        <div className="flex items-center gap-3">
          {loggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              Login
            </Link>
          )}

          {onBookNow && (
            <button
              onClick={onBookNow}
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all ml-1"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
