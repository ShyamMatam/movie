import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-[#032541] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">TMDB Clone</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/movie">Movie</Link></li>
            <li><Link href="/tv">TV Shows</Link></li>
            <li><Link href="/people">People</Link></li>
            <li><Link href="#">More</Link></li>
          </ul>
        </nav>
        <SearchBar />
      </div>
    </header>
  );
}
