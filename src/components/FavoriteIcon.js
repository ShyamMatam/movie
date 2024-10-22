import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function FavoriteIcon({ isInFavorites, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-2xl focus:outline-none"
    >
      {isInFavorites ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
    </button>
  );
}
