import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutTemplate, Heart, Command } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 py-4">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500 flex items-center gap-2">
          <Command size={24} />
          Templio
        </Link>

        {/* Desktop nav */}
        <div className="flex gap-6 items-center">
          <Link
            to="/templates"
            className={`font-medium transition-colors duration-200 flex items-center gap-2 ${isActive('/templates') ? 'text-blue-500' : 'text-slate-600 hover:text-blue-500'}`}
          >
            <LayoutTemplate size={18} />
            Explore
          </Link>
          {isAuthenticated && (
            <Link
              to="/favorites"
              className={`font-medium transition-colors duration-200 flex items-center gap-2 ${isActive('/favorites') ? 'text-blue-500' : 'text-slate-600 hover:text-blue-500'}`}
            >
              <Heart size={18} />
              Favorites
            </Link>
          )}
        </div>

        {/* Right side */}
        <div className="flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="font-medium">{user?.name}</span>
              </div>
              <button onClick={handleLogout} className="bg-transparent text-slate-900 border border-slate-200 px-4 py-2 rounded-md font-medium transition-all duration-200 hover:bg-slate-50 hover:border-slate-600 flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium text-slate-600 hover:text-blue-500 transition-colors duration-200">Sign in</Link>
              <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 hover:bg-blue-600 inline-flex items-center gap-2">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
