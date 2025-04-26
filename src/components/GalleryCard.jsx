export default function GalleryCard({ item }) {
    return (
      <div className="glass p-4 rounded-xl gallery-card hover:opacity-90 transition">
        <img src={item.image} alt={item.alt} className="gallery-img rounded-xl object-cover w-full h-48" />
        <p className="text-gray-300 text-center mt-2 text-sm">{item.title}</p>
      </div>
    );
  }