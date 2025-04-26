import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel({ data, setData }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [section, setSection] = useState('projects');
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const auth = prompt('Enter admin password:');
    if (auth === 'admin123') {
      setIsAuthenticated(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...data };
    const newItem = { ...formData, id: editingId || Date.now().toString(), index: parseInt(formData.index) || data[section].length + 1 };

    if (section === 'projects') {
      newItem.tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
    }

    if (editingId) {
      newData[section] = newData[section].map(item => item.id === editingId ? newItem : item);
    } else {
      newData[section].push(newItem);
    }

    setData(newData);
    setFormData({});
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData({ ...item, tags: item.tags ? item.tags.join(', ') : '' });
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const newData = { ...data };
      newData[section] = newData[section].filter(item => item.id !== id);
      setData(newData);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <section className="max-w-7xl mx-auto py-24 px-6 min-h-screen pt-24">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Admin Panel</h2>
      <div className="flex justify-center gap-4 mb-8">
        {['projects', 'blogs gwent', 'gallery'].map(sec => (
          <button
            key={sec}
            className={`px-4 py-2 rounded-full ${section === sec ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-200'} hover:bg-indigo-600 hover:text-white transition`}
            onClick={() => { setSection(sec); setFormData({}); setEditingId(null); }}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </button>
        ))}
      </div>

      <div className="glass p-6 rounded-xl mb-8">
        <h3 className="text-2xl font-semibold mb-4 gradient-text">{editingId ? 'Edit' : 'Add'} {section.charAt(0).toUpperCase() + section.slice(1)} Item</h3>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            name="index"
            value={formData.index || ''}
            onChange={handleInputChange}
            placeholder="Index (Order)"
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="number"
          />
          <input
            name="title"
            value={formData.title || ''}
            onChange={handleInputChange}
            placeholder="Title"
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {section !== 'gallery' && (
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              placeholder="Description"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
            />
          )}
          {section !== 'blogs' && (
            <input
              name="image"
              value={formData.image || ''}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
          {section === 'gallery' && (
            <input
              name="alt"
              value={formData.alt || ''}
              onChange={handleInputChange}
              placeholder="Alt Text"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
          {(section === 'projects' || section === 'blogs') && (
            <input
              name="link"
              value={formData.link || ''}
              onChange={handleInputChange}
              placeholder="Link"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
          {section === 'projects' && (
            <input
              name="tags"
              value={formData.tags || ''}
              onChange={handleInputChange}
              placeholder="Tags (comma-separated)"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-full text-white font-semibold shadow-lg transition duration-300"
          >
            {editingId ? 'Update' : 'Add'} Item
          </button>
        </form>
      </div>

      <div className="glass p-6 rounded-xl">
        <h3 className="text-2xl font-semibold mb-4 gradient-text">Manage {section.charAt(0).toUpperCase() + section.slice(1)}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data[section].sort((a, b) => a.index - b.index).map(item => (
            <div key={item.id} className="glass p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.title} (Index: {item.index})</p>
                <p className="text-gray-400 text-sm">{item.description || item.alt}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}