import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-[#032541] text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold">TMDB Clone</Link>
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row space-x-0 md:space-x-4">
            <li className="mb-2 md:mb-0"><Link href="/movie">Movie</Link></li>
            <li className="mb-2 md:mb-0"><Link href="/tv">TV Shows</Link></li>
            <li className="mb-2 md:mb-0"><Link href="/people">People</Link></li>
            <li className="mb-2 md:mb-0"><Link href="#">More</Link></li>
          </ul>
        </nav>
        <SearchBar />
      </div>
    </header>
  );
}
