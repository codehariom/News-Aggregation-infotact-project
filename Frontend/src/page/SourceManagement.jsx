
import React, { useState, useEffect } from "react";
const SourceManagement = () => {
  const [sources, setSources] = useState([]);
  const [editingSource, setEditingSource] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Form state for adding/editing sources
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    category: "",
    reliabilityScore: 50,
    factCheckAccuracy: 50,
    biasRating: "Center",
    description: "",
    lastUpdated: new Date().toISOString().split('T')[0]
  });

  // Mock initial data
  const initialSources = [
    {
      id: 1,
      name: "BBC News",
      url: "https://www.bbc.com/news",
      category: "International",
      reliabilityScore: 95,
      factCheckAccuracy: 98,
      biasRating: "Center",
      lastUpdated: "2024-01-15",
      description: "British Broadcasting Corporation - International news service"
    },
    {
      id: 2,
      name: "Reuters",
      url: "https://www.reuters.com",
      category: "International",
      reliabilityScore: 94,
      factCheckAccuracy: 97,
      biasRating: "Center",
      lastUpdated: "2024-01-14",
      description: "International news agency providing business and political news"
    },
    {
      id: 3,
      name: "Associated Press",
      url: "https://apnews.com",
      category: "International",
      reliabilityScore: 93,
      factCheckAccuracy: 96,
      biasRating: "Center",
      lastUpdated: "2024-01-13",
      description: "American non-profit news agency"
    },
    {
      id: 4,
      name: "The New York Times",
      url: "https://www.nytimes.com",
      category: "National",
      reliabilityScore: 88,
      factCheckAccuracy: 92,
      biasRating: "Center-Left",
      lastUpdated: "2024-01-12",
      description: "American daily newspaper based in New York City"
    },
    {
      id: 5,
      name: "The Washington Post",
      url: "https://www.washingtonpost.com",
      category: "National",
      reliabilityScore: 87,
      factCheckAccuracy: 91,
      biasRating: "Center-Left",
      lastUpdated: "2024-01-11",
      description: "American daily newspaper published in Washington, D.C."
    }
  ];

  useEffect(() => {
    setSources(initialSources);
  }, []);

  const categories = ["International", "National", "Local", "Business", "Technology", "Science", "Politics", "Entertainment"];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSource) {
      // Update existing source
      setSources(prev => prev.map(source => 
        source.id === editingSource.id 
          ? { ...formData, id: editingSource.id }
          : source
      ));
      setEditingSource(null);
    } else {
      // Add new source
      const newSource = {
        ...formData,
        id: Date.now()
      };
      setSources(prev => [newSource, ...prev]);
    }
    
    // Reset form
    setFormData({
      name: "",
      url: "",
      category: "",
      reliabilityScore: 50,
      factCheckAccuracy: 50,
      biasRating: "Center",
      description: "",
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const handleEdit = (source) => {
    setEditingSource(source);
    setFormData({
      name: source.name,
      url: source.url,
      category: source.category,
      reliabilityScore: source.reliabilityScore,
      factCheckAccuracy: source.factCheckAccuracy,
      biasRating: source.biasRating,
      description: source.description,
      lastUpdated: source.lastUpdated
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this source?")) {
      setSources(prev => prev.filter(source => source.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingSource(null);
    setShowAddForm(false);
    setFormData({
      name: "",
      url: "",
      category: "",
      reliabilityScore: 50,
      factCheckAccuracy: 50,
      biasRating: "Center",
      description: "",
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };

  const getReliabilityColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };



  // Filter and sort sources
  const filteredSources = sources
    .filter(source => {
      const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           source.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || source.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "reliability":
          return b.reliabilityScore - a.reliabilityScore;
        case "category":
          return a.category.localeCompare(b.category);
        case "recent":
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Source Management</h1>
            <p className="text-gray-600">Manage news sources and their reliability scores</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Source
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingSource ? "Edit Source" : "Add New Source"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL *</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reliability Score: {formData.reliabilityScore}
                </label>
                <input
                  type="range"
                  name="reliabilityScore"
                  min="0"
                  max="100"
                  value={formData.reliabilityScore}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fact Check Accuracy: {formData.factCheckAccuracy}%
                </label>
                <input
                  type="range"
                  name="factCheckAccuracy"
                  min="0"
                  max="100"
                  value={formData.factCheckAccuracy}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  {editingSource ? "Update Source" : "Add Source"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Sources</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="reliability">Reliability Score</option>
              <option value="category">Category</option>
              <option value="recent">Recently Updated</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
                setSortBy("name");
              }}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800">Total Sources</h3>
            <p className="text-2xl font-bold text-blue-600">{filteredSources.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">High Reliability</h3>
            <p className="text-2xl font-bold text-green-600">
              {filteredSources.filter(s => s.reliabilityScore >= 80).length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800">Average Score</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredSources.length > 0 
                ? Math.round(filteredSources.reduce((acc, s) => acc + s.reliabilityScore, 0) / filteredSources.length)
                : 0
              }
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800">Categories</h3>
            <p className="text-2xl font-bold text-purple-600">
              {new Set(filteredSources.map(s => s.category)).size}
            </p>
          </div>
        </div>

        {/* Sources Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reliability</th>                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSources.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No sources found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredSources.map((source) => (
                  <tr key={source.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{source.name}</div>
                        <div className="text-sm text-gray-500">{source.url}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{source.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReliabilityColor(source.reliabilityScore)}`}>
                        {source.reliabilityScore}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(source.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(source)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(source.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SourceManagement;
