import React from 'react';

const TVShowDetails = ({ tvShow, credits }) => {
  if (!tvShow || !credits) {
    return <div className="text-center text-2xl mt-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Poster */}
          <div className="md:w-1/3">
            {tvShow.poster_path && (
              <img 
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} 
                alt={tvShow.name}
                className="w-full h-full object-cover" 
              />
            )}
          </div>
          
          {/* Content */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{tvShow.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">First Air: {tvShow.first_air_date}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Rating: {tvShow.vote_average}/10</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Seasons: {tvShow.number_of_seasons}</span>
              <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded">Episodes: {tvShow.number_of_episodes}</span>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Overview</h2>
            <p className="text-gray-700 mb-6">{tvShow.overview}</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Genres</h2>
            <ul className="flex flex-wrap gap-2 mb-6">
              {tvShow.genres && tvShow.genres.map(genre => (
                <li key={genre.id} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </li>
              ))}
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Top Cast</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credits.cast && credits.cast.slice(0, 6).map(actor => (
                <li key={actor.id} className="bg-gray-50 p-4 rounded-lg shadow">
                  <span className="font-semibold text-gray-900">{actor.name}</span>
                  <br />
                  <span className="text-gray-600">as {actor.character}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetails;
