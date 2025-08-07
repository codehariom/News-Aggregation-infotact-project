import React, { useState } from "react";

const FactCheckInterface = () => {
  const [factChecks, setFactChecks] = useState([]);
  const [newFactCheck, setNewFactCheck] = useState({
    title: "",
    content: "",
    source: "",
    status: "pending"
  });

  const handleNewFactCheck = (e) => {
    e.preventDefault();
    if (newFactCheck.title && newFactCheck.content) {
      const factCheck = {
        ...newFactCheck,
        id: Date.now(),
        date: new Date().toISOString(),
        status: "pending"
      };
      setFactChecks((prev) => [factCheck, ...prev]);
      setNewFactCheck({ title: "", content: "", source: "", status: "pending" });
    }
  };

  const updateFactCheckStatus = (id, status) => {
    setFactChecks((prev) =>
      prev.map((check) =>
        check.id === id ? { ...check, status } : check
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "false":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Fact Checking Interface</h1>
          
          {/* Fact Check Form */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Submit New Fact Check</h2>
            <form onSubmit={handleNewFactCheck} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newFactCheck.title}
                  onChange={(e) => setNewFactCheck({...newFactCheck, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter fact check title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={newFactCheck.content}
                  onChange={(e) => setNewFactCheck({...newFactCheck, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter fact check content"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source
                </label>
                <input
                  type="text"
                  value={newFactCheck.source}
                  onChange={(e) => setNewFactCheck({...newFactCheck, source: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter source URL"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Submit Fact Check
              </button>
            </form>
          </div>

          {/* Fact Checks List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Fact Checks</h2>
            {factChecks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No fact checks submitted yet.</p>
            ) : (
              factChecks.map((check) => (
                <div key={check.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{check.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                      {check.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{check.content}</p>
                  {check.source && (
                    <p className="text-sm text-gray-500 mb-3">
                      Source: <a href={check.source} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{check.source}</a>
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(check.date).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateFactCheckStatus(check.id, "verified")}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Mark Verified
                      </button>
                      <button
                        onClick={() => updateFactCheckStatus(check.id, "false")}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Mark False
                      </button>
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

export default FactCheckInterface;
