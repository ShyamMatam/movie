'use client'

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function People() {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastPersonElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchPopularPeople = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await response.json();
      setPeople(prevPeople => [...prevPeople, ...data.results]);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Error fetching popular people:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPopularPeople();
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Popular People</h1>
      </header>

      <main className="container mx-auto py-8 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.map((person, index) => (
            <Link href={`/person/${person.id}`} key={person.id}>
              <div 
                ref={index === people.length - 1 ? lastPersonElementRef : null}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt={person.name}
                  width={500}
                  height={750}
                  className="w-full h-auto"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 dark:text-black">{person.name}</h3>
                  <p className="text-sm text-gray-600">{person.known_for_department}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {loading && <p className="text-center mt-4">Loading more people...</p>}
      </main>
    </div>
  );
}
