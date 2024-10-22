'use server';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";






// Add more API functions as needed

export async function fetchMovieDetails(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return response.json();
}

export async function fetchTVShowDetails(showId) {
  const response = await fetch(`${BASE_URL}/tv/${showId}?api_key=${API_KEY}`);
  return response.json();
}

export async function fetchPersonDetails(personId) {
  const response = await fetch(`${BASE_URL}/person/${personId}?api_key=${API_KEY}`);
  return response.json();
}

export async function fetchMovieCredits(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  return response.json();
}

export async function fetchTVShowCredits(showId) {
  const response = await fetch(`${BASE_URL}/tv/${showId}/credits?api_key=${API_KEY}`);
  return response.json();
}

export async function fetchPersonCredits(personId) {
  const response = await fetch(`${BASE_URL}/person/${personId}/combined_credits?api_key=${API_KEY}`);
  return response.json();
}   

export async function fetchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  return response.json();
}

export async function fetchPopularTVShows() {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
  return response.json();
}

export async function fetchTopRatedMovies() {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
  return response.json();
}

export async function fetchTopRatedTVShows() {
  const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
  return response.json();
}

export async function fetchUpcomingMovies() {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
  return response.json();
}

export async function fetchAiringTodayTVShows() {
  const response = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`);
  return response.json();
}

export async function fetchOnTheAirTVShows() {  
  const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`);
  return response.json();
}

export async function fetchPopularPeople() {
  const response = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=1`);
  return response.json();
}

export async function fetchPersonImages(personId) {
  const response = await fetch(`${BASE_URL}/person/${personId}/images?api_key=${API_KEY}`);
  return response.json();
}

export async function fetchPersonChanges(personId) {
  const response = await fetch(`${BASE_URL}/person/${personId}/changes?api_key=${API_KEY}`);
  return response.json();
}

// New generic functions for popular and top-rated content
export async function fetchPopular(mediaType, page = 1) {
  const response = await fetch(`${BASE_URL}/${mediaType}/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
  return response.json();
}

export async function fetchTopRated(mediaType, page = 1) {
  const response = await fetch(`${BASE_URL}/${mediaType}/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
  return response.json();
}

export async function fetchUpcoming(page = 1) {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`);
  return response.json();
}



