import { useState, useEffect, useCallback, useRef } from 'react';
import { templateAPI, favoriteAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import TemplateCard from '../components/TemplateCard';
import { Search, SlidersHorizontal, Grid3X3, LayoutList, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'Landing Page', 'Dashboard', 'E-Commerce', 'Portfolio', 'Blog', 'SaaS', 'Admin Panel'];

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
    <div className="skeleton" style={{ height: '200px' }} />
    <div className="p-5 space-y-3">
      <div className="skeleton rounded-lg h-5 w-3/4" />
      <div className="skeleton rounded-lg h-4 w-full" />
      <div className="skeleton rounded-lg h-4 w-2/3" />
      <div className="flex gap-2 pt-1">
        {[1,2,3].map(i => <div key={i} className="skeleton rounded-lg h-5 w-16" />)}
      </div>
    </div>
  </div>
);

const Templates = () => {
  const { isAuthenticated } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const searchTimeout = useRef(null);

  // Debounce search
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(searchTimeout.current);
  }, [search]);

  // Reset page on category change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const params = { page: currentPage, limit: 9 };
        if (debouncedSearch) params.search = debouncedSearch;
        if (selectedCategory !== 'All') params.category = selectedCategory;

        const res = await templateAPI.getAll(params);
        setTemplates(res.data.templates);
        setTotalPages(res.data.totalPages);
        setTotal(res.data.total);
      } catch (err) {
        toast.error('Failed to load templates');
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, [debouncedSearch, selectedCategory, currentPage]);

  // Fetch favorite IDs for logged-in user
  useEffect(() => {
    if (!isAuthenticated) { setFavoriteIds(new Set()); return; }
    favoriteAPI.getIds()
      .then(res => setFavoriteIds(new Set(res.data.favoriteIds)))
      .catch(() => {});
  }, [isAuthenticated]);

  const handleFavoriteChange = useCallback((templateId, isFav) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      isFav ? next.add(templateId) : next.delete(templateId);
      return next;
    });
  }, []);

  const clearSearch = () => { setSearch(''); setDebouncedSearch(''); };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero header */}
      <div className="relative overflow-hidden py-16 px-4"
        style={{ background: 'linear-gradient(180deg, rgba(139,92,246,0.05) 0%, transparent 100%)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
          <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-purple-400 mb-4 border border-purple-500/20">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            {total} Templates Available
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Explore{' '}
            <span className="gradient-text">Templates</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Professionally crafted templates to kickstart your next project. Browse, filter, and save your favorites.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search templates by name, description, or tag..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl text-white text-sm outline-none focus-ring transition-all duration-200"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            />
            {search && (
              <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              style={selectedCategory === cat
                ? { background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', border: '1px solid transparent' }
                : { background: 'var(--bg-card)', border: '1px solid var(--border-color)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results info */}
        {!loading && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {debouncedSearch || selectedCategory !== 'All'
                ? `${total} result${total !== 1 ? 's' : ''} found`
                : `Showing all ${total} templates`}
            </p>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-4"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or category filter</p>
            <button
              onClick={() => { clearSearch(); setSelectedCategory('All'); }}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {templates.map((template) => (
              <TemplateCard
                key={template._id}
                template={template}
                isFavorited={favoriteIds.has(template._id)}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentPage === page ? 'text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
                  }`}
                  style={currentPage === page
                    ? { background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }
                    : { background: 'var(--bg-card)', border: '1px solid var(--border-color)' }
                  }
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
