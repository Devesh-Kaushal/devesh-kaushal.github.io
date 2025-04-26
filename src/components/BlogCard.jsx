export default function BlogCard({ blog }) {
    return (
      <div className="glass p-6 rounded-xl blog-card hover:scale-105 transition duration-300">
        <h3 className="text-2xl font-semibold mb-3 gradient-text">{blog.title}</h3>
        <p className="text-gray-400 mb-4">{blog.description}</p>
        <a href={blog.link} className="text-indigo-400 hover:underline">Read More →</a>
      </div>
    );
  }