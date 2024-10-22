export default function RatingSelect({ item, onRate, currentRating }) {
  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-700">Rate:</label>
      <select
        value={currentRating || ''}
        onChange={(e) => onRate(item, e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Select rating</option>
        {[1, 2, 3, 4, 5].map((rating) => (
          <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
        ))}
      </select>
    </div>
  );
}
