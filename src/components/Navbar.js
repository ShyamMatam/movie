import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'
import SearchBar from './SearchBar'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-teal-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-extrabold text-white hover:text-pink-200 transition-colors duration-200">
              TMDb
            </Link>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-500 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/movie" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105">
              Movie
            </Link>
            <Link href="/tv" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105">
              TV Shows
            </Link>
            <Link href="/people" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105">
              People
            </Link>
            <SearchBar />
            <Link href="/watchlist" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105">
              Watchlist
            </Link>
            <Link href="/favorites" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105">
              Favorites
            </Link>
            <DarkModeToggle />
          </div>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-purple-700 bg-opacity-50 rounded-lg mt-2">
            <Link href="/movie" className="block text-white hover:bg-purple-500 hover:bg-opacity-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Movie
            </Link>
            <Link href="/tv" className="block text-white hover:bg-purple-500 hover:bg-opacity-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              TV Shows
            </Link>
            <Link href="/people" className="block text-white hover:bg-purple-500 hover:bg-opacity-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              People
            </Link>
            <div className="px-3 py-2">
              <SearchBar />
            </div>
            <Link href="/watchlist" className="block text-white hover:bg-purple-500 hover:bg-opacity-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Watchlist
            </Link>
            <Link href="/favorites" className="block text-white hover:bg-purple-500 hover:bg-opacity-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Favorites
            </Link>
            <div className="px-3 py-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
