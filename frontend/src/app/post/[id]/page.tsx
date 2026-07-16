"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = "http://localhost:5000";

interface Comment {
  _id: string;
  username: string;
  text: string;
  createdAt?: string;
}

interface Post {
  _id: string;
  author: string;
  title?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  likes: number;
  createdAt?: string;
}

export default function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  async function loadPost() {
    const res = await fetch(`${API_URL}/api/posts/${id}`);
    const data = await res.json();

    if (data.success) {
      setPost(data.post);
    }
  }

  async function loadComments() {
    const res = await fetch(`${API_URL}/api/comments/${id}`);
    const data = await res.json();

    if (data.success) {
      setComments(data.comments);
    }
  }

  useEffect(() => {
    if (!id) return;

    loadPost();
    loadComments();
  }, [id]);

  async function addComment() {
    if (!username.trim() || !text.trim()) return;

    const res = await fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
        username,
        text,
      }),
    });

    if (!res.ok) {
      alert("Failed to add comment");
      return;
    }

    setText("");
    await loadComments();
  }

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (
    <main className="container">
      <h1>{post.title || "Untitled Post"}</h1>

      <p>
        <strong>Author:</strong> {post.author}
      </p>

      <p>{post.content}</p>

      <p>
        <strong>Likes:</strong> {post.likes}
      </p>

      <div>
        {post.tags?.map((tag) => (
          <span key={tag}>#{tag} </span>
        ))}
      </div>

      <hr />

      <h2>Comments</h2>

      {comments.map((comment) => (
        <div key={comment._id}>
          <strong>{comment.username}</strong>
          <p>{comment.text}</p>
        </div>
      ))}

      <hr />

      <h3>Add Comment</h3>

      <input
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addComment}>
        Add Comment
      </button>
    </main>
  );
}