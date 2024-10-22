'use client'

import { useState, useEffect } from "react";
import MediaItem from "@/components/MediaItem";
import Pagination from "@/components/Pagination";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function TVShows() {
  const [tvShows, setTVShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchTVShows(currentPage);
    loadUserPreferences();
  }, [currentPage]);

  const fetchTVShows = async (page) => {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      if (!response.ok) throw new Error('Failed to fetch TV shows');
      const data = await response.json();
      setTVShows(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  const loadUserPreferences = () => {
    try {
      const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setWatchlist(storedWatchlist);
      setFavorites(storedFavorites);
    } catch (error) {
      console.error("Error loading user preferences:", error);
    }
  };

  const toggleWatchlist = (item) => {
    setWatchlist(prevWatchlist => {
      const newWatchlist = prevWatchlist.some(i => i.id === item.id)
        ? prevWatchlist.filter(i => i.id !== item.id)
        : [...prevWatchlist, item];
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      return newWatchlist;
    });
  };

  const toggleFavorite = (item) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.some(i => i.id === item.id)
        ? prevFavorites.filter(i => i.id !== item.id)
        : [...prevFavorites, item];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Popular TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tvShows.map(show => (
          <MediaItem
            key={show.id}
            item={show}
            onToggleWatchlist={toggleWatchlist}
            onToggleFavorite={toggleFavorite}
            watchlist={watchlist}
            favorites={favorites}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
