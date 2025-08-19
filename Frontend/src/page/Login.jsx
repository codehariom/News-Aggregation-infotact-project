import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
// import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (values, { setSubmitting, setFieldError, setStatus }) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', values);
      localStorage.setItem('token', res.data.token);
      setStatus({ success: 'Login successful! Redirecting...' });
      setLoginAttempts(0);
      // navigate('/news');
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      if (error.response?.data?.message) {
        setFieldError('email', error.response.data.message);
        setFieldError('password', error.response.data.message);
      } else {
        setFieldError('email', 'Invalid email or password');
        setFieldError('password', 'Invalid email or password');
      }
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold  mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Continue your journey to discover the truth</p>
        </div>

        {/* Form Card */}
        <div className= " rounded-xl p-10 border border-2  ">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium  mb-2 group-focus-within:text-blue-400 transition-colors">
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
                    className="text-red-400 text-sm mt-3 flex items-center"
                  >
                    {(msg) => <span>{msg}</span>}
                  </ErrorMessage>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium  mb-2 group-focus-within:text-blue-400 transition-colors">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="w-full px-4 py-3  border border-gray-600 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2  transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <IoEye className="h-5 w-5" />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400 text-sm mt-1 flex items-center"
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
                        Signing In...
                      </>
                    ) : (
                      <>
                        🚀 Sign In
                      </>
                    )}
                  </span>
                </button>
              </Form>
            )}
          </Formik>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Don't have an account?{' '}
              <a to="/register" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;