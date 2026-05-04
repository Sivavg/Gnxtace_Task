import { useState, useEffect, useCallback, useRef } from 'react';
import { templateAPI, favoriteAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import TemplateCard from '../components/TemplateCard';
import { Search, X, ChevronLeft, ChevronRight, LayoutTemplate } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'Landing Page', 'Dashboard', 'E-Commerce', 'Portfolio', 'Blog', 'SaaS', 'Admin Panel'];

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

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(searchTimeout.current);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

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
    <div>
      <div className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl font-bold mb-2">Explore Templates</h1>
          <p className="text-lg text-slate-600">Browse our collection of {total > 0 ? total : ''} premium templates built for performance and scalability.</p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="bg-white border-b border-slate-200 py-6 sticky top-[65px] z-50">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Search */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-grow max-w-[420px]">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search templates by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full py-2.5 pr-10 pl-11 border border-slate-200 rounded-md text-sm bg-slate-50 text-slate-900 outline-none focus:border-blue-500 transition-colors"
              />
              {search && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 flex bg-none border-none cursor-pointer">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results badge */}
            {!loading && (
              <span className="text-sm text-slate-600 whitespace-nowrap">
                {total} template{total !== 1 ? 's' : ''} found
              </span>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm font-medium text-slate-600 self-center mr-1">Filter:</span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-transparent text-slate-600 border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 mt-10 mb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-20 px-8 bg-white border border-dashed border-slate-200 rounded-lg">
            <Search size={48} className="text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No templates found</h2>
            <p className="text-slate-600 mb-8">We couldn't find anything matching your criteria.</p>
            <button
              onClick={() => { clearSearch(); setSelectedCategory('All'); }}
              className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium transition-colors hover:bg-blue-600"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-md bg-white font-medium transition-colors hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center border rounded-md font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white border-slate-200 hover:border-blue-500 hover:text-blue-500'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-md bg-white font-medium transition-colors hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
