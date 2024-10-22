export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 bottom-0 w-full border-t border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} TMDB </p>
        <p className="text-sm mt-2">All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-300 transition-colors duration-300">About</a>
          <a href="#" className="hover:text-gray-300 transition-colors duration-300">Contact</a>
          <a href="#" className="hover:text-gray-300 transition-colors duration-300">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

