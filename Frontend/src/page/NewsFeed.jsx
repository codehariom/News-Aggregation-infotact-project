import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { demoArticles } from '../data/demoData';

const NewsFeed = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(demoArticles);
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    sortBy: 'date',
    search: '',
  });
  const [categories] = useState(['All', 'Technology', 'Politics', 'Health', 'Sports']); // Static categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Demo data is now imported from ../data/demoData.js

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
        
        console.log('Fetching articles with params:', params);
        const response = await axios.get('http://localhost:5000/api/articles', { params });
        console.log('API response:', response.data);
        if (response.data && response.data.length > 0) {
          setArticles(response.data);
          setError(null);
        } else {
          // If API returns empty data, use demo data
          setArticles(demoArticles);
          setError('No articles found from API. Displaying demo data instead.');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles from API. Using demo data instead.');
        // Use demo data when API fails
        setArticles(demoArticles);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [filters]);

  // Filter articles based on current filters
  const getFilteredArticles = () => {
    let filtered = articles && articles.length > 0 ? articles : demoArticles;
    
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
  console.log('Filtered articles:', filteredArticles);
  console.log('Current filters:', filters);

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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> This page is currently displaying demo data for demonstration purposes. 
              {error && ` ${error}`}
            </p>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading articles...</p>
        ) : filteredArticles.length === 0 ? (
          <p className="text-center text-gray-600">No articles found matching your criteria.</p>
        ) : (
          filteredArticles.map((article) => (
            <ArticleCard
              key={article._id}
              article={{
                id: article._id,
                title: article.title,
                description: article.summary || 'No description available',
                source: article.source || 'Unknown Source',
                publishedAt: article.createdAt,
                readTime: `${Math.ceil((article.summary?.length || 100) / 200)} min read`,
                sourceUrl: article.sourceUrl || 'https://example.com'
              }}
              onClick={(article) => {
                // Navigate to article details page
                navigate(`/article/${article.id}`);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NewsFeed

