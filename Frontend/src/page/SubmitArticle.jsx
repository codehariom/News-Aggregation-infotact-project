import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios';

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
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: '',
    publishDate: new Date().toISOString().slice(0, 10),
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
      // const res = await axios.post('/api/articles', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // });

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

  const inputClass = 'block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
  const errorClass = 'text-red-600 text-sm mt-1';

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Submit Article</h1>
          <p className="text-sm text-gray-500 mt-1">Provide clear, concise details. Fields marked required must be completed.</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-6">
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form className="space-y-6">
                <div>
                  <label className={labelClass}>Title</label>
                  <Field name="title" placeholder="Article title" className={inputClass} />
                  <div className={errorClass}><ErrorMessage name="title" /></div>
                </div>

                <div>
                  <label className={labelClass}>Summary</label>
                  <Field as="textarea" name="summary" rows="3" placeholder="Short summary (max 200 chars)" className={inputClass} />
                  <div className={errorClass}><ErrorMessage name="summary" /></div>
                </div>

                <div>
                  <label className={labelClass}>Content</label>
                  <Field as="textarea" name="content" rows="8" placeholder="Write your article here..." className={inputClass} />
                  <div className={errorClass}><ErrorMessage name="content" /></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Category</label>
                    <Field as="select" name="category" className={inputClass}>
                      <option value="">-- Select --</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Field>
                    <div className={errorClass}><ErrorMessage name="category" /></div>
                  </div>

                  <div>
                    <label className={labelClass}>Tags</label>
                    <Field name="tags" placeholder="comma,separated,tags" className={inputClass} />
                    <div className={errorClass}><ErrorMessage name="tags" /></div>
                  </div>

                  <div>
                    <label className={labelClass}>Publish Date</label>
                    <Field name="publishDate" type="date" className={inputClass} />
                    <div className={errorClass}><ErrorMessage name="publishDate" /></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button type="submit" disabled={submitting} className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium disabled:opacity-60">
                    {submitting ? 'Submitting...' : 'Submit Article'}
                  </button>
                  <button
                    type="reset"
                    onClick={() => setPreviewSrc(null)}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
                  >
                    Reset
                  </button>
                </div>

                <p className="text-sm text-gray-500">Tip: tags should be comma-separated. Image is optional.</p>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}

