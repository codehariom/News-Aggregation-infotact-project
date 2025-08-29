import React, { useState, useEffect } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaLink,
  FaSearch,
  FaSort,
  FaTag,
  FaUser,
  FaCalendar,
  FaGlobe,
  FaPlus,
  FaTimes
} from "react-icons/fa";

const AnnotationForm = () => {
  const [annotations, setAnnotations] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const dummyAnnotations = [
    {
      id: 1,
      username: "Sanjoli_Chauhan",
      url: "https://example.com/news-1",
      comment: "Boxing coming up.",
      tags: ["boxing", "france", "world", "league", "premier", "women", "iranian"],
      date: "2023-08-17T10:58:25.046Z",
      likes: 12,
      dislikes: 2,
    },
    {
      id: 2,
      username: "Sanjoli_Chauhan",
      url: "https://example.com/news-2",
      comment: "Climate crisis intensifies with new research showing unprecedented temperature rises across multiple regions.",
      tags: ["climate", "crisis", "global", "warming", "research"],
      date: "2024-01-10T09:40:00.000Z",
      likes: 45,
      dislikes: 5,
    },
    {
      id: 3,
      username: "Sanjoli_Chauhan",
      url: "https://example.com/news-3",
      comment: "Economic policies are shifting towards sustainable development with focus on green technology investments.",
      tags: ["economy", "policies", "government", "sustainable", "green-tech"],
      date: "2025-08-01T14:15:00.000Z",
      likes: 28,
      dislikes: 3,
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
    setSelectedTags([]);
    setIsFormExpanded(false);
  };

  const handleReaction = (id, type) => {
    setAnnotations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [type]: item[type] + 1 } : item
      )
    );
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
  };

  const filteredAnnotations = annotations.filter((anno) => {
    const content = `${anno.comment} ${anno.tags.join(" ")}`.toLowerCase();
    return content.includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays < 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Article Annotations</h1>
          <p className="text-gray-600">Share your insights and fact-check articles with the community</p>
        </div>

        {/* Submission Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Add New Annotation</h2>
            <button
              type="button"
              onClick={() => setIsFormExpanded(!isFormExpanded)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isFormExpanded ? <FaTimes /> : <FaPlus />}
              {isFormExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {isFormExpanded && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaLink className="inline mr-2 text-blue-500" />
                  Article URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaComment className="inline mr-2 text-green-500" />
                  Your Annotation
                </label>
                <textarea
                  placeholder="Share your fact-check, insights, or observations about this article..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {comment.length}/500 characters
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  Submit Annotation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUrl("");
                    setComment("");
                    setSelectedTags([]);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Search and Sort Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search annotations by content, tags, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <FaSort className="text-gray-400" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Annotations List */}
        <div className="space-y-4">
          {filteredAnnotations.map((anno) => (
            <div key={anno.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {anno.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900">{anno.username}</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Verified User
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaCalendar />
                      {formatDate(anno.date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* URL */}
              <div className="mb-4">
                <a
                  href={anno.url}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGlobe />
                  {anno.url}
                </a>
              </div>

              {/* Comment */}
              <div className="mb-4">
                <p className="text-gray-800 leading-relaxed">{anno.comment}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {anno.tags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTagClick(tag)}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <FaTag className="text-xs" />
                    {tag}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleReaction(anno.id, "likes")}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FaThumbsUp className={anno.likes > 0 ? 'text-blue-500' : ''} />
                    <span className="font-medium">{formatNumber(anno.likes)}</span>
                  </button>

                  <button
                    onClick={() => handleReaction(anno.id, "dislikes")}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaThumbsDown className={anno.dislikes > 0 ? 'text-red-500' : ''} />
                    <span className="font-medium">{formatNumber(anno.dislikes)}</span>
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnnotations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No annotations found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? `No results for "${searchTerm}". Try different keywords.` : 'Be the first to add an annotation!'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsFormExpanded(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add First Annotation
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnotationForm;
