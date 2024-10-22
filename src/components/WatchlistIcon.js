import { FaList, FaRegListAlt } from 'react-icons/fa';

export default function WatchlistIcon({ isInWatchlist, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-2xl focus:outline-none"
    >
      {isInWatchlist ? <FaList className="text-green-500" /> : <FaRegListAlt />}
    </button>
  );
}
