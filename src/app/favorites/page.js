'use client'

import { useMedia } from '../../contexts/MediaContext';
import MediaItem from '../../components/MediaItem';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites } = useMedia();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <p className="text-2xl mb-4 text-black">Your favorites list is empty.</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline text-lg">
          Go to Home to add movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-800 white:bg-white">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Your Favorites</h1>
      </header>
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(item => (
            <MediaItem key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}