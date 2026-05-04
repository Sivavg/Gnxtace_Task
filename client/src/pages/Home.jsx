import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutTemplate, Heart, Sparkles, ArrowRight, Star, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: <LayoutTemplate size={22} className="text-purple-400" />,
    title: 'Curated Templates',
    desc: 'Professionally designed templates for every use case.',
    color: 'from-purple-500/10 to-violet-500/10',
    border: 'rgba(139, 92, 246, 0.2)',
  },
  {
    icon: <Heart size={22} className="text-pink-400" fill="currentColor" />,
    title: 'Save Favorites',
    desc: 'Bookmark templates you love and access them instantly.',
    color: 'from-pink-500/10 to-rose-500/10',
    border: 'rgba(236, 72, 153, 0.2)',
  },
  {
    icon: <Zap size={22} className="text-amber-400" />,
    title: 'Lightning Fast',
    desc: 'Find and launch your perfect template in minutes.',
    color: 'from-amber-500/10 to-orange-500/10',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  {
    icon: <Shield size={22} className="text-emerald-400" />,
    title: 'Secure & Private',
    desc: 'Your account and favorites are fully protected.',
    color: 'from-emerald-500/10 to-green-500/10',
    border: 'rgba(16, 185, 129, 0.2)',
  },
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8 border border-purple-500/20 animate-fade-in-up">
            <Sparkles size={14} className="text-purple-400" />
            Mini SaaS Template Store — Built for Developers
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up stagger-1"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Find the Perfect{' '}
            <span className="gradient-text">Template</span>
            <br />
            for Your Next Project
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-2">
            Browse 10+ professionally crafted templates, filter by category, and save your favorites — all in one beautiful platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link
              to="/templates"
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-0.5"
            >
              <LayoutTemplate size={19} />
              Browse Templates
              <ArrowRight size={18} />
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base text-white glass hover:bg-white/10 transition-all duration-200 border border-white/10 hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-16 animate-fade-in-up stagger-4">
            {[
              { label: 'Templates', value: '10+' },
              { label: 'Categories', value: '7' },
              { label: 'Free Templates', value: '5' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Everything you need to{' '}
            <span className="gradient-text">ship faster</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A complete template discovery experience built with modern tools and a developer-first mindset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className={`p-6 rounded-2xl bg-gradient-to-br ${feat.color} transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1}s`, border: `1px solid ${feat.border}` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 glass">
                {feat.icon}
              </div>
              <h3 className="font-semibold text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {feat.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))', border: '1px solid rgba(139,92,246,0.2)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Ready to find your perfect template?
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Join thousands of developers and designers using Templio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/templates" className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-xl hover:shadow-purple-500/30">
                <LayoutTemplate size={18} />
                Explore Templates
              </Link>
              {!isAuthenticated && (
                <Link to="/register" className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-base glass hover:bg-white/10 transition-all duration-200 border border-white/15">
                  Create Free Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
