export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <span className="inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
        {post.tag}
      </span>

      <h2 className="text-2xl font-bold mt-4">{post.title}</h2>

      <p className="text-gray-600 mt-3">{post.description}</p>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-500">By {post.author}</p>

        <div className="flex gap-4 text-gray-500">
          <span>❤️ {post.likes}</span>
          <span>💬 {post.comments}</span>
        </div>
      </div>
    </div>
  );
}
