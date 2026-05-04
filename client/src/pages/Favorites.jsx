import { useState, useEffect, useCallback } from 'react';
import { favoriteAPI } from '../api/services';
import TemplateCard from '../components/TemplateCard';
import { Heart, LayoutTemplate, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
    <div className="skeleton" style={{ height: '200px' }} />
    <div className="p-5 space-y-3">
      <div className="skeleton rounded-lg h-5 w-3/4" />
      <div className="skeleton rounded-lg h-4 w-full" />
      <div className="skeleton rounded-lg h-4 w-2/3" />
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
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="relative overflow-hidden py-16 px-4"
        style={{ background: 'linear-gradient(180deg, rgba(236,72,153,0.05) 0%, transparent 100%)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />
          <div className="absolute top-0 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(236,72,153,0.3)' }}>
            <Heart size={28} className="text-pink-400" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            My <span className="gradient-text">Favorites</span>
          </h1>
          <p className="text-slate-400 text-lg">
            {!loading && (
              templates.length > 0
                ? `You have ${templates.length} saved template${templates.length !== 1 ? 's' : ''}, ${user?.name?.split(' ')[0]}!`
                : `No favorites yet, ${user?.name?.split(' ')[0]}. Start exploring!`
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in-up">
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-3xl flex items-center justify-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <Heart size={48} className="text-slate-700" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-float">
                <Sparkles size={18} className="text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              No favorites yet
            </h2>
            <p className="text-slate-500 mb-8 max-w-sm">
              Browse our template library and click the heart icon on any template you love!
            </p>

            <Link
              to="/templates"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              <LayoutTemplate size={17} />
              Browse Templates
            </Link>
          </div>
        ) : (
          <>
            {/* Stats bar */}
            <div className="flex items-center justify-between mb-8 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-pink-400" fill="currentColor" />
                <span className="font-medium text-white">{templates.length} Saved Template{templates.length !== 1 ? 's' : ''}</span>
              </div>
              <Link to="/templates" className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">
                <LayoutTemplate size={15} />
                Browse More
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {templates.map((template) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  isFavorited={true}
                  onFavoriteChange={handleFavoriteChange}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
