
import React from 'react';
import Navbar from '../components/Navbar';
// import  a  from 'react-router-dom'; // Named import for a

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Welcome to News Aggregator
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 tracking-wider max-w-2xl mx-auto">
            Join our community-driven platform to combat misinformation through collaborative fact-checking, transparent source scoring, and real-time news updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              to="/news"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition cursor-pointer  duration-300"
            >
              Explore News Feed
            </a>
            <a
              to="/register"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold py-3 px-8 cursor-pointer rounded-full transition duration-300"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Community Fact-Checking</h3>
              <p className="text-gray-300">
                Collaborate with users to verify claims, submit evidence, and ensure news accuracy through transparent annotations.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Source Reliability</h3>
              <p className="text-gray-300">
                Access real-time reliability scores for news sources based on community-driven fact-checking outcomes.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Real-Time Updates</h3>
              <p className="text-gray-300">
                Stay informed with instant notifications for new articles and fact-check updates tailored to your interests.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Be Part of the Truth
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Sign up to contribute to a trustworthy news ecosystem. Submit articles, fact-check claims, and earn reputation points.
          </p>
          <a
            to="/register"
            className="bg-white text-blue-600 hover:bg-gray-200 font-semibold py-3 px-8 rounded-full transition cursor-pointer duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;