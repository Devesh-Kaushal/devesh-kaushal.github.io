export default function ProjectCard({ project }) {
    return (
      <div className="glass p-6 rounded-2xl project-card overflow-hidden animate-fade-in">
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
          <img src={project.image} alt={project.title} className="project-img w-full h-full object-cover" />
        </div>
        <h3 className="text-2xl font-semibold mb-3 gradient-text">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
        <div className="flex justify-between items-center">
          <a href={project.link} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition">View Project →</a>
          <div className="flex space-x-2">
            {project.tags.map(tag => (
              <span key={tag} className="bg-indigo-900/50 px-2 py-1 rounded text-xs text-indigo-300">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }