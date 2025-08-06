<<<<<<< HEAD
import React, { useState } from "react";
import FactCheckForm from "../components/FactCheckForm";
import FactCheckCard from "../components/FactCheckCard";
import SortDropdown from "../components/SortDropdown";
import TagList from "../components/TagList";
import NewsCommentsModal from "../components/NewsCommentsModal";
import AnnotationForm from "../components/AnnotationForm"; 
import Header from "../components/Header";

const FactCheckInterface = () => {
  const [factChecks, setFactChecks] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleNewFactCheck = (data) => {
    setFactChecks((prev) => [data, ...prev]);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sorted = [...factChecks].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setFactChecks(sorted);
  };

  const openComments = (post) => {
    setCurrentPost(post);
    setShowModal(true);
  };

  return (
    <>
      <Header></Header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          
          <FactCheckForm onSubmit={handleNewFactCheck} />

          <div className="flex justify-between items-center mt-8 mb-4">
            <TagList tags={selectedTags} setTags={setSelectedTags} />
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {factChecks.map((item, index) => (
              <FactCheckCard
                key={index}
                data={item}
                onCommentClick={() => openComments(item)}
              />
            ))}
          </div>

          
          <div className="mt-12">
            <AnnotationForm />
          </div>
        </div>

        {showModal && (
          <NewsCommentsModal
            post={currentPost}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default FactCheckInterface;
=======
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
     name: Yup.string()
    .required('Name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Register = () => {
  // const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', values);
      localStorage.setItem('token', res.data.token);
      // navigate('/news');
    } catch (error) {
      setFieldError('email', 'Invalid email or password',error);
      setFieldError('name', 'Invalid email or password',error);
      setFieldError('password', 'Invalid email or password',error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Register Now </h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
                <div>
                <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-full p-2 border rounded-md "
                  placeholder="Enter your Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-2 border rounded-md "
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your password"
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
              >
                {isSubmitting ? 'Register ...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm text-gray-600 mt-4">
           Login to Your Account{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
>>>>>>> 08dd369930b411f8028c5dcb9abbc60c1f2d46b4
