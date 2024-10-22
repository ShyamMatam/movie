'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MediaItem from '@/components/MediaItem';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <header className="bg-blue-600 text-white p-4 mb-8">
      <h1 className="text-2xl font-bold ">Search Results for "{query}"</h1>
            
        </header>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map(item => (
            <MediaItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

