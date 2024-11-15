'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const searchParams = new URLSearchParams({ q: query });
      router.push(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex items-center dark:border-white">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, TV shows, people..."
          className="px-4 py-2 rounded-l-full white:text-black dark:text-white w-full sm:w-64"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black px-4 py-2 rounded-r-full hover:bg-yellow-600"
        >
          Search
        </button>
      </form>
    </div>
  );
}


