import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa6';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Username must be at least 2 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .optional(),
});

const UserProfile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    role: '',
    reputation: 0,
    subscriptions: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        // Ensure contribution & history are arrays
        setUser({
          name: response.data.name || '',
          email: response.data.email || '',
          role: response.data.role || '',
          reputationScore: response.data.reputationScore || 0,
          contribution: response.data.contribution || [],
          history: response.data.history || [],
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        // navigate('/login');
      }
    };
    fetchUserData();
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const updateData = { ...values };
      if (!values.password) delete updateData.password; // Omit password if unchanged
      await axios.put('http://localhost:5000/auth/profile', updateData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser({ ...user, ...updateData });
      setIsEditing(false);
      setShowPassword(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setFieldError('email', 'Error updating profile');
    }
    setSubmitting(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile Dashboard</h1>

        {/* User Info Display */}
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Username</h2>
              <p>{user.username || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Email</h2>
              <p>{user.email || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Role</h2>
              <p>{user.role || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Reputation</h2>
              <p>{user.reputation || 0}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Subscriptions</h2>
              <ul className="list-disc pl-5">

                {user.subscriptions && user.subscriptions.length > 0 ? (
                  user.subscriptions.map((item, index) => (
                    <li key={index} className="text-gray-600">{item}</li>
                  ))
                ) : (
                  <li className="text-gray-600">No subscriptions</li>
                )}

                {(user.contribution || []).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold">History</h2>
              <ul className="list-disc pl-5">
                {(user.history || []).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}

              </ul>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          /* Formik Form for Editing */
          <Formik
            initialValues={{
              username: user.username || '',
              email: user.email || '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password (leave blank to keep unchanged)
                  </label>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <IoEye className="h-5 w-5" />
                    )}
                  </button>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 disabled:bg-green-400"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setShowPassword(false);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
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
          className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
