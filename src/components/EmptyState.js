import Link from 'next/link';

export default function EmptyState({ message, linkText, linkHref }) {
  return (
    <div className="text-center py-10">
      <p className="text-xl mb-4">{message}</p>
      <Link href={linkHref} className="text-blue-600 hover:underline">
        {linkText}
      </Link>
    </div>
  );
}
