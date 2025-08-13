import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    sortBy: 'date',
    search: '',
  });
  const [categories] = useState(['All', 'Technology', 'Politics', 'Health', 'Sports']); // Static categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Demo data for when API is not available
  const demoArticles = [
    {
      _id: 'demo1',
      title: 'AI Breakthrough: New Language Model Shows Human-Level Understanding',
      source: 'TechDaily',
      category: 'Technology',
      createdAt: '2024-01-15T10:30:00Z',
      reliabilityScore: 95,
      summary: 'Researchers have developed a new AI model that demonstrates unprecedented understanding of human language and context.',
      content: 'A groundbreaking development in artificial intelligence has been achieved by researchers at Stanford University...'
    },
    {
      _id: 'demo2',
      title: 'Global Climate Summit Reaches Historic Agreement',
      source: 'WorldNews',
      category: 'Politics',
      createdAt: '2024-01-14T14:20:00Z',
      reliabilityScore: 88,
      summary: 'World leaders have agreed on ambitious new targets to combat climate change at the annual summit.',
      content: 'In a historic moment for environmental policy, representatives from over 150 countries...'
    },
    {
      _id: 'demo3',
      title: 'Breakthrough in Cancer Treatment Shows Promising Results',
      source: 'HealthJournal',
      category: 'Health',
      createdAt: '2024-01-13T09:15:00Z',
      reliabilityScore: 92,
      summary: 'Clinical trials of a new immunotherapy treatment have shown remarkable success rates in treating advanced cancer.',
      content: 'Medical researchers have announced promising results from phase III clinical trials...'
    },
    {
      _id: 'demo4',
      title: 'Underdog Team Makes Stunning Victory in Championship Finals',
      source: 'SportsCentral',
      category: 'Sports',
      createdAt: '2024-01-12T20:45:00Z',
      reliabilityScore: 85,
      summary: 'The underdog team has achieved an unexpected victory against the defending champions.',
      content: 'In what many are calling the greatest upset in sports history...'
    },
    {
      _id: 'demo5',
      title: 'SpaceX Successfully Launches Revolutionary Satellite Constellation',
      source: 'SpaceExplorer',
      category: 'Technology',
      createdAt: '2024-01-11T16:30:00Z',
      reliabilityScore: 90,
      summary: 'SpaceX has successfully deployed the first batch of its next-generation satellite network.',
      content: 'Elon Musk\'s aerospace company has achieved another milestone in space technology...'
    },
    {
      _id: 'demo6',
      title: 'New Economic Policy Announced to Address Inflation Concerns',
      source: 'BusinessTimes',
      category: 'Politics',
      createdAt: '2024-01-10T11:00:00Z',
      reliabilityScore: 87,
      summary: 'Government officials have unveiled a comprehensive economic plan to tackle rising inflation.',
      content: 'In response to growing economic concerns, policymakers have introduced...'
    }
  ];

  // Fetch user data to check authentication
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // Allow unauthenticated access to news feed
      }
    };
    fetchUserData();
  }, []);

  // Fetch articles based on filters
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params = {};
        if (filters.category && filters.category !== 'All') {
          params.category = filters.category;
        }
        if (filters.sortBy) {
          params.sortBy = filters.sortBy;
        }
        if (filters.search) {
          params.search = filters.search;
        }
        const response = await axios.get('http://localhost:5000/api/articles', { params });
        setArticles(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles. Using demo data instead.');
        // Use demo data when API fails
        setArticles(demoArticles);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [filters]);

  // Filter demo articles based on current filters
  const getFilteredArticles = () => {
    let filtered = articles.length > 0 ? articles : demoArticles;
    
    // Apply category filter
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(article => article.category === filters.category);
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.summary.toLowerCase().includes(searchLower) ||
        article.source.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    if (filters.sortBy === 'reliability') {
      filtered = [...filtered].sort((a, b) => (b.reliabilityScore || 0) - (a.reliabilityScore || 0));
    } else {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return filtered;
  };

  // Handle filter changes
  const handleFilterSubmit = (values) => {
    setFilters({
      ...filters,
      category: values.category,
      sortBy: values.sortBy,
      search: values.search,
    });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    alert('Logged out successfully');
  };

  const filteredArticles = getFilteredArticles();

  return (
    <div className={`min-h-screen bg-gray-100 p-6`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News Feed</h1>
        {user && (
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Filter Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Filter Articles</h2>
        <Formik
          initialValues={{ category: 'All', sortBy: 'date', search: '' }}
          onSubmit={handleFilterSubmit}
        >
          {() => (
            <Form className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <Field
                  as="select"
                  name="category"
                  className="w-full p-2 border rounded text-black"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="flex-1">
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                  Sort By
                </label>
                <Field
                  as="select"
                  name="sortBy"
                  className="w-full p-2 border rounded text-black"
                >
                  <option value="date">Date (Newest First)</option>
                  <option value="reliability">Reliability Score</option>
                </Field>
              </div>
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search
                </label>
                <Field
                  type="text"
                  name="search"
                  placeholder="Search articles..."
                  className="w-full p-2 border rounded text-black"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                  Apply Filters
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Demo Data Notice */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {error} The page is currently displaying demo data for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading articles...</p>
        ) : filteredArticles.length === 0 ? (
          <p className="text-center text-gray-600">No articles found matching your criteria.</p>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="mb-2">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  article.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
                  article.category === 'Politics' ? 'bg-red-100 text-red-800' :
                  article.category === 'Health' ? 'bg-green-100 text-green-800' :
                  article.category === 'Sports' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {article.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-2">
                <strong>Source:</strong> {article.source || 'N/A'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Date:</strong>{' '}
                {new Date(article.createdAt).toLocaleDateString() || 'N/A'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Reliability Score:</strong> {article.reliabilityScore || 0}/100
              </p>
              {article.summary && (
                <p className="text-gray-700 mb-4 line-clamp-3">{article.summary}</p>
              )}
              <div className="flex gap-2">
                <a
                  href={`/article/${article._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details
                </a>
                {user && (
                  <a
                    href={`/submit-annotation/${article._id}`}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Submit Annotation
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsFeed

