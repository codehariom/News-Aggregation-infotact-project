import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .optional(),
});

// UserDashboard component
const UserDashboard = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    reputationScore: 0,
    contribution: [],
    history: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put('/api/user/profile', values, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser({ ...user, ...values });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setSubmitting(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">User Profile Dashboard</h1>

        {/* User Info Display */}
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Name</h2>
              <p>{user.name}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Email</h2>
              <p>{user.email}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Role</h2>
              <p>{user.role}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Reputation Score</h2>
              <p>{user.reputationScore}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Contributions</h2>
              <ul className="list-disc pl-5">
                {user.contribution.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold">History</h2>
              <ul className="list-disc pl-5">
                {user.history.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          /* Formik Form for Editing */
          <Formik
            initialValues={{
              name: user.name,
              email: user.email,
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password (leave blank to keep unchanged)
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;