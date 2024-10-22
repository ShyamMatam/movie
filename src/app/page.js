'use client'

import { useState, useEffect, useCallback } from 'react';
import { fetchPopularMovies, fetchPopularTVShows, fetchPopularPeople, fetchTopRatedMovies, fetchAiringTodayTVShows, fetchOnTheAirTVShows } from '@/lib/tmdb';
import MediaItem from "@/components/MediaItem";
// import TrendingSection from "@/components/TrendingSection";
import Loading from './loading';
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [people, setPeople] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  // const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [airingTodayTVShows, setAiringTodayTVShows] = useState([]);
  const [onTheAirTVShows, setOnTheAirTVShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [moviesData, tvShowsData, peopleData, topRatedMoviesData, airingTodayTVShowsData, onTheAirTVShowsData] = await Promise.all([
          fetchPopularMovies(),
          fetchPopularTVShows(),
          fetchPopularPeople(),
          fetchTopRatedMovies(),
          // fetchUpcomingMovies(),
          fetchAiringTodayTVShows(),
          fetchOnTheAirTVShows(),
        ]);

        setMovies(moviesData.results.slice(0, 8));
        setTvShows(tvShowsData.results.slice(0, 8));
        setPeople(peopleData.results.slice(0, 8));
        setTopRatedMovies(topRatedMoviesData.results.slice(0, 8));
        // setUpcomingMovies(upcomingMoviesData.results.slice(0, 8));
        setAiringTodayTVShows(airingTodayTVShowsData.results.slice(0, 8));
        setOnTheAirTVShows(onTheAirTVShowsData.results.slice(0, 8));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const toggleWatchlist = useCallback((item, mediaType) => {
    console.log("toggleWatchlist called with:", item, mediaType);
    try {
      setWatchlist(prev => {
        const exists = prev.some(i => i.id === item.id && i.mediaType === mediaType);
        let newWatchlist;
        if (exists) {
          newWatchlist = prev.filter(i => !(i.id === item.id && i.mediaType === mediaType));
        } else {
          newWatchlist = [...prev, { ...item, mediaType }];
        }
        console.log('Watchlist updated:', newWatchlist);
        return newWatchlist;
      });
    } catch (error) {
      console.error("Error in toggleWatchlist:", error);
    }
  }, []);

  const toggleFavorite = useCallback((item, mediaType) => {
    console.log("toggleFavorite called with:", item, mediaType);
    try {
      setFavorites(prev => {
        const exists = prev.some(i => i.id === item.id && i.mediaType === mediaType);
        let newFavorites;
        if (exists) {
          newFavorites = prev.filter(i => !(i.id === item.id && i.mediaType === mediaType));
        } else {
          newFavorites = [...prev, { ...item, mediaType }];
        }
        console.log('Favorites updated:', newFavorites);
        return newFavorites;
      });
    } catch (error) {
      console.error("Error in toggleFavorite:", error);
    }
  }, []);

  const isInWatchlist = useCallback((item, mediaType) => {
    return watchlist.some(i => i.id === item.id && i.mediaType === mediaType);
  }, [watchlist]);

  const isFavorite = useCallback((item, mediaType) => {
    return favorites.some(i => i.id === item.id && i.mediaType === mediaType);
  }, [favorites]);

  const renderMediaItems = (items, mediaType) => {
    return items.map(item => (
      <MediaItem 
        key={item.id} 
        item={item} 
        mediaType={mediaType}
        isInWatchlist={isInWatchlist(item, mediaType)}
        isFavorite={isFavorite(item, mediaType)}
        onToggleWatchlist={() => toggleWatchlist(item, mediaType)}
        onToggleFavorite={() => toggleFavorite(item, mediaType)}
      />
    ));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="container mx-auto py-8 flex-grow bg-white dark:bg-gray-800 text-black dark:text-white">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Popular Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderMediaItems(movies, 'movie')}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Popular TV Shows</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderMediaItems(tvShows, 'tv')}
          </div>
        </section>
 
 {/* top Rated Movies */}
        <section className="mb-8">  
          <h2 className="text-xl font-bold mb-4">Top Rated Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderMediaItems(topRatedMovies, 'movie')}
          </div>
        </section>

        {/* Upcoming Movies */}
        {/* <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderMediaItems(upcomingMovies, 'movie')}
          </div>
        </section>   */}

        {/* Airing Today TV Shows */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Airing Today TV Shows</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderMediaItems(airingTodayTVShows, 'tv')}
          </div>
        </section>

        {/* On The Air TV Shows */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">On The Air TV Shows</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderMediaItems(onTheAirTVShows, 'tv')}
          </div>
        </section>  
        
        {/* <TrendingSection /> */}
      </main>
    </div>
  );
}
