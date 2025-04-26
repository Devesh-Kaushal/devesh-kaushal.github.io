import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import BlogPage from './components/BlogPage';
import GalleryPage from './components/GalleryPage';
import AdminPanel from './components/AdminPanel';
import { initialData } from './data/initialData';

export default function App() {
  const [data, setData] = useState(initialData);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage projects={data.projects} blogs={data.blogs} gallery={data.gallery} />} />
        <Route path="/projects" element={<ProjectsPage projects={data.projects} />} />
        <Route path="/blog" element={<BlogPage blogs={data.blogs} />} />
        <Route path="/gallery" element={<GalleryPage gallery={data.gallery} />} />
        <Route path="/admin" element={<AdminPanel data={data} setData={setData} />} />
      </Routes>
      <footer className="text-center text-gray-500 text-sm py-8 bg-black/50">
        © 2025 DX Portfolio •
        <a href="#" className="text-indigo-400 hover:underline">GitHub</a> •
        <a href="#" className="text-indigo-400 hover:underline">LinkedIn</a> •
        <a href="#" className="text-indigo-400 hover:underline">ResearchGate</a>
      </footer>
    </BrowserRouter>
  );
}