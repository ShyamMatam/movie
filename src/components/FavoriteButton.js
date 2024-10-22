export default function FavoriteButton({ item, onToggle, isInFavorites }) {
  return (
    <button
      onClick={() => onToggle(item)}
      className={`px-2 py-1 rounded ${isInFavorites ? 'bg-red-500' : 'bg-gray-300'}`}
    >
      {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
}
