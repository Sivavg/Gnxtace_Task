import { useState, useCallback } from 'react';
import { Heart, Star, Download } from 'lucide-react';
import { favoriteAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TemplateCard = ({ template, isFavorited = false, onFavoriteChange }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(isFavorited);
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
      toast.success(newFav ? 'Added to favorites' : 'Removed from favorites');
      if (onFavoriteChange) onFavoriteChange(template._id, newFav);
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, template._id, navigate, onFavoriteChange]);

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col">
      <div className="relative h-[200px] bg-slate-200 border-b border-slate-200">
        {!imgError ? (
          <img
            src={template.thumbnail_url}
            alt={template.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-5xl font-bold">
            {template.name[0]}
          </div>
        )}

        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          {template.category}
        </div>

        <button
          onClick={handleFavorite}
          disabled={loading}
          className={`absolute top-4 right-4 bg-white border border-slate-200 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-110 ${isFav ? 'text-red-500' : 'text-slate-600'}`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{template.name}</h3>
          <div className="font-semibold text-blue-500">
            {template.isPremium ? `$${template.price}` : 'Free'}
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-6 flex-1">{template.description}</p>

        <div className="flex justify-between items-center pt-4 border-t border-slate-200 text-sm text-slate-600">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <span>{template.rating?.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download size={16} />
              <span>{template.downloads?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
