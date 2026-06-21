"use client";

import { useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        title,
        content,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      await API.post("/posts", payload);

      alert("Post Created 🚀");

      router.push("/");
    } catch (err) {
      console.log(err);
      setError("Failed to create post. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded">
      <h1 className="text-3xl font-bold mb-6">Create Post</h1>

      {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border p-2 h-40"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          className="border p-2"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
