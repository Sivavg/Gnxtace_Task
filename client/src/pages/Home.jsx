import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutTemplate, ArrowRight, Code2, Zap, Layers } from 'lucide-react';

const features = [
  {
    icon: <LayoutTemplate size={24} />,
    title: 'Curated Collection',
    desc: 'Hand-picked, high-quality templates for modern SaaS applications.',
  },
  {
    icon: <Code2 size={24} />,
    title: 'Developer First',
    desc: 'Clean code structure, ready to be integrated into your next project.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Lightning Fast',
    desc: 'Optimized performance and minimal dependencies for quick load times.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Easily Customizable',
    desc: 'Built with standard CSS, making it trivial to match your brand identity.',
  },
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 text-center bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Build your next SaaS <br />
            <span className="text-blue-500">faster than ever.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-[600px] mx-auto mb-10">
            Stop building from scratch. Discover premium, production-ready templates designed for modern web applications.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/templates" className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 hover:bg-blue-600 inline-flex items-center gap-2 text-lg">
              Browse Templates
              <ArrowRight size={18} />
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="bg-transparent text-slate-900 border border-slate-200 px-6 py-3 rounded-md font-medium transition-all duration-200 hover:bg-slate-50 hover:border-slate-600 inline-flex items-center gap-2 text-lg">
                Create free account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Designed for developers</h2>
            <p className="text-xl text-slate-600 max-w-[700px] mx-auto">
              Everything you need to launch your product quickly without compromising on quality or design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feat) => (
              <div key={feat.title} className="bg-white p-8 rounded-xl border border-slate-200 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feat.title}</h3>
                <p className="text-slate-600">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-blue-500 text-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to start building?</h2>
          <p className="text-xl mb-8 opacity-90">Join developers who are shipping faster with Templio.</p>
          <Link to="/templates" className="bg-white text-blue-500 px-8 py-3 rounded-md font-medium transition-colors duration-200 hover:bg-slate-50 inline-flex items-center gap-2 text-lg">
            Explore Library <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
