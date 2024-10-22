import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              TMDb 
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/movie" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Movie
            </Link>
            <Link href="/tv" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              TV Shows
            </Link>
            <Link href="/people" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              People
            </Link>
            <SearchBar />
            <Link href="/watchlist" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Watchlist
            </Link>
            <Link href="/favorites" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Favorites
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
