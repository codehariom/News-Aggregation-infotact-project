import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [theme, setTheme] = useState('light');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const contentRef = useRef(null);
  const sourceRef = useRef(null);
  const userGrowthRef = useRef(null);

  const metrics = {
    totalUsers: 1250,
    totalArticles: 320,
    totalAnnotations: 450,
    totalSourcePendingDebunk: 15,
    contentModeration: { pending: 25, approved: 280, rejected: 15 },
    sourceManagement: { active: 50, inactive: 10 },
  };

  const notifications = [
    { id: 1, message: 'New user registered: John Doe', time: '2 mins ago' },
    { id: 2, message: 'Article pending review: AI Trends 2025', time: '10 mins ago' },
    { id: 3, message: 'Source debunk pending: Fake News Alert', time: '1 hour ago' },
  ];

  useEffect(() => {
    if (contentRef.current) {
      new Chart(contentRef.current, {
        type: 'pie',
        data: {
          labels: ['Pending', 'Approved', 'Rejected'],
          datasets: [{
            data: [
              metrics.contentModeration.pending,
              metrics.contentModeration.approved,
              metrics.contentModeration.rejected,
            ],
            backgroundColor: ['#FFBB38', '#4CAF50', '#F44336'],
          }],
        },
        options: { responsive: true },
      });
    }

    if (sourceRef.current) {
      new Chart(sourceRef.current, {
        type: 'bar',
        data: {
          labels: ['Active', 'Inactive'],
          datasets: [{
            label: 'Sources',
            data: [
              metrics.sourceManagement.active,
              metrics.sourceManagement.inactive,
            ],
            backgroundColor: ['#2196F3', '#9E9E9E'],
          }],
        },
        options: { responsive: true },
      });
    }

    if (userGrowthRef.current) {
      new Chart(userGrowthRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'User Growth',
            data: [200, 300, 450, 600, 900, 1250],
            borderColor: '#4CAF50',
            fill: false,
          }],
        },
        options: { responsive: true },
      });
    }
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    theme: Yup.string()
      .oneOf(['light', 'dark'], 'Invalid theme')
      .required('Theme is required'),
  });

  const handleSettingsSubmit = (values, { setSubmitting }) => {
    setTheme(values.theme);
    // Simulate API call to update username/password
    console.log('Settings updated:', values);
    setIsSettingsOpen(false);
    setSubmitting(false);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'} p-6`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Settings
          </button>
          <button
            onClick={() => alert('Logged out')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg w-96`}>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <Formik
              initialValues={{ username: '', password: '', theme }}
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
                      className="w-full p-2 border rounded text-black"
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
                      className="w-full p-2 border rounded text-black"
                      placeholder="Update Username"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-1">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="w-full p-2 border rounded text-black"
                      placeholder="New Password"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-green-400"
                  >
                    Save & Close
                  </button>
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
          <canvas ref={contentRef} height="200"></canvas>
        </div>
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow`}>
          <h3 className="text-lg font-semibold mb-4">Source Management</h3>
          <canvas ref={sourceRef} height="200"></canvas>
        </div>
      </div>

      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow mb-6`}>
        <h3 className="text-lg font-semibold mb-4">User Growth Trend</h3>
        <canvas ref={userGrowthRef} height="200"></canvas>
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