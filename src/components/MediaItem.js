'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaStar } from 'react-icons/fa';
import { useMedia } from '../contexts/MediaContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function MediaItem({ item }) {
  const { watchlist, favorites, toggleWatchlist, toggleFavorite } = useMedia();
  const [showDetails, setShowDetails] = useState(false);

  // Determine media type based on the presence of certain properties
  const mediaType = item.first_air_date ? 'tv' : 'movie';

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const imagePath = item.poster_path;
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const overview = item.overview;

  const isInWatchlist = watchlist.some(watch => watch.id === item.id);
  const isInFavorites = favorites.some(fav => fav.id === item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link href={`/${mediaType}/${item.id}`}>
        <div className="relative h-80 w-full">
          <Image
            src={`https://image.tmdb.org/t/p/w500${imagePath}`}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
            <h3 className="text-white font-bold text-lg p-2 bg-gradient-to-r from-black to-transparent w-full">
              {title}
            </h3>
          </div>
        </div>
      </Link>
      <div className="p-4 bg-white bg-opacity-90">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            {releaseDate && new Date(releaseDate).getFullYear()}
          </span>
          <div className="flex items-center bg-yellow-400 rounded-full px-2 py-1">
            <FaStar className="text-white mr-1" />
            <span className="font-bold text-white">{rating}</span>
          </div>
        </div>
        <div className="flex justify-between space-x-2">
          <button
            onClick={() => toggleWatchlist(item)}
            className="text-2xl focus:outline-none transition duration-300 transform hover:scale-110"
            title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            {isInWatchlist ? <FaBookmark className="text-blue-500" /> : <FaRegBookmark className="text-gray-500" />}
          </button>
          <button
            onClick={() => toggleFavorite(item)}
            className="text-2xl focus:outline-none transition duration-300 transform hover:scale-110"
            title={isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            {isInFavorites ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
          </button>
        </div>
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-sm text-gray-700"
            >
              <p>{overview}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


