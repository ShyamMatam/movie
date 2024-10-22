'use client';

import { useState, useEffect } from 'react';
import { fetchTrending } from '@/lib/tmdb';
import MovieCard from './MovieCard';

export default function TrendingSection() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTrending();
  }, [timeWindow]);

  async function loadTrending(reset = false) {
    setIsLoading(true);
    try {
      const newPage = reset ? 1 : page;
      const data = await fetchTrending('all', timeWindow, newPage);
      setTrendingItems(prev => reset ? data.results : [...prev, ...data.results]);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error fetching trending items:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTimeWindowChange = (newTimeWindow) => {
    setTimeWindow(newTimeWindow);
    setPage(1);
    loadTrending(true);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold mr-4">Trending</h2>
        <button
          onClick={() => handleTimeWindowChange('day')}
          className={`mr-2 px-4 py-2 rounded ${timeWindow === 'day' ? 'bg-[#032541] text-white' : 'bg-gray-200'}`}
        >
          Today
        </button>
        <button
          onClick={() => handleTimeWindowChange('week')}
          className={`px-4 py-2 rounded ${timeWindow === 'week' ? 'bg-[#032541] text-white' : 'bg-gray-200'}`}
        >
          This Week
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {trendingItems.map((item) => (
          <MovieCard key={`${item.id}-${item.media_type}`} item={item} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => loadTrending()}
          disabled={isLoading}
          className="bg-[#032541] hover:bg-[#01b4e4] text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-300"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </section>
  );
}
