import { useState, useCallback } from 'react';
import { Heart, Star, Download, ExternalLink, Crown, Eye } from 'lucide-react';
import { favoriteAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const categoryColors = {
  'Landing Page': 'from-blue-500 to-cyan-500',
  'Dashboard': 'from-purple-500 to-violet-500',
  'E-Commerce': 'from-orange-500 to-amber-500',
  'Portfolio': 'from-pink-500 to-rose-500',
  'Blog': 'from-green-500 to-emerald-500',
  'SaaS': 'from-indigo-500 to-blue-500',
  'Admin Panel': 'from-red-500 to-orange-500',
};

const TemplateCard = ({ template, isFavorited: initialFavorited = false, onFavoriteChange }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleFavorite = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to favorite templates!');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const res = await favoriteAPI.toggle(template._id);
      const newFav = res.data.isFavorited;
      setIsFav(newFav);
      toast.success(newFav ? '❤️ Added to favorites!' : '💔 Removed from favorites');
      if (onFavoriteChange) onFavoriteChange(template._id, newFav);
    } catch (err) {
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, template._id, navigate, onFavoriteChange]);

  const gradientClass = categoryColors[template.category] || 'from-purple-500 to-pink-500';

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-card)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        {!imgError ? (
          <img
            src={template.thumbnail_url}
            alt={template.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
            <span className="text-white/40 text-5xl font-bold">{template.name[0]}</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <a
            href={template.previewUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white border border-white/30 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
          >
            <Eye size={15} />
            Preview
          </a>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold text-white bg-gradient-to-r ${gradientClass} shadow-lg`}>
            {template.category}
          </span>
          {template.isPremium && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm">
              <Crown size={11} />
              Pro
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          disabled={loading}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-lg ${
            isFav
              ? 'bg-pink-500 text-white scale-110 shadow-pink-500/40'
              : 'bg-black/40 text-white/70 hover:bg-pink-500/80 hover:text-white border border-white/10'
          } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-base text-white mb-1.5 truncate" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {template.name}
        </h3>
        <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
          {template.description}
        </p>

        {/* Tags */}
        {template.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-lg text-xs"
                style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', border: '1px solid rgba(139, 92, 246, 0.2)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-medium text-amber-400">{template.rating?.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download size={13} style={{ color: 'var(--text-muted)' }} />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{template.downloads?.toLocaleString()}</span>
            </div>
          </div>
          <div>
            {template.isPremium ? (
              <span className="text-sm font-bold text-amber-400">${template.price}</span>
            ) : (
              <span className="text-sm font-bold text-emerald-400">Free</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
