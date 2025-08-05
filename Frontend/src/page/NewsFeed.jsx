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
        setError('Failed to load articles. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [filters]);

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

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading articles...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-600">No articles found.</p>
        ) : (
          articles.map((article) => (
            <div
              key={article._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-2">
                <strong>Source:</strong> {article.source || 'N/A'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Date:</strong>{' '}
                {new Date(article.createdAt).toLocaleDateString() || 'N/A'}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Reliability Score:</strong> {article.reliabilityScore || 0}
              </p>
              <a
                href={`/article/${article._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </a>
              {user && (
                <a
                  href={`/submit-annotation/${article._id}`}
                  className="ml-4 text-green-600 hover:underline"
                >
                  Submit Annotation
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsFeed