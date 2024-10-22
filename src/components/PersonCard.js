import Link from 'next/link';
import Image from 'next/image';

export default function PersonCard({ person }) {
  return (
    <Link href={`/person/${person.id}`} passHref legacyBehavior>
      <a className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {person.profile_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
            alt={person.name}
            width={200}
            height={300}
            className="w-full h-auto"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
            No image available
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{person.name}</h3>
          {person.known_for_department && (
            <p className="text-sm text-gray-600">{person.known_for_department}</p>
          )}
        </div>
      </a>
    </Link>
  );
}
