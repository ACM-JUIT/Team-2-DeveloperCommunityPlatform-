import Navbar from "@/components/Navbar";
import posts from "@/data/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Share Your Knowledge
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            DevConnect is a community where developers can write technical
            blogs, discover new technologies, and connect with fellow
            programmers.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Start Reading
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
              Create Post
            </button>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
