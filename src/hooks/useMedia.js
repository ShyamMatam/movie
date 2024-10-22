import { useState, useEffect, useCallback } from 'react';

export function useMedia() {
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load saved watchlist and favorites from localStorage
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setWatchlist(savedWatchlist);
    setFavorites(savedFavorites);
  }, []);

  const toggleWatchlist = useCallback((item) => {
    setWatchlist(prevWatchlist => {
      const isInWatchlist = prevWatchlist.some(watch => watch.id === item.id);
      let newWatchlist;
      if (isInWatchlist) {
        newWatchlist = prevWatchlist.filter(watch => watch.id !== item.id);
      } else {
        newWatchlist = [...prevWatchlist, item];
      }
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      return newWatchlist;
    });
  }, []);

  const toggleFavorite = useCallback((item) => {
    setFavorites(prevFavorites => {
      const isInFavorites = prevFavorites.some(fav => fav.id === item.id);
      let newFavorites;
      if (isInFavorites) {
        newFavorites = prevFavorites.filter(fav => fav.id !== item.id);
      } else {
        newFavorites = [...prevFavorites, item];
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  return { watchlist, favorites, toggleWatchlist, toggleFavorite };
}
