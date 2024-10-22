import React from 'react';
import { fetchTVShowDetails, fetchTVShowCredits } from '@/lib/tmdb';
import TVShowDetails from '@/components/TvShowDetails';

async function TVShowPage({ params }) {
  const { id } = params;
  
  try {
    const [tvShow, credits] = await Promise.all([
      fetchTVShowDetails(id),
      fetchTVShowCredits(id)
    ]);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <TVShowDetails tvShow={tvShow} credits={credits} />
      </div>

    )
  
  } catch (error) {
    console.error("Error in TVShowPage:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>Error</h1>
        <p>Sorry, we couldn't load the TV show details. Please try again later.</p>
      </div>
    );
  }
}

export default TVShowPage;
