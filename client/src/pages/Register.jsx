import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { User, Mail, Lock, ArrowRight, Loader2, Command, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setApiError('');
    setLoading(true);
    try {
      const res = await authAPI.register(form);
      toast.success(`Account created! Please sign in.`);
      navigate('/login', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setApiError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-70px)] p-8">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-[450px] border border-slate-200">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-500 font-bold text-2xl mb-6">
            <Command size={24} />
            Templio
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-slate-600">Start exploring premium templates today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {apiError && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-6 border border-red-200">{apiError}</div>}
          {errors.name && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-6 border border-red-200">{errors.name}</div>}
          {errors.email && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-6 border border-red-200">{errors.email}</div>}
          {errors.password && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-6 border border-red-200">{errors.password}</div>}

          {/* Name */}
          <div className="mb-6">
            <label className="block font-medium mb-2 text-sm">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full py-3 pl-11 pr-4 border border-slate-200 rounded-md text-base transition-colors focus:outline-none focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block font-medium mb-2 text-sm">Email address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full py-3 pl-11 pr-4 border border-slate-200 rounded-md text-base transition-colors focus:outline-none focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block font-medium mb-2 text-sm">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPwd ? 'text' : 'password'}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full py-3 pl-11 pr-11 border border-slate-200 rounded-md text-base transition-colors focus:outline-none focus:border-blue-500"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 bg-transparent border-none cursor-pointer flex items-center"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3.5 rounded-md font-medium text-base mt-4 transition-colors hover:bg-blue-600 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>Create Account <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="text-center mt-8 text-sm text-slate-600">
          Already have an account? <Link to="/login" className="text-blue-500 font-medium hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
