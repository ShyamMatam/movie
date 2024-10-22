'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

const MediaContext = createContext();

export function MediaProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setWatchlist(savedWatchlist);
    setFavorites(savedFavorites);
  }, []);

  const toggleWatchlist = (item) => {
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
  };

  const toggleFavorite = (item) => {
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
  };

  return (
    <MediaContext.Provider value={{ watchlist, favorites, toggleWatchlist, toggleFavorite }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  return useContext(MediaContext);
}
