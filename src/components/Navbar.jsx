import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-lg bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-indigo-400">DX</h1>
        <nav className="space-x-8 text-sm font-medium text-gray-200">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/projects" className="hover:text-indigo-400 transition">Projects</Link>
          <Link to="/" onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-400 transition">Skills</Link>
          <Link to="/" onClick={() => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-400 transition">Achievements</Link>
          <Link to="/blog" className="hover:text-indigo-400 transition">Blog</Link>
          <Link to="/gallery" className="hover:text-indigo-400 transition">Gallery</Link>
          <Link to="/" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-400 transition">Contact</Link>
          <Link to="/admin" className="hover:text-indigo-400 transition">Admin</Link>
        </nav>
      </div>
    </header>
  );
}