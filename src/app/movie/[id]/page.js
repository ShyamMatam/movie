'use client';


import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaStar, FaHeart, FaBookmark, FaMoneyBillWave } from 'react-icons/fa';
import { useMedia } from '../../../contexts/MediaContext';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { watchlist, favorites, toggleWatchlist, toggleFavorite } = useMedia();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
        ]);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const [movieData, creditsData] = await Promise.all([
          movieResponse.json(),
          creditsResponse.json()
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 5)); // Get top 5 cast members
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No movie data available</div>;
  }

  const isInWatchlist = watchlist.some(item => item.id === movie.id);
  const isInFavorites = favorites.some(item => item.id === movie.id);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-1/3">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full h-auto"
            />
          ) : (
            <div className="w-full h-[750px] bg-gray-200 flex items-center justify-center">
              No image available
            </div>
          )}
        </div>
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-bold mb-4 text-indigo-600">{movie.title}</h1>
          <div className="flex items-center mb-4 text-gray-600">
            {movie.vote_average !== undefined && (
              <>
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="mx-2">|</span>
              </>
            )}
            {movie.release_date && (
              <>
                <span>{movie.release_date}</span>
                <span className="mx-2">|</span>
              </>
            )}
            {movie.runtime && <span>{movie.runtime} min</span>}
          </div>
          {movie.overview && <p className="text-gray-700 mb-4">{movie.overview}</p>}
          {cast.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-indigo-600">Top Cast</h2>
              <ul className="list-disc list-inside text-gray-700">
                {cast.map((actor) => (
                  <li key={actor.id}><span className="font-medium">{actor.name}</span> as {actor.character}</li>
                ))}
              </ul>
            </div>
          )}
          {(movie.budget > 0 || movie.revenue > 0) && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-indigo-600">Box Office</h2>
              {movie.budget > 0 && (
                <p className="text-gray-700"><strong>Budget:</strong> <span className="text-green-600">${movie.budget.toLocaleString()}</span></p>
              )}
              {movie.revenue > 0 && (
                <p className="text-gray-700"><strong>Revenue:</strong> <span className="text-green-600">${movie.revenue.toLocaleString()}</span></p>
              )}
            </div>
          )}
          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-indigo-600">Genres</h2>
              <p className="text-gray-700">{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          )}
          <div className="flex space-x-4">
            <button
              onClick={() => toggleWatchlist(movie)}
              className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                isInWatchlist ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <FaBookmark className="mr-2" />
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
            <button
              onClick={() => toggleFavorite(movie)}
              className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                isInFavorites ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <FaHeart className="mr-2" />
              {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
