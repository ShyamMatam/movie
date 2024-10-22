'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaImdb, FaInstagram, FaTwitter, FaFacebookF, FaBirthdayCake, FaMapMarkerAlt, FaFilm } from 'react-icons/fa';
import { motion } from 'framer-motion';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function PersonDetails({ params }) {
  const { id } = params;
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        setIsLoading(true);
        const [personResponse, creditsResponse] = await Promise.all([
          fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`)
        ]);

        if (!personResponse.ok || !creditsResponse.ok) {
          throw new Error('Failed to fetch person details');
        }

        const [personData, creditsData] = await Promise.all([
          personResponse.json(),
          creditsResponse.json()
        ]);

        setPerson(personData);
        setCredits(creditsData.cast.slice(0, 12)); // Get top 12 movie credits
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div></div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!person) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto  rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-1/3 flex justify-center items-center p-8 bg-gradient-to-b from-indigo-200 to-purple-200">
            {person.profile_path ? (
              <div className="rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt={person.name}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <div className="w-64 h-64 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                No image available
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-8">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-indigo-700 mb-4"
            >
              {person.name}
            </motion.h1>
            <div className="flex items-center mb-6 space-x-4">
              {person.imdb_id && (
                <a href={`https://www.imdb.com/name/${person.imdb_id}`} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200">
                  <FaImdb size={28} />
                </a>
              )}
              {person.instagram_id && (
                <a href={`https://www.instagram.com/${person.instagram_id}`} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-colors duration-200">
                  <FaInstagram size={28} />
                </a>
              )}
              {person.twitter_id && (
                <a href={`https://twitter.com/${person.twitter_id}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 transition-colors duration-200">
                  <FaTwitter size={28} />
                </a>
              )}
              {person.facebook_id && (
                <a href={`https://www.facebook.com/${person.facebook_id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  <FaFacebookF size={28} />
                </a>
              )}
            </div>
            <div className="space-y-3 text-gray-700">
              {person.birthday && (
                <p className="flex items-center"><FaBirthdayCake className="mr-2 text-indigo-500" /> <span className="font-semibold">Birthday:</span> {person.birthday}</p>
              )}
              {person.place_of_birth && (
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-indigo-500" /> <span className="font-semibold">Place of Birth:</span> {person.place_of_birth}</p>
              )}
              {person.known_for_department && (
                <p className="flex items-center"><FaFilm className="mr-2 text-indigo-500" /> <span className="font-semibold">Known For:</span> {person.known_for_department}</p>
              )}
            </div>
            {person.biography && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Biography</h2>
                <p className="text-gray-700 leading-relaxed">{person.biography}</p>
              </motion.div>
            )}
          </div>
        </div>
        {credits.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 bg-gray-50"
          >
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Known For</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {credits.map((movie) => (
                <Link href={`/movie/${movie.id}`} key={movie.id}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200"
                  >
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        width={200}
                        height={300}
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="w-full h-[150px] bg-gray-300 flex items-center justify-center">
                        No image
                      </div>
                    )}
                    <div className="p-4">
                      <p className="font-semibold text-gray-800 truncate">{movie.title}</p>
                      <p className="text-sm text-gray-600">{movie.character}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}