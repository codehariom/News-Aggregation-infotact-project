import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Dashboard = () => {
  const [theme, setTheme] = useState('light');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Static metrics (replace with backend API calls, e.g., /api/metrics)
  const metrics = {
    totalUsers: 1250,
    totalArticles: 320,
    totalAnnotations: 450,
    totalSourcePendingDebunk: 15,
    contentModeration: { pending: 25, approved: 280, rejected: 15 },
    sourceManagement: { active: 50, inactive: 10 },
  };

  // Static notifications (replace with backend API calls, e.g., /api/notifications)
  const notifications = [
    { id: 1, message: 'New user registered: John Doe', time: '2 mins ago' },
    { id: 2, message: 'Article pending review: AI Trends 2025', time: '10 mins ago' },
    { id: 3, message: 'Source debunk pending: Fake News Alert', time: '1 hour ago' },
  ];

  // Fetch user data and verify admin role
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const userData = response.data;
        if (userData.role !== 'admin') {
          alert('Access denied: Admin role required');
          localStorage.removeItem('token');
          return;
        }
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        alert('Session expired. Please log in again.');
      }
    };
    fetchUserData();
  }, []);

  // Validation schema for settings form
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    theme: Yup.string()
      .oneOf(['light', 'dark'], 'Invalid theme')
      .required('Theme is required'),
  });

  // Handle settings form submission
  const handleSettingsSubmit = async (values, { setSubmitting }) => {
    try {
      setTheme(values.theme);
      const updateData = { username: values.username };
      if (values.password) {
        updateData.password = values.password;
      }
      await axios.put('http://localhost:5000/auth/profile', updateData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser({ ...user, username: values.username });
      setIsSettingsOpen(false);
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    alert('Logged out successfully');
  };

  // If no user or not admin, show restricted message
  if (user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>Please log in with an admin account to view the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'} p-6`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800 text-white'} p-6 rounded-lg w-96`}>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <Formik
              initialValues={{ username: user?.username || '', password: '', theme }}
              validationSchema={validationSchema}
              onSubmit={handleSettingsSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="theme" className="block mb-1">Theme</label>
                    <Field
                      as="select"
                      name="theme"
                      className={`w-full p-2 border rounded ${theme === 'light' ? 'text-black' : 'text-white bg-gray-700'}`}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </Field>
                    <ErrorMessage name="theme" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="username" className="block mb-1">Username</label>
                    <Field
                      type="text"
                      name="username"
                      className={`w-full p-2 border rounded ${theme === 'light' ? 'text-black' : 'text-white bg-gray-700'}`}
                      placeholder="Update Username"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-1">Password (leave blank to keep unchanged)</label>
                    <Field
                      type="password"
                      name="password"
                      className={`w-full p-2 border rounded ${theme === 'light' ? 'text-black' : 'text-white bg-gray-700'}`}
                      placeholder="New Password"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300 disabled:bg-green-400"
                    >
                      {isSubmitting ? 'Saving...' : 'Save & Close'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSettingsOpen(false)}
                      className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Users', value: metrics.totalUsers },
          { label: 'Total Articles', value: metrics.totalArticles },
          { label: 'Total Annotations', value: metrics.totalAnnotations },
          { label: 'Pending Debunk', value: metrics.totalSourcePendingDebunk },
        ].map(({ label, value }) => (
          <div
            key={label}
            className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow hover:shadow-lg transition-shadow`}
          >
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow`}>
          <h3 className="text-lg font-semibold mb-4">Content Moderation Status</h3>
          <div className="space-y-2">
            <p><strong>Pending:</strong> {metrics.contentModeration.pending}</p>
            <p><strong>Approved:</strong> {metrics.contentModeration.approved}</p>
            <p><strong>Rejected:</strong> {metrics.contentModeration.rejected}</p>
          </div>
        </div>
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow`}>
          <h3 className="text-lg font-semibold mb-4">Source Management</h3>
          <div className="space-y-2">
            <p><strong>Active:</strong> {metrics.sourceManagement.active}</p>
            <p><strong>Inactive:</strong> {metrics.sourceManagement.inactive}</p>
          </div>
        </div>
      </div>

      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow`}>
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li key={n.id} className="flex justify-between">
              <span><strong>{n.message}</strong></span>
              <span className="text-gray-500">{n.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;