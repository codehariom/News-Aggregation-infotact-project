import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
// import { Link } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (values, { setSubmitting, setFieldError, setStatus }) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/register', {
        username: values.username,
        email: values.email,
        password: values.password
      });
      localStorage.setItem('token', res.data.token);
      setStatus({ success: 'Registration successful! Redirecting...' });
      // navigate('/news');
    } catch (error) {
      if (error.response?.data?.message) {
        setFieldError('email', error.response.data.message);
      } else {
        setFieldError('email', 'Registration failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  
  const getStrengthColor = () => {
    if (strength <= 2) return 'from-red-500 to-red-600';
    if (strength <= 3) return 'from-yellow-500 to-yellow-600';
    if (strength <= 4) return 'from-blue-500 to-blue-600';
    return 'from-green-500 to-green-600';
  };

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Join Truth Seeker
          </h1>
          <p className="text-gray-700">Start your journey to discover the truth</p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl p-8 border border-2 shadow-2xl">
          <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status, values }) => (
              <Form className="space-y-6">
                {/* Username Field */}
                <div className="group">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-700 transition-colors">
                    Username
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Choose your username"
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-400 text-sm mt-1 flex items-center"
                  >
                    {(msg) => <span>{msg}</span>}
                  </ErrorMessage>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-700 transition-colors">
                    Email
                  </label>
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400 text-sm mt-1 flex items-center"
                  >
                    {(msg) => <span>{msg}</span>}
                  </ErrorMessage>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-700 transition-colors">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2   transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <IoEye className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400 text-sm mt-2 flex items-center"
                  >
                    {(msg) => <span>{msg}</span>}
                  </ErrorMessage>
                </div>

                {/* Success Message */}
                {status?.success && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-400 text-center">
                    🎉 {status.success}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative py-3 px-6 bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 "
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        🚀 Create Account
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Form>
            )}
          </Formik>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Already have an account?{' '}
              <a to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;