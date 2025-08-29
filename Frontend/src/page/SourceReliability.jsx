import React, { useState, useEffect } from "react";

const SourceReliability = () => {
  const [sources, setSources] = useState([]);
  const [filteredSources, setFilteredSources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reliabilityFilter, setReliabilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("reliability");

  // Mock data for news sources with reliability scores
  const mockSources = [
    {
      id: 1,
      name: "BBC News",
      url: "https://www.bbc.com/news",
      category: "International",
      reliabilityScore: 95,
      factCheckAccuracy: 98,
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
      lastUpdated: "2024-01-11",
      description: "American daily newspaper published in Washington, D.C."
    },
    {
      id: 6,
      name: "CNN",
      url: "https://www.cnn.com",
      category: "National",
      reliabilityScore: 82,
      factCheckAccuracy: 85,
      lastUpdated: "2024-01-10",
      description: "American multinational news-based pay television channel"
    },
    {
      id: 7,
      name: "Fox News",
      url: "https://www.foxnews.com",
      category: "National",
      reliabilityScore: 75,
      factCheckAccuracy: 78,
      lastUpdated: "2024-01-09",
      description: "American multinational conservative news channel"
    },
    {
      id: 8,
      name: "Al Jazeera",
      url: "https://www.aljazeera.com",
      category: "International",
      reliabilityScore: 85,
      factCheckAccuracy: 88,
      lastUpdated: "2024-01-08",
      description: "Qatar-based international news channel"
    },
    {
      id: 9,
      name: "The Guardian",
      url: "https://www.theguardian.com",
      category: "International",
      reliabilityScore: 86,
      factCheckAccuracy: 89,
      lastUpdated: "2024-01-07",
      description: "British daily newspaper"
    },
    {
      id: 10,
      name: "NPR",
      url: "https://www.npr.org",
      category: "National",
      reliabilityScore: 89,
      factCheckAccuracy: 93,
      lastUpdated: "2024-01-06",
      description: "American privately and publicly funded non-profit media organization"
    }
  ];

  useEffect(() => {
    setSources(mockSources);
    setFilteredSources(mockSources);
  }, []);

  useEffect(() => {
    let filtered = sources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(source =>
        source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by reliability score
    if (reliabilityFilter !== "all") {
      const scoreRanges = {
        "excellent": [90, 100],
        "good": [80, 89],
        "fair": [70, 79],
        "poor": [0, 69]
      };
      const [min, max] = scoreRanges[reliabilityFilter];
      filtered = filtered.filter(source => 
        source.reliabilityScore >= min && source.reliabilityScore <= max
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "reliability":
          return b.reliabilityScore - a.reliabilityScore;
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "recent":
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        default:
          return b.reliabilityScore - a.reliabilityScore;
      }
    });

    setFilteredSources(filtered);
  }, [sources, searchTerm, reliabilityFilter, sortBy]);

  const getReliabilityColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getReliabilityLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    return "Poor";
  };

  return (
    <>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Source Reliability</h1>
          <p className="text-gray-600 mb-8">Browse and evaluate news sources based on their reliability scores and fact-checking accuracy.</p>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Sources</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, description, or category..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reliability Filter</label>
              <select
                value={reliabilityFilter}
                onChange={(e) => setReliabilityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Reliability Levels</option>
                <option value="excellent">Excellent (90-100)</option>
                <option value="good">Good (80-89)</option>
                <option value="fair">Fair (70-79)</option>
                <option value="poor">Poor (0-69)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="reliability">Reliability Score</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="recent">Recently Updated</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setReliabilityFilter("all");
                  setSortBy("reliability");
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
              <h3 className="text-lg font-semibold text-green-800">Excellent Sources</h3>
              <p className="text-2xl font-bold text-green-600">
                {filteredSources.filter(s => s.reliabilityScore >= 90).length}
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

          {/* Sources List */}
          <div className="space-y-4">
            {filteredSources.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No sources found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setReliabilityFilter("all");
                  }}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredSources.map((source) => (
                <div key={source.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="Center items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">{source.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{source.description}</p>
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                          <span className={`px-3 py-1  rounded-full text-sm font-medium ${getReliabilityColor(source.reliabilityScore)}`}>
                            {source.reliabilityScore}/100 - {getReliabilityLabel(source.reliabilityScore)}
                          </span>
                          
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Category:</span>
                          <span className="text-sm text-gray-600 ml-2">{source.category}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Fact Check Accuracy:</span>
                          <span className="text-sm text-gray-600 ml-2">{source.factCheckAccuracy}%</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Last Updated:</span>
                          <span className="text-sm text-gray-600 ml-2">
                            {new Date(source.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:ml-6 flex flex-col space-y-2">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-center"
                      >
                        Visit Source
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SourceReliability; 