"use client";

import { useEffect, useState } from "react";

interface PostComment {
  _id: string;
  postId: string;
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
  liked?: boolean;
  comments: PostComment[];
  createdAt?: string;
}

const API_URL = "http://localhost:5000";

export default function Home() {
  const [postText, setPostText] = useState("");
  const [currentUser, setCurrentUser] = useState("Anonymous");
  const [nameInput, setNameInput] = useState("");
  const [count, setCount] = useState(0);

  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {}
  );

  const [showCommentBox, setShowCommentBox] = useState<
    Record<string, boolean>
  >({});

  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchComments(postId: string): Promise<PostComment[]> {
    try {
      const res = await fetch(
        `${API_URL}/api/comments/${postId}`
      );

      if (!res.ok) {
        return [];
      }

      const data = await res.json();

      if (data.success) {
        return data.comments;
      }

      return [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async function fetchPosts() {
    try {
      const res = await fetch(`${API_URL}/api/posts`);

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();

      if (data.success) {
        const loadedPosts = await Promise.all(
          data.posts.map(async (post: Omit<Post, "comments">) => {
            const comments = await fetchComments(post._id);

            return {
              ...post,
              tags: post.tags || [],
              liked: false,
              comments,
            };
          })
        );

        setPosts(loadedPosts);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function createPost() {
    if (!postText.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          author: currentUser,
          content: postText,
        }),
      });

      if (!res.ok) {
        alert("Failed to create post");
        return;
      }

      setPostText("");

      await fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }

  async function deletePost(id: string) {
    try {
      const res = await fetch(
        `${API_URL}/api/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        alert("Failed to delete post");
        return;
      }

      await fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLike(id: string) {
    try {
      const res = await fetch(
        `${API_URL}/api/posts/${id}/like`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok) {
        alert("Failed to like post");
        return;
      }

      const data = await res.json();

      if (data.success) {
        setPosts((currentPosts) =>
          currentPosts.map((post) => {
            if (post._id === id) {
              return {
                ...post,
                likes: data.post.likes,
                liked: true,
              };
            }

            return post;
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddComment(postId: string) {
    const comment = commentInputs[postId];

    if (!comment || !comment.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/comments`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          postId,
          username: currentUser,
          text: comment,
        }),
      });

      if (!res.ok) {
        alert("Failed to add comment");
        return;
      }

      const data = await res.json();

      if (data.success) {
        setPosts((currentPosts) =>
          currentPosts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: [...post.comments, data.comment],
              };
            }

            return post;
          })
        );

        setCommentInputs((currentInputs) => ({
          ...currentInputs,
          [postId]: "",
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="container">
      <div className="top-lines"></div>

      <h1 className="logo">DevConnect</h1>

      <h2 className="title">Developer Community</h2>

      <p className="subtitle">
        Welcome to our Developer Community App
      </p>

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
        <button onClick={() => setCount(count + 1)}>
          + increment
        </button>

        <button onClick={() => setCount(count - 1)}>
          - decrement
        </button>

        <button onClick={() => setCount(0)}>
          reset
        </button>
      </div>

      <div className="section-title">
        Name Input Card
      </div>

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

      <p className="anonymous">
        &gt; posting as {currentUser}
      </p>

      <div className="section-title">
        Post Section
      </div>

      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="what's on your mind?"
      />

      <div className="post-footer">
        <span>{postText.length} chars</span>

        <button
          className="green-btn"
          onClick={createPost}
        >
          ✈ post
        </button>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <div className="avatar">
                {post.author.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{post.author}</h3>

                <span>
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString()
                    : "Just now"}
                </span>
              </div>
            </div>

            {post.title && (
              <h3>{post.title}</h3>
            )}

            <p className="post-content">
              {post.content}
            </p>

            {post.tags.length > 0 && (
              <div>
                {post.tags.map((tag) => (
                  <span key={tag}>
                    #{tag}{" "}
                  </span>
                ))}
              </div>
            )}

            <div className="post-actions">
              <button onClick={() => handleLike(post._id)}>
                {post.liked ? "💖" : "🤍"} {post.likes}
              </button>

              <button
                onClick={() =>
                  setShowCommentBox((currentBoxes) => ({
                    ...currentBoxes,
                    [post._id]: !currentBoxes[post._id],
                  }))
                }
              >
                💬 {post.comments.length}
              </button>

              <button onClick={() => deletePost(post._id)}>
                🗑 Delete
              </button>
            </div>

            {showCommentBox[post._id] && (
              <>
                <div className="comment-box">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post._id] || ""}
                    onChange={(e) =>
                      setCommentInputs((currentInputs) => ({
                        ...currentInputs,
                        [post._id]: e.target.value,
                      }))
                    }
                  />

                  <button
                    onClick={() =>
                      handleAddComment(post._id)
                    }
                  >
                    Add
                  </button>
                </div>

                <div className="comments-list">
                  {post.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="comment-item"
                    >
                      <strong>{comment.username}</strong>

                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}