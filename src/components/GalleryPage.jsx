import GalleryCard from './GalleryCard';

export default function GalleryPage({ gallery }) {
  return (
    <section className="bg-gray-900/50 py-24 px-6 min-h-screen pt-24">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Full Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {gallery.sort((a, b) => a.index - b.index).map(item => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}