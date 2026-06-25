"use client";

import { useState } from "react";

export default function Home() {
  const [postText, setPostText] = useState("");

  const [currentUser, setCurrentUser] = useState("Anonymous");

  const [nameInput, setNameInput] = useState("");

  const [count, setCount] = useState(0);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Maya Chen",
      content: "Just shipped a new open source project",
      likes: 24,
      liked: false,
      comments: [],
      createdAt: new Date(),
    },

    {
      id: 2,
      author: "Rohan Verma",
      content: "Code reviews are awesome",
      likes: 41,
      liked: false,
      comments: [],
      createdAt: new Date(),
    },
  ]);

  const createPost = () => {
    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: currentUser,
      content: postText,
      likes: 0,
      liked: false,
      comments: [],
      createdAt: new Date(),
    };

    setPosts([newPost, ...posts]);

    setPostText("");
  };

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);

    setPosts(updatedPosts);
  };

  const handleLike = (id: number) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }

      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <main className="container">
      <div className="top-lines"></div>

      <h1 className="logo">DevConnect</h1>

      <h2 className="title">Developer Community</h2>

      <p className="subtitle">Welcome to our Developer Community App</p>

      {/* Counter Card */}
      <div className="section-title">Counter Card</div>

      <div className="stats">
        <div>
          <h3 className="green">{posts.length}</h3>
          <p>total posts</p>
        </div>

        <div>
          <h3 className="pink">
            {posts.reduce((total, post) => total + post.likes, 0)}
          </h3>
          <p>total likes</p>
        </div>

        <div>
          <h3>{count}</h3>
          <p>manual count</p>
        </div>
      </div>

      <div className="btn-group">
        <button onClick={() => setCount(count + 1)}>+ increment</button>

        <button onClick={() => setCount(count - 1)}>- decrement</button>

        <button onClick={() => setCount(0)}>reset</button>
      </div>

      {/* Name Input */}
      <div className="section-title">Name Input Card</div>

      <div className="input-row">
        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="enter your name..."
        />
        <button
          className="green-btn"
          onClick={() => {
            if (!nameInput.trim()) return;

            setCurrentUser(nameInput);

            setNameInput("");
          }}
        >
          set
        </button>
      </div>

      <p className="anonymous">&gt; posting as {currentUser}</p>

      {/* Post Section */}
      <div className="section-title">Post Section</div>

      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="what's on your mind? (ctrl+enter to post)"
      />

      <div className="post-footer">
        <span>{postText.length} chars</span>

        <button className="green-btn" onClick={createPost}>
          ✈ post
        </button>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="avatar">{post.author.charAt(0)}</div>

              <div>
                <h3>{post.author}</h3>
                <span>Just now</span>
              </div>
            </div>

            <p className="post-content">{post.content}</p>

            <div className="post-actions">
              <button onClick={() => handleLike(post.id)}>
                {post.liked ? "💖" : "🤍"} {post.likes}
              </button>
              <button>💬 {post.comments.length}</button>
              <button onClick={() => deletePost(post.id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
