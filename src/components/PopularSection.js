'use client';

import { useState, useEffect } from 'react';
import { fetchPopular } from '../pages/api/tmdb';
import MovieCard from './MovieCard';

export default function PopularSection() {
  const [popularItems, setPopularItems] = useState([]);
  const [mediaType, setMediaType] = useState('movie');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPopular();
  }, [mediaType]);

  async function loadPopular(reset = false) {
    setIsLoading(true);
    try {
      const newPage = reset ? 1 : page;
      const data = await fetchPopular(mediaType, newPage);
      setPopularItems(prev => reset ? data.results : [...prev, ...data.results]);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error fetching popular items:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleMediaTypeChange = (newMediaType) => {
    setMediaType(newMediaType);
    setPage(1);
    loadPopular(true);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold mr-4">Popular</h2>
        <button
          onClick={() => handleMediaTypeChange('movie')}
          className={`mr-2 px-4 py-2 rounded ${mediaType === 'movie' ? 'bg-[#032541] text-white' : 'bg-gray-200'}`}
        >
          Movies
        </button>
        <button
          onClick={() => handleMediaTypeChange('tv')}
          className={`px-4 py-2 rounded ${mediaType === 'tv' ? 'bg-[#032541] text-white' : 'bg-gray-200'}`}
        >
          TV Shows
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {popularItems.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => loadPopular()}
          disabled={isLoading}
          className="bg-[#032541] hover:bg-[#01b4e4] text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-300"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </section>
  );
}
