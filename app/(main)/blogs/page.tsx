'use client';

import { useState, ChangeEvent, FC, ReactNode, JSX } from 'react';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Filter,
  Heart,
  Pill,
  Shield,
  Thermometer,
  Stethoscope,
  Star
} from 'lucide-react';

type Category =
  | 'All'
  | 'Health Tips'
  | 'Medications'
  | 'Wellness'
  | 'Prevention'
  | 'Pharmacy News';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: Exclude<Category, 'All'>;
  image: string;
  featured: boolean;
  tags: string[];
}

const PharmacyBlog: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Category[] = [
    'All',
    'Health Tips',
    'Medications',
    'Wellness',
    'Prevention',
    'Pharmacy News'
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: '10 Essential Vitamins for Winter Wellness',
      excerpt:
        'Discover the key vitamins that can help boost your immune system and keep you healthy during the cold winter months.',
      author: 'Dr. Sarah Johnson',
      date: '2025-08-10',
      readTime: '5 min read',
      category: 'Health Tips',
      image: '🍊',
      featured: true,
      tags: ['vitamins', 'winter', 'immunity']
    },
    {
      id: 2,
      title: 'Understanding Your Prescription: A Complete Guide',
      excerpt:
        'Learn how to read your prescription labels, understand dosage instructions, and make the most of your medications.',
      author: 'PharmD Mike Chen',
      date: '2025-08-08',
      readTime: '7 min read',
      category: 'Medications',
      image: '💊',
      featured: false,
      tags: ['prescriptions', 'safety', 'education']
    },
    {
      id: 3,
      title: 'The Benefits of Regular Health Screenings',
      excerpt:
        'Why preventive care matters and how regular screenings can help detect health issues before they become serious.',
      author: 'Dr. Emily Rodriguez',
      date: '2025-08-05',
      readTime: '6 min read',
      category: 'Prevention',
      image: '🩺',
      featured: true,
      tags: ['screening', 'prevention', 'health']
    },
    {
      id: 4,
      title: 'Managing Chronic Conditions: Tips for Daily Success',
      excerpt:
        'Practical strategies for managing chronic conditions like diabetes, hypertension, and arthritis in your daily life.',
      author: 'Dr. James Wilson',
      date: '2025-08-03',
      readTime: '8 min read',
      category: 'Wellness',
      image: '❤️',
      featured: false,
      tags: ['chronic care', 'management', 'lifestyle']
    },
    {
      id: 5,
      title: 'New Digital Prescription Services Now Available',
      excerpt:
        'Exciting updates to our pharmacy services including digital prescriptions, automatic refills, and mobile notifications.',
      author: 'Pharmacy Team',
      date: '2025-08-01',
      readTime: '4 min read',
      category: 'Pharmacy News',
      image: '📱',
      featured: false,
      tags: ['technology', 'services', 'updates']
    },
    {
      id: 6,
      title: 'Mental Health and Medication: Breaking the Stigma',
      excerpt:
        'Understanding the importance of mental health medications and how to have open conversations with your healthcare provider.',
      author: 'Dr. Lisa Park',
      date: '2025-07-28',
      readTime: '9 min read',
      category: 'Wellness',
      image: '🧠',
      featured: false,
      tags: ['mental health', 'stigma', 'support']
    }
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const getCategoryIcon = (category: Category): ReactNode => {
    const icons: Partial<Record<Category, JSX.Element>> = {
      'Health Tips': <Heart className="w-4 h-4" />,
      Medications: <Pill className="w-4 h-4" />,
      Wellness: <Shield className="w-4 h-4" />,
      Prevention: <Thermometer className="w-4 h-4" />,
      'Pharmacy News': <Stethoscope className="w-4 h-4" />
    };
    return icons[category] || <Star className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Health & Wellness Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert advice, health tips, and the latest updates from our
              pharmacy professionals
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12 b">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {selectedCategory === 'All' && searchQuery === '' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="p-8">
                    <div className="text-4xl mb-4">{post.image}</div>
                    <div className="flex items-center gap-2 mb-4">
                      {getCategoryIcon(post.category)}
                      <span className="text-sm font-medium text-green-600">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-sm text-gray-500">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {post.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600 font-medium group-hover:gap-3 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedCategory === 'All'
              ? 'All Articles'
              : `${selectedCategory} Articles`}
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({filteredPosts.length})
            </span>
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="text-3xl mb-4">{post.image}</div>
                    <div className="flex items-center gap-2 mb-3">
                      {getCategoryIcon(post.category)}
                      <span className="text-xs font-medium text-green-600">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {post.author}
                      </span>
                      <div className="flex items-center gap-1 text-green-600 text-sm font-medium group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Stay Updated with Health Tips
          </h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest health advice,
            wellness tips, and pharmacy updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyBlog;
