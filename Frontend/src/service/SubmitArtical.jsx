import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SubmitArticle = () => {
  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters")
      .required("Title is required"),
    content: Yup.string()
      .min(20, "Content must be at least 20 characters")
      .required("Content is required"),
    category: Yup.string().required("Please select a category"),
  });

  // Initial Values
  const initialValues = {
    title: "",
    content: "",
    category: "",
  };

  // On Submit
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("/api/articles", values); // change API if needed
      alert("✅ Article submitted successfully!");
      resetForm();
    } catch (error) {
      alert("❌ Failed to submit article");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit New Article</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Title</label>
            <Field
              type="text"
              name="title"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Content</label>
            <Field
              as="textarea"
              name="content"
              rows="5"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Category</label>
            <Field
              as="select"
              name="category"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="politics">Politics</option>
              <option value="sports">Sports</option>
              <option value="health">Health</option>
              <option value="entertainment">Entertainment</option>
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit Article
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SubmitArticle;
