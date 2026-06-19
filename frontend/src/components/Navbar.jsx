import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7x1 mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2x1 font-bold text-blue-600">DevConnect</h1>

        {/*  Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/explore" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/explore" className="hover:text-blue-600">
            Explore
          </Link>

          <Link
            href="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
}
