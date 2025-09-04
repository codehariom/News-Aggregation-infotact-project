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
      const res = await axios.get("http://localhost:8000/api/my-contributions");

      console.log("RAW API Response:", res.data, typeof res.data);

      let data = res.data;

      // Agar string hai to JSON parse karo
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.error("Invalid JSON string:", data);
          data = [];
        }
      }

      if (Array.isArray(data)) {
        setArticles(data);
      } else if (data && typeof data === "object") {
        setArticles([data]);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load contributions");
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);


  // Loading/Error UI
  if (loading) return <div className="p-6">Loading your contributions...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  console.log("Articles State:", articles);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">My Contributions</h2>

      {/* Agar kuch bhi articles nahi mile */}
      {(!Array.isArray(articles) || articles.length === 0) && (
        <div>You haven’t submitted any articles yet.</div>
      )}

      <div className="space-y-6">
        {Array.isArray(articles) &&
          articles.length > 0 &&
          articles.map((article) => (
            <div key={article.id || article._id} className="border-b pb-4">
              <h3 className="text-xl font-bold">{article.title || "Untitled"}</h3>
              <p className="text-gray-700 mb-2">
                {article.summary || "No summary available"}
              </p>
              <div className="text-sm text-gray-500 mb-3">
                Submitted on{" "}
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>

              {/* Annotations */}
              {Array.isArray(article.annotations) &&
                article.annotations.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaRegCommentDots className="text-gray-600" />
                      <span className="font-medium">Annotations</span>
                    </div>
                    <ul className="space-y-1 list-disc list-inside">
                      {article.annotations.map((anno) => (
                        <li key={anno.id || anno._id} className="text-gray-700">
                          {anno.text || "No annotation"}{" "}
                          <span className="text-xs text-gray-500">
                            (
                            {anno.createdAt
                              ? new Date(anno.createdAt).toLocaleDateString()
                              : "N/A"}
                            )
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          ))}
      </div>
    </div>
  );
}
