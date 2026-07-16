"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = "http://localhost:5000";

interface Post {
  _id: string;
  title?: string;
  author: string;
  content: string;
  tags: string[];
}

export default function TagPage() {
  const { tag } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const res = await fetch(
        `${API_URL}/api/posts?tag=${tag}`
      );

      const data = await res.json();

      if (data.success) {
        setPosts(data.posts);
      }
    }

    if (tag) {
      loadPosts();
    }
  }, [tag]);

  return (
    <main className="container">
      <h1>Posts tagged: #{tag}</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="post-card"
          >
            <h2>{post.title || "Untitled"}</h2>

            <p>
              <strong>{post.author}</strong>
            </p>

            <p>{post.content}</p>
          </div>
        ))
      )}
    </main>
  );
}