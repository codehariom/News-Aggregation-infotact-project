import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

// Validation schema for annotation form
const annotationSchema = Yup.object({
  content: Yup.string()
    .min(10, 'Annotation must be at least 10 characters')
    .required('Annotation is required'),
});

const ArticleDetails = () => {
  const [article, setArticle] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch user data and article details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user data (optional, allows unauthenticated access)
        try {
          const userResponse = await axios.get('http://localhost:5000/auth/me', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setUser(userResponse.data);
        } catch (userError) {
          console.error('Error fetching user data:', userError);
          setUser(null); // Allow unauthenticated access
        }

        // Fetch article details
        const articleResponse = await axios.get(`http://localhost:5000/api/articles/${id}`);
        setArticle(articleResponse.data);

        // Fetch annotations
        const annotationsResponse = await axios.get(`http://localhost:5000/api/annotations/${id}`);
        setAnnotations(annotationsResponse.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching article or annotations:', error);
        setError('Failed to load article or annotations. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle annotation submission
  const handleAnnotationSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post(
        `http://localhost:5000/api/annotations/${id}`,
        { content: values.content },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      const annotationsResponse = await axios.get(`http://localhost:5000/api/annotations/${id}`);
      setAnnotations(annotationsResponse.data);
      resetForm();
      alert('Annotation submitted successfully');
    } catch (error) {
      console.error('Error submitting annotation:', error);
      alert('Failed to submit annotation. Please try again.');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <p className="text-center text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <p className="text-center text-red-500">{error || 'Article not found.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Article Details</h1>
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

      {/* Article Details */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
        <p className="text-gray-600 mb-2">
          <strong>Source:</strong> {article.source || 'N/A'}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Date:</strong> {new Date(article.createdAt).toLocaleDateString() || 'N/A'}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {article.category || 'N/A'}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Reliability Score:</strong> {article.reliabilityScore || 0}
        </p>
        <p className="text-gray-800 mb-4">{article.content || 'No content available.'}</p>
        <button 
          onClick={() => navigate('/news-feed')} 
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Back to News Feed
        </button>
      </div>

      {/* Annotations Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Annotations & Fact-Checks</h3>
        {annotations.length === 0 ? (
          <p className="text-gray-600">No annotations available.</p>
        ) : (
          <ul className="space-y-4">
            {annotations.map((annotation) => (
              <li key={annotation._id} className="border-b pb-4">
                <p className="text-gray-800">{annotation.content}</p>
                <p className="text-sm text-gray-500">
                  By {annotation.user?.username || 'Anonymous'} on{' '}
                  {new Date(annotation.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Annotation Submission Form (for logged-in users) */}
      {user && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Submit Annotation</h3>
          <Formik
            initialValues={{ content: '' }}
            validationSchema={annotationSchema}
            onSubmit={handleAnnotationSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Annotation
                  </label>
                  <Field
                    as="textarea"
                    name="content"
                    rows="4"
                    className="w-full p-2 border rounded text-black"
                    placeholder="Enter your annotation or fact-check..."
                  />
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300 disabled:bg-green-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Annotation'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;