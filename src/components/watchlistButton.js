export default function WatchlistButton({ item, onToggle, isInWatchlist }) {
    
  return (
    <button
      onClick={() => onToggle(item)}
      className={`px-2 py-1 rounded ${isInWatchlist ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
}
