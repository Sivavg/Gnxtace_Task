require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('./models/Template.model');

const templates = [
  {
    name: 'NexaFlow SaaS Dashboard',
    description: 'A sleek, modern SaaS dashboard template with analytics charts, user management, and subscription tracking. Built with responsive design and dark mode support.',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'Dashboard',
    tags: ['analytics', 'saas', 'dark mode', 'charts'],
    isPremium: true,
    price: 49,
    previewUrl: 'https://demo.nexaflow.com',
    rating: 4.9,
    downloads: 2340,
  },
  {
    name: 'LaunchPad Landing Page',
    description: 'High-converting landing page template for SaaS products. Features hero section, feature showcases, pricing tables, testimonials, and CTA blocks.',
    thumbnail_url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    category: 'Landing Page',
    tags: ['marketing', 'conversion', 'hero', 'pricing'],
    isPremium: false,
    price: 0,
    previewUrl: 'https://demo.launchpad.com',
    rating: 4.7,
    downloads: 5120,
  },
  {
    name: 'ShopForge E-Commerce',
    description: 'Full-featured e-commerce template with product listings, cart, wishlist, checkout flow, and order tracking. Optimized for mobile shopping experiences.',
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    category: 'E-Commerce',
    tags: ['shop', 'cart', 'checkout', 'products'],
    isPremium: true,
    price: 79,
    previewUrl: 'https://demo.shopforge.com',
    rating: 4.8,
    downloads: 1870,
  },
  {
    name: 'Folio Pro Portfolio',
    description: 'Stunning portfolio template for designers and developers. Features animated project showcases, skills section, timeline, and contact form with social links.',
    thumbnail_url: 'https://images.unsplash.com/photo-1545665277-5937489579f2?w=800&q=80',
    category: 'Portfolio',
    tags: ['creative', 'designer', 'animation', 'showcase'],
    isPremium: false,
    price: 0,
    previewUrl: 'https://demo.foliopro.com',
    rating: 4.6,
    downloads: 3890,
  },
  {
    name: 'AdminPulse Control Panel',
    description: 'Enterprise-grade admin panel with role-based access control, data tables, form builders, notification system, and comprehensive UI component library.',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: 'Admin Panel',
    tags: ['admin', 'dashboard', 'rbac', 'enterprise'],
    isPremium: true,
    price: 99,
    previewUrl: 'https://demo.adminpulse.com',
    rating: 4.9,
    downloads: 987,
  },
  {
    name: 'InkWell Blog Platform',
    description: 'Clean and elegant blog template with featured posts, category filters, author profiles, comments section, newsletter signup, and SEO-optimized structure.',
    thumbnail_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    category: 'Blog',
    tags: ['writing', 'content', 'seo', 'newsletter'],
    isPremium: false,
    price: 0,
    previewUrl: 'https://demo.inkwell.com',
    rating: 4.5,
    downloads: 4210,
  },
  {
    name: 'CloudBase SaaS Starter',
    description: 'Complete SaaS starter template with authentication flows, onboarding wizard, billing integration, team management, and settings panel. Ready to ship.',
    thumbnail_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    category: 'SaaS',
    tags: ['starter', 'auth', 'billing', 'teams'],
    isPremium: true,
    price: 129,
    previewUrl: 'https://demo.cloudbase.com',
    rating: 4.8,
    downloads: 1560,
  },
  {
    name: 'Pixel Portfolio Gallery',
    description: 'Photography and creative portfolio with masonry gallery layout, lightbox viewer, client testimonials, booking system, and social media integration.',
    thumbnail_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'Portfolio',
    tags: ['photography', 'gallery', 'creative', 'lightbox'],
    isPremium: false,
    price: 0,
    previewUrl: 'https://demo.pixel.com',
    rating: 4.4,
    downloads: 2780,
  },
  {
    name: 'MetricHub Analytics',
    description: 'Data analytics dashboard with real-time charts, KPI widgets, customizable widgets, dark/light themes, and multi-tenant support for enterprise teams.',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'Dashboard',
    tags: ['metrics', 'kpi', 'real-time', 'analytics'],
    isPremium: true,
    price: 59,
    previewUrl: 'https://demo.metrichub.com',
    rating: 4.7,
    downloads: 3120,
  },
  {
    name: 'Bloom Marketing Site',
    description: 'Beautiful agency and marketing site template with parallax effects, animated counters, team showcase, portfolio grid, and integrated contact forms.',
    thumbnail_url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
    category: 'Landing Page',
    tags: ['agency', 'marketing', 'parallax', 'animation'],
    isPremium: false,
    price: 0,
    previewUrl: 'https://demo.bloom.com',
    rating: 4.6,
    downloads: 6340,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Template.deleteMany({});
    console.log('🗑️  Cleared existing templates');

    const created = await Template.insertMany(templates);
    console.log(`🌱 Seeded ${created.length} templates successfully!`);

    console.log('\n📋 Template Categories seeded:');
    const categories = [...new Set(templates.map((t) => t.category))];
    categories.forEach((cat) => console.log(`   • ${cat}`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedDB();
