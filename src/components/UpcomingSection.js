'use client';

import { useState, useEffect } from 'react';
import { fetchUpcoming } from '../pages/api/tmdb';
import MovieCard from './MovieCard';

export default function UpcomingSection() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUpcoming();
  }, []);

  async function loadUpcoming(reset = false) {
    setIsLoading(true);
    try {
      const newPage = reset ? 1 : page;
      const data = await fetchUpcoming(newPage);
      setUpcomingMovies(prev => reset ? data.results : [...prev, ...data.results]);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {upcomingMovies.map((movie) => (
          <MovieCard key={movie.id} item={movie} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => loadUpcoming()}
          disabled={isLoading}
          className="bg-[#032541] hover:bg-[#01b4e4] text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-300"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </section>
  );
}
