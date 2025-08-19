
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa6';
import {

  FaBell,
  FaSignOutAlt,
  FaEdit,
  FaCheck,
  FaTimes,
  FaChartLine,
  FaShieldAlt
} from 'react-icons/fa';

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
    joinDate: '2024-01-15',
    articlesSubmitted: 0,
    factChecksCompleted: 0,
    sourcesVerified: 0,
    lastActive: '2024-12-19',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);


  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
      }
    };

    setIsVisible(true);
    fetchUserData();
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError, setStatus }) => {
    try {
      const updateData = { ...values };
      if (!values.password) delete updateData.password;

      await axios.put('http://localhost:5000/auth/profile', updateData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setUser({ ...user, ...updateData });
      setIsEditing(false);
      setShowPassword(false);
      setStatus({ success: 'Profile updated successfully!' });
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
  };

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl  font-bold  mb-4">
            User Profile
          </h1>
          <p className="text-xl text-gray-400">Manage your account and track your progress</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - User Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-gray-300 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-black rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <h2 className="text-2xl font-bold text-black mb-2">{user.username || 'Username'}</h2>
                <p className="text-gray-700 mb-4">{user.role || 'User'}</p>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-700 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <FaCheck className="mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full bg-gray-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <FaTimes className="mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>

          {/* Right Side - Main Content */}
          <div className="lg:col-span-3 space-y-6">

            {/* Tab Content */}
            <div className="bg-gray-100 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl min-h-96">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-black mb-6">Profile Overview</h3>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black rounded-xl p-4 border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Reputation</p>
                          <p className="text-3xl font-bold text-yellow-400">{user.reputation || 0}</p>
                        </div>

                      </div>
                    </div>

                    <div className="bg-black rounded-xl p-4 border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Member Since</p>
                          <p className="text-xl font-bold text-blue-400">{user.joinDate || 'N/A'}</p>
                        </div>

                      </div>
                    </div>

                    <div className=" bg-black rounded-xl p-4 border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Last Active</p>
                          <p className="text-xl font-bold text-green-400">{user.lastActive || 'N/A'}</p>
                        </div>

                      </div>
                    </div>

                    <div className="bg-black rounded-xl p-4 border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Subscriptions</p>
                          <p className="text-xl font-bold text-purple-400">{user.subscriptions?.length || 0}</p>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Profile Form (when editing) */}
                  {isEditing && (
                    <div className="bg-white rounded-xl p-6 border border-gray-600">
                      <h4 className="text-xl font-bold text-black mb-4">Edit Profile</h4>
                      <Formik
                        initialValues={{
                          username: user.username || '',
                          email: user.email || '',
                          password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ isSubmitting, status }) => (
                          <Form className="space-y-4">
                            <div>
                              <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
                                Username
                              </label>
                              <Field
                                type="text"
                                name="username"
                                id="username"
                                className="w-full px-4 py-3  border border-gray-500 rounded-xl  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                placeholder="Enter your username"
                              />
                              <ErrorMessage name="username" component="div" className="text-red-400 text-sm mt-1" />
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                                Email
                              </label>
                              <Field
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-4 py-3  border border-gray-500 rounded-xl  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                placeholder="Enter your email"
                              />
                              <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                            </div>

                            <div className="relative">
                              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                                New Password (optional)
                              </label>
                              <Field
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                className="w-full px-4 py-3  border border-gray-500 rounded-xl  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                placeholder="Enter new password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-10 text-gray-400 hover:text-black transition-colors"
                              >
                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <IoEye className="h-5 w-5" />}
                              </button>
                              <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                            </div>

                            {status?.success && (
                              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-400 text-center">
                                🎉 {status.success}
                              </div>
                            )}
                          </Form>
                        )}
                      </Formik>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;