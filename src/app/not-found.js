import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-black">404 - Page Not Found</h1>
      <p className="text-2xl mb-8 text-black">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Go back to Home
      </Link>
    </div>
  );
}
