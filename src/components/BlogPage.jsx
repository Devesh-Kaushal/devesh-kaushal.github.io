import BlogCard from './BlogCard';

export default function BlogPage({ blogs }) {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6 min-h-screen pt-24">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text">All Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
        {blogs.sort((a, b) => a.index - b.index).map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}