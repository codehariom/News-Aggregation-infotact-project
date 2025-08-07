import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaEye } from "react-icons/fa";

const AnnotationForm = () => {
  const [annotations, setAnnotations] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dummyAnnotations = [
  {
    id: 1,
    username: "Sanjoli_Chauhan",
    url: "https://example.com/news-1",
    comment: "Boxing coming up.",
    tags: ["boxing", "france", "world", "league", "premier", "women", "iranian"],
    date: "2023-08-17T10:58:25.046Z",
    likes: 0,
    dislikes: 0,
    views: 1,
    comments: 0,
  },
  {
    id: 2,
    username: "Sanjoli_Chauhan",
    url: "https://example.com/news-2",
    comment: "Climate crisis intensifies.",
    tags: ["climate", "crisis", "global", "warming"],
    date: "2024-01-10T09:40:00.000Z",
    likes: 0,
    dislikes: 0,
    views: 2,
    comments: 1,
  },
  {
    id: 3,
    username: "Sanjoli_Chauhan",
    url: "https://example.com/news-3",
    comment: "Economic policies are shifting.",
    tags: ["economy", "policies", "government"],
    date: "2025-08-01T14:15:00.000Z",
    likes: 0,
    dislikes: 0,
    views: 3,
    comments: 2,
  },
];



  const extractTags = (text) => {
    const stopWords = new Set([
      "the", "is", "in", "at", "of", "on", "a", "and", "to", "for", "with", "as", "by", "an", "be", "are", "this", "that", "from", "was", "were", "have", "has"
    ]);
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.has(word));

    const uniqueWords = [...new Set(words)];
    return uniqueWords.slice(0, Math.min(7, Math.max(3, uniqueWords.length)));
  };

  useEffect(() => {
    const sorted = [...dummyAnnotations].sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );
    setAnnotations(sorted);
  }, [sortOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnnotation = {
      id: Date.now(),
      username: "CurrentUser",
      url,
      comment,
      tags: extractTags(comment),
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      views: 0,
      comments: 0,
    };
    setAnnotations((prev) =>
      [newAnnotation, ...prev].sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      )
    );
    setUrl("");
    setComment("");
  };

  const handleReaction = (id, type) => {
    setAnnotations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [type]: item[type] + 1 } : item
      )
    );
  };

  const filteredAnnotations = annotations.filter((anno) => {
    const content = `${anno.comment} ${anno.tags.join(" ")}`.toLowerCase();
    return content.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Enter Article URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Your comment or observation"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

  
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by tag or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-3 py-2 rounded text-sm"
        />
      </div>

      <div className="flex justify-end mb-4">
        <label className="mr-2 text-sm font-medium">Sort:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="space-y-6">
        {filteredAnnotations.map((anno) => (
          <div key={anno.id} className="bg-white shadow p-4 rounded-md border">
            <div className="flex items-center gap-4 mb-2">
              <img
                src="https://www.gravatar.com/avatar?d=mp"
                alt="avatar"
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <div className="font-semibold">{anno.username}</div>
                <div className="text-xs text-gray-500">
                  {new Date(anno.date).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mb-2">
              <a
                href={anno.url}
                className="text-blue-600 underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {anno.url}
              </a>
            </div>
            <p className="mb-2">{anno.comment}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {anno.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-white text-xs px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-700">
              <button
                onClick={() => handleReaction(anno.id, "likes")}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <FaThumbsUp /> {anno.likes}
              </button>
              <button
                onClick={() => handleReaction(anno.id, "dislikes")}
                className="flex items-center gap-1 hover:text-red-600"
              >
                <FaThumbsDown /> {anno.dislikes}
              </button>
              <div className="flex items-center gap-1 text-blue-600">
                <FaEye /> {anno.views}
              </div>
              <button className="text-white bg-cyan-600 hover:bg-cyan-700 px-2 py-1 rounded text-xs">
                Make a Comment ({anno.comments})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnotationForm;
