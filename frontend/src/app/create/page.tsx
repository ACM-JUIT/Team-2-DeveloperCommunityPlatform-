"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:5000";

export default function CreatePostPage() {
  const router = useRouter();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
        title,
        content,
        coverImage,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });

    if (!res.ok) {
      alert("Failed to create post");
      return;
    }

    alert("Post created successfully!");
    router.push("/");
  }

  return (
    <main className="container">
      <h1>Create New Article</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />

        <input
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit">
          Create Post
        </button>
      </form>
    </main>
  );
}