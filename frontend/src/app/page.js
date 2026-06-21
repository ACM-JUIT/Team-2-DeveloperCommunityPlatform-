"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };

    void fetchPosts();
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* HERO SECTION */}
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

            <Link
              href="/create"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Create Post
            </Link>
          </div>
        </section>

        {/* POSTS SECTION */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts found...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((item) => (
                <PostCard key={item._id} post={item} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
