import ProjectCard from './ProjectCard';

export default function ProjectsPage({ projects }) {
  return (
    <section className="bg-black/50 py-24 px-6 min-h-screen pt-24">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text animate-fade-in">All Projects</h2>
      <div className="max-w-7xl mx-auto">
        <div id="project-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.sort((a, b) => a.index - b.index).map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}