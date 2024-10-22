import Image from 'next/image';

export default function MovieCard({ item }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  const releaseDate = new Date(item.release_date || item.first_air_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={imageUrl} alt={item.title || item.name} width={500} height={750} className="w-full h-auto" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.title || item.name}</h3>
        <p className="text-sm text-gray-600">{releaseDate}</p>
        <div className="mt-2 bg-[#081c22] text-white rounded-full w-10 h-10 flex items-center justify-center">
          {Math.round(item.vote_average * 10)}%
        </div>
      </div>
    </div>
  );
}
