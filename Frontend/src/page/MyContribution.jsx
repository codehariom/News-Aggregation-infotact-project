/*
 MyContribution.jsx
 React + Tailwind component to display a logged-in user's submitted articles and their annotations.

 How it works:
 - On mount, it calls GET /api/my-contributions (backend must return user’s articles with annotations).
 - Shows each article (title, summary, date).
 - Under each article, shows its annotations list.

 Expected API Response (sample):
 [
   {
     "id": "1",
     "title": "Breaking News",
     "summary": "Short summary here",
     "createdAt": "2025-08-20T12:00:00Z",
     "annotations": [
        { "id": "a1", "text": "This is fake", "createdAt": "2025-08-21T10:00:00Z" }
     ]
   }
 ]
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegCommentDots } from "react-icons/fa";

export default function MyContribution() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("/api/my-contributions");
        // Ensure the response is always an array
        if (Array.isArray(res.data)) {
          setArticles(res.data);
        } else if (res.data && Array.isArray(res.data.articles)) {
          setArticles(res.data.articles);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error(err);
        setError("⚠️ Failed to load your contributions. Try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-6">⏳ Loading your contributions...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">📌 My Contributions</h2>
      
      {articles.length === 0 ? (
        <div className="text-gray-600">You haven’t submitted any articles yet.</div>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="border-b pb-4">
              <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
              <p className="text-gray-700 mb-2">{article.summary}</p>
              <div className="text-sm text-gray-500 mb-3">
                Submitted on {new Date(article.createdAt).toLocaleDateString()}
              </div>

              {article.annotations?.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaRegCommentDots className="text-gray-600" />
                    <span className="font-medium">Annotations</span>
                  </div>
                  <ul className="space-y-1 list-disc list-inside">
                    {article.annotations.map((anno) => (
                      <li key={anno.id} className="text-gray-700">
                        {anno.text}{" "}
                        <span className="text-xs text-gray-500">
                          ({new Date(anno.createdAt).toLocaleDateString()})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
