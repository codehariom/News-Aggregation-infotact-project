import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  language: Yup.string().required('Select a language'),
  notifications: Yup.object({
    email: Yup.boolean(),
    sms: Yup.boolean(),
    push: Yup.boolean(),
  })
});

export default function Settings() {
  const [initialValues, setInitialValues] = useState({
    username: '',
    email: '',
    language: 'en',
    notifications: {
      email: true,
      sms: false,
      push: true,
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await axios.get('/api/settings');
        setInitialValues(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  async function handleSubmit(values) {
    try {
      await axios.put('/api/settings', values);
      alert('Settings updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update settings');
    }
  }

  if (loading) return <div className="p-6">Loading settings...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Account Preferences</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
        {({ values }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Field name="username" className="w-full border rounded-md p-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Field type="email" name="email" className="w-full border rounded-md p-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <Field as="select" name="language" className="w-full border rounded-md p-2">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="gu">Gujarati</option>
              </Field>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Notification Settings</h3>
              <label className="flex items-center gap-2">
                <Field type="checkbox" name="notifications.email" /> Email Notifications
              </label>
              <label className="flex items-center gap-2">
                <Field type="checkbox" name="notifications.sms" /> SMS Notifications
              </label>
              <label className="flex items-center gap-2">
                <Field type="checkbox" name="notifications.push" /> Push Notifications
              </label>
            </div>

            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">Save Changes</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
