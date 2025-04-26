import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import BlogCard from './BlogCard';
import GalleryCard from './GalleryCard';

export default function HomePage({ projects, blogs, gallery }) {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center text-center px-4 pt-24">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight gradient-text">Hey, I'm DX</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">Futurist • Drone Developer • AI Enthusiast • Visionary Engineer</p>
          <div className="space-x-4">
            <Link to="/" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-white font-semibold transition duration-300">Hire Me</Link>
            <Link to="/projects" className="border border-indigo-500 hover:bg-indigo-500/20 px-6 py-3 rounded-full text-white font-semibold transition duration-300">Explore Projects</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="glass p-10 rounded-2xl animate-fade-in">
          <h2 className="text-4xl font-bold mb-6 gradient-text">About Me</h2>
          <p className="text-gray-300 mb-6 leading-relaxed text-lg">
            I'm a 3rd-year B.Tech CSE student driven by a passion for innovation. My work spans drones, disaster prediction systems, custom OCR, and CSI-based pose estimation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400">
            <ul className="list-disc list-inside space-y-3">
              <li>Expertise in AI/ML, Computer Vision, and Embedded Systems</li>
              <li>Published 2 research papers by 3rd year</li>
              <li>Developed DX Mark 1 drone and WiPose system</li>
              <li>Exploring defense-tech and autonomous systems</li>
            </ul>
            <ul className="list-disc list-inside space-y-3">
              <li>Proficient in Python, TensorFlow, LoRa, Flutter</li>
              <li>Passionate about sensing and autonomy</li>
              <li>Hackathon winner with a research-driven mindset</li>
              <li>Seeking global MS and internship opportunities</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-black/50 py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text animate-fade-in">Featured Projects</h2>
        <div className="max-w-7xl mx-auto">
          <div id="project-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).sort((a, b) => a.index - b.index).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/projects" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-white font-semibold transition duration-300">Show More</Link>
          </div>
        </div>
      </section>

      <section id="skills" className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Skills & Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {['Python', 'TensorFlow', 'OpenCV', 'Embedded C', 'MATLAB', 'LoRa', 'Flutter', 'Git', 'Arduino', 'Linux'].map(skill => (
            <span key={skill} className="bg-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-700 transition">{skill}</span>
          ))}
        </div>
      </section>

      <section id="achievements" className="bg-black/50 py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Achievements</h2>
        <div className="max-w-4xl mx-auto text-center text-gray-300 space-y-6">
          <p className="flex items-center justify-center gap-2">🏆 <span>Winner - Hackduino 4.0 for DX Mark 1</span></p>
          <p className="flex items-center justify-center gap-2">📄 <span>Research papers accepted at ICSL 2025 and IEEE MILCOM 2025</span></p>
          <p className="flex items-center justify-center gap-2">🎓 <span>Selected for MLx: Representation Learning & GenAI</span></p>
          <p className="flex items-center justify-center gap-2">🛰️ <span>Presented AI-Powered Disaster Prediction at IIT Kanpur</span></p>
        </div>
      </section>

      <section id="blog" className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
          {blogs.slice(0, 2).sort((a, b) => a.index - b.index).map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/blog" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-white font-semibold transition duration-300">Show More</Link>
        </div>
      </section>

      <section id="gallery" className="bg-gray-900/50 py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {gallery.slice(0, 4).sort((a, b) => a.index - b.index).map(item => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/gallery" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-white font-semibold transition duration-300">Show More</Link>
        </div>
      </section>

      <section id="contact" className="bg-gray-800/50 py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">Let's Connect</h2>
          <p className="text-gray-300 mb-8 text-lg">Interested in collaboration, hiring, or mentorship? I'm open to global opportunities.</p>
          <div className="flex flex-col space-y-4">
            <input className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Name" required />
            <input className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email Address" required />
            <textarea className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="4" placeholder="Your Message" required></textarea>
            <button className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-full text-white font-semibold shadow-lg transition duration-300">Send Message</button>
          </div>
        </div>
      </section>
    </>
  );
}