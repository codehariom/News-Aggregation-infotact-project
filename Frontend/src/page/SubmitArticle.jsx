import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const categories = [
  'News',
  'Opinion',
  'Tech',
  'Sports',
  'Entertainment',
  'Other',
];

const validationSchema = Yup.object({
  title: Yup.string().min(5, 'Title must be at least 5 characters').required('Required'),
  summary: Yup.string().min(10, 'Too short').max(200, 'Max 200 chars').required('Required'),
  content: Yup.string().min(20, 'Content too short').required('Required'),
  category: Yup.string().required('Select a category'),
  tags: Yup.string(),
  publishDate: Yup.date().required('Pick a date'),
  image: Yup.mixed().nullable(),
});

export default function SubmitArticleForm() {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: '',
    publishDate: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
    image: null,
  };

  async function handleSubmit(values, { resetForm }) {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('summary', values.summary);
      formData.append('content', values.content);
      formData.append('category', values.category);
      formData.append('tags', values.tags);
      formData.append('publishDate', values.publishDate);
      if (values.image) formData.append('image', values.image);

      // NOTE: change the URL to match your backend route
      const res = await axios.post('/api/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Article submitted successfully');
      resetForm();
      setPreviewSrc(null);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to submit article');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Submit New Article</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Field name="title" placeholder="Article title" className="w-full border rounded-md p-2" />
              <div className="text-red-600 text-sm mt-1"><ErrorMessage name="title" /></div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Summary</label>
              <Field as="textarea" name="summary" rows="3" placeholder="Short summary (max 200 chars)" className="w-full border rounded-md p-2" />
              <div className="text-red-600 text-sm mt-1"><ErrorMessage name="summary" /></div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <Field as="textarea" name="content" rows="8" placeholder="Write your article here..." className="w-full border rounded-md p-2" />
              <div className="text-red-600 text-sm mt-1"><ErrorMessage name="content" /></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Field as="select" name="category" className="w-full border rounded-md p-2">
                  <option value="">-- Select --</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Field>
                <div className="text-red-600 text-sm mt-1"><ErrorMessage name="category" /></div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <Field name="tags" placeholder="comma,separated,tags" className="w-full border rounded-md p-2" />
                <div className="text-red-600 text-sm mt-1"><ErrorMessage name="tags" /></div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Publish Date</label>
                <Field name="publishDate" type="date" className="w-full border rounded-md p-2" />
                <div className="text-red-600 text-sm mt-1"><ErrorMessage name="publishDate" /></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Featured Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  setFieldValue('image', file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setPreviewSrc(ev.target.result);
                    reader.readAsDataURL(file);
                  } else {
                    setPreviewSrc(null);
                  }
                }}
                className="w-full"
              />
              <div className="text-red-600 text-sm mt-1"><ErrorMessage name="image" /></div>

              {previewSrc && (
                <div className="mt-3">
                  <div className="text-sm font-medium mb-1">Preview</div>
                  <img src={previewSrc} alt="Preview" className="max-h-40 rounded-md object-cover" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium disabled:opacity-60">
                {submitting ? 'Submitting...' : 'Submit Article'}
              </button>

              <button type="button" onClick={() => {
                // reset by emitting a DOM reset signal — Formik resetForm is better done in submit outcome.
                // simple page reload to clear everything quickly (optional)
                // window.location.reload();
                alert('Use the form reset button in your UI or let the submit handler reset.');
              }} className="px-3 py-2 rounded-lg border">Reset</button>
            </div>

            <div className="text-sm text-gray-500 mt-2">Tip: tags should be comma-separated. Image is optional.</div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

