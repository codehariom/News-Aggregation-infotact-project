import React, { useState, useEffect } from "react";
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaLink,
  FaFileAlt,
  FaUser,
  FaCalendar,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
  FaChartBar,
  FaLightbulb,
  FaShieldAlt,
  FaGavel
} from "react-icons/fa";

const FactCheckInterface = () => {
  const [factChecks, setFactChecks] = useState([]);
  const [newFactCheck, setNewFactCheck] = useState({
    title: "",
    content: "",
    source: "",
    evidence: "",
    category: "",
    priority: "medium",
    status: "pending"
  });
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid");

  // Mock data for demonstration
  const mockFactChecks = [
    {
      id: 1,
      title: "Climate Change Data Accuracy",
      content: "Recent claims about global temperature increases need verification against scientific data from NASA and NOAA.",
      source: "https://example.com/climate-article",
      evidence: "NASA climate data shows 1.1°C increase since 1880",
      category: "Science",
      priority: "high",
      status: "verified",
      date: "2024-12-19T10:30:00Z",
      submittedBy: "Dr. Sarah Chen",
      verifiedBy: "Climate Expert Team",
      verificationDate: "2024-12-19T14:20:00Z",
      confidence: 95,
      upvotes: 89,
      downvotes: 12,
      tags: ["climate", "science", "data", "verification"]
    },
    {
      id: 2,
      title: "Economic Growth Claims",
      content: "Government announcement claims 5.2% GDP growth, but independent economists suggest different numbers.",
      source: "https://example.com/economy-news",
      evidence: "IMF reports 3.8% growth, World Bank confirms 3.9%",
      category: "Economics",
      priority: "high",
      status: "false",
      date: "2024-12-18T15:45:00Z",
      submittedBy: "Prof. Michael Rodriguez",
      verifiedBy: "Economic Analysis Team",
      verificationDate: "2024-12-19T09:15:00Z",
      confidence: 87,
      upvotes: 67,
      downvotes: 23,
      tags: ["economics", "GDP", "government", "verification"]
    },
    {
      id: 3,
      title: "Vaccine Efficacy Statistics",
      content: "Social media posts claim 60% vaccine failure rate, contradicting official health data.",
      source: "https://example.com/health-claims",
      evidence: "CDC data shows 94% efficacy, peer-reviewed studies confirm",
      category: "Health",
      priority: "critical",
      status: "pending",
      date: "2024-12-19T08:20:00Z",
      submittedBy: "Dr. Emily Watson",
      verifiedBy: null,
      verificationDate: null,
      confidence: 0,
      upvotes: 34,
      downvotes: 8,
      tags: ["health", "vaccines", "misinformation", "CDC"]
    }
  ];

  useEffect(() => {
    setFactChecks(mockFactChecks);
  }, []);

  const handleNewFactCheck = (e) => {
    e.preventDefault();
    if (newFactCheck.title && newFactCheck.content) {
      const factCheck = {
        ...newFactCheck,
        id: Date.now(),
        date: new Date().toISOString(),
        status: "pending",
        submittedBy: "Current User",
        verifiedBy: null,
        verificationDate: null,
        confidence: 0,
        upvotes: 0,
        downvotes: 0,
        tags: []
      };
      setFactChecks((prev) => [factCheck, ...prev]);
      setNewFactCheck({ 
        title: "", 
        content: "", 
        source: "", 
        evidence: "", 
        category: "", 
        priority: "medium", 
        status: "pending" 
      });
      setIsFormExpanded(false);
    }
  };

  const updateFactCheckStatus = (id, status) => {
    setFactChecks((prev) =>
      prev.map((check) =>
        check.id === id ? { 
          ...check, 
          status,
          verifiedBy: status !== "pending" ? "Current User" : null,
          verificationDate: status !== "pending" ? new Date().toISOString() : null
        } : check
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200";
      case "false":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "investigating":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Science":
        return "🔬";
      case "Economics":
        return "💰";
      case "Health":
        return "🏥";
      case "Politics":
        return "🏛️";
      case "Technology":
        return "💻";
      default:
        return "📰";
    }
  };

  const filteredFactChecks = factChecks.filter((check) => {
    const matchesSearch = check.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || check.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || check.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedFactChecks = [...filteredFactChecks].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date) - new Date(a.date);
      case "priority":
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "confidence":
        return b.confidence - a.confidence;
      default:
        return 0;
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num;
  };

  const categories = ["Science", "Economics", "Health", "Politics", "Technology", "Other"];
  const priorities = ["low", "medium", "high", "critical"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl">🔍</div>
            <h1 className="text-4xl font-bold text-gray-900">Fact Checking Interface</h1>
            <div className="text-4xl">⚖️</div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verify claims, combat misinformation, and build a more informed community through collaborative fact-checking
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Checks", value: factChecks.length, icon: FaChartBar, color: "bg-blue-500" },
            { label: "Pending", value: factChecks.filter(c => c.status === "pending").length, icon: FaClock, color: "bg-yellow-500" },
            { label: "Verified", value: factChecks.filter(c => c.status === "verified").length, icon: FaCheckCircle, color: "bg-green-500" },
            { label: "False Claims", value: factChecks.filter(c => c.status === "false").length, icon: FaTimesCircle, color: "bg-red-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                  <stat.icon />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submission Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FaLightbulb className="text-yellow-500" />
              Submit New Fact Check
            </h2>
            <button
              type="button"
              onClick={() => setIsFormExpanded(!isFormExpanded)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isFormExpanded ? <FaTimes /> : <FaPlus />}
              {isFormExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {isFormExpanded && (
            <form onSubmit={handleNewFactCheck} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaFileAlt className="inline mr-2 text-blue-500" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={newFactCheck.title}
                    onChange={(e) => setNewFactCheck({...newFactCheck, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter fact check title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaShieldAlt className="inline mr-2 text-orange-500" />
                    Priority
                  </label>
                  <select
                    value={newFactCheck.priority}
                    onChange={(e) => setNewFactCheck({...newFactCheck, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaFileAlt className="inline mr-2 text-green-500" />
                  Content
                </label>
                <textarea
                  value={newFactCheck.content}
                  onChange={(e) => setNewFactCheck({...newFactCheck, content: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  rows="4"
                  placeholder="Describe the claim that needs fact-checking..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaLink className="inline mr-2 text-purple-500" />
                    Source
                  </label>
                  <input
                    type="url"
                    value={newFactCheck.source}
                    onChange={(e) => setNewFactCheck({...newFactCheck, source: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="https://example.com/article"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaGavel className="inline mr-2 text-indigo-500" />
                    Category
                  </label>
                  <select
                    value={newFactCheck.category}
                    onChange={(e) => setNewFactCheck({...newFactCheck, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCheckCircle className="inline mr-2 text-green-500" />
                  Evidence
                </label>
                <textarea
                  value={newFactCheck.evidence}
                  onChange={(e) => setNewFactCheck({...newFactCheck, evidence: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  rows="3"
                  placeholder="Provide any initial evidence or sources you have..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  Submit Fact Check
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewFactCheck({ 
                      title: "", 
                      content: "", 
                      source: "", 
                      evidence: "", 
                      category: "", 
                      priority: "medium", 
                      status: "pending" 
                    });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search fact checks by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="investigating">Investigating</option>
                  <option value="verified">Verified</option>
                  <option value="false">False</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="date">Sort by Date</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="confidence">Sort by Confidence</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Fact Checks List */}
        <div className="space-y-4">
          {sortedFactChecks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No fact checks found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all" 
                  ? 'Try adjusting your search or filters.' 
                  : 'Be the first to submit a fact check!'}
              </p>
              {!searchTerm && statusFilter === "all" && categoryFilter === "all" && (
                <button
                  onClick={() => setIsFormExpanded(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit First Fact Check
                </button>
              )}
            </div>
          ) : (
            sortedFactChecks.map((check) => (
              <div key={check.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg font-semibold">
                      {getCategoryIcon(check.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{check.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(check.status)}`}>
                          {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className={`w-3 h-3 ${getPriorityColor(check.priority)} rounded-full`}></div>
                          <span className="text-xs text-gray-600">{check.priority}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaUser />
                          {check.submittedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendar />
                          {formatDate(check.date)}
                        </span>
                        {/* Views removed */}
                      </div>
                    </div>
                  </div>
                  
                  {check.status === "verified" && (
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Verified by</div>
                      <div className="font-medium text-green-600">{check.verifiedBy}</div>
                      <div className="text-xs text-gray-400">{formatDate(check.verificationDate)}</div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed mb-3">{check.content}</p>
                  {check.evidence && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCheckCircle className="text-green-600" />
                        <span className="text-sm font-medium text-green-800">Evidence</span>
                      </div>
                      <p className="text-green-700 text-sm">{check.evidence}</p>
                    </div>
                  )}
                </div>

                {/* Source */}
                {check.source && (
                  <div className="mb-4">
                    <a
                      href={check.source}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLink />
                      {check.source}
                    </a>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {check.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <FaThumbsUp />
                      <span className="font-medium">{formatNumber(check.upvotes)}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <FaThumbsDown />
                      <span className="font-medium">{formatNumber(check.downvotes)}</span>
                    </button>
                    {/* Save/Share removed */}
                  </div>
                  
                  {check.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateFactCheckStatus(check.id, "verified")}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <FaCheckCircle />
                        Mark Verified
                      </button>
                      <button
                        onClick={() => updateFactCheckStatus(check.id, "false")}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <FaTimesCircle />
                        Mark False
                      </button>
                      <button
                        onClick={() => updateFactCheckStatus(check.id, "investigating")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <FaEye />
                        Investigate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FactCheckInterface;
