import { useState, useEffect, useCallback } from 'react';
import { favoriteAPI } from '../api/services';
import TemplateCard from '../components/TemplateCard';
import { Heart, LayoutTemplate, FolderHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SkeletonCard = () => (
  <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
    <div className="h-[200px] bg-slate-100 animate-pulse-custom"></div>
    <div className="p-6">
      <div className="h-4 bg-slate-100 rounded mb-4 animate-pulse-custom"></div>
      <div className="h-4 bg-slate-100 rounded w-3/5 animate-pulse-custom"></div>
      <div className="mt-8">
        <div className="h-4 bg-slate-100 rounded animate-pulse-custom"></div>
      </div>
    </div>
  </div>
);

const Favorites = () => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const res = await favoriteAPI.getAll();
      setTemplates(res.data.templates);
    } catch {
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFavorites(); }, [fetchFavorites]);

  const handleFavoriteChange = useCallback((templateId, isFav) => {
    if (!isFav) {
      setTemplates(prev => prev.filter(t => t._id !== templateId));
    }
  }, []);

  return (
    <div>
      <div className="py-12 bg-white border-b border-slate-200 mb-12">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={32} className="text-blue-500" fill="currentColor" />
            <h1 className="text-4xl font-bold mb-0">My Favorites</h1>
          </div>
          <p className="text-lg text-slate-600">
            {!loading && (
              templates.length > 0
                ? `You have ${templates.length} saved template${templates.length !== 1 ? 's' : ''}, ${user?.name?.split(' ')[0]}.`
                : `No favorites yet, ${user?.name?.split(' ')[0]}. Start exploring.`
            )}
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 mb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-20 px-8 bg-white border border-dashed border-slate-200 rounded-lg">
            <FolderHeart size={64} className="text-slate-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
            <p className="text-slate-600 mb-8">Browse our template library and click the heart icon on any template to save it here.</p>
            <Link to="/templates" className="bg-blue-500 text-white px-6 py-2.5 rounded-md font-medium transition-colors hover:bg-blue-600 inline-flex items-center gap-2">
              <LayoutTemplate size={18} />
              Browse Templates
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <TemplateCard
                key={template._id}
                template={template}
                isFavorited={true}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
