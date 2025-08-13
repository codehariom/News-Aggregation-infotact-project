
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({ articles: 0, users: 0, factChecks: 0, sources: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      text: "This platform has completely changed how I consume news. The fact-checking community is incredible!",
      author: "Sarah Chen",
      role: "Journalism Student",
      avatar: "👩‍🎓"
    },
    {
      text: "Finally, a place where I can trust the news I read. The source reliability scores are a game-changer.",
      author: "Marcus Rodriguez",
      role: "Tech Professional",
      avatar: "👨‍💻"
    },
    {
      text: "Being part of the fact-checking community has made me more critical and informed about current events.",
      author: "Emma Thompson",
      role: "Educator",
      avatar: "👩‍🏫"
    }
  ];

  const categories = [
    { name: "Technology", icon: "🚀", color: "from-blue-500 to-purple-600" },
    { name: "Politics", icon: "🏛️", color: "from-red-500 to-orange-500" },
    { name: "Science", icon: "🔬", color: "from-green-500 to-teal-600" },
    { name: "Health", icon: "🏥", color: "from-pink-500 to-rose-600" },
    { name: "Environment", icon: "🌍", color: "from-emerald-500 to-green-600" },
    { name: "Business", icon: "💼", color: "from-yellow-500 to-orange-600" }
  ];

  const trendingTopics = [
    "AI Regulation Debate",
    "Climate Change Summit",
    "Space Exploration",
    "Digital Privacy Laws",
    "Renewable Energy",
    "Global Health Initiatives"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats
    const timer = setTimeout(() => {
      setStats({ articles: 15420, users: 8920, factChecks: 23450, sources: 1560 });
    }, 500);

    // Rotate testimonials
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(testimonialTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Truth Seeker
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 tracking-wider max-w-4xl mx-auto leading-relaxed">
              Discover the <span className="text-blue-400 font-semibold">truth</span> in a world of information. 
              Join our <span className="text-purple-400 font-semibold">community-driven</span> platform for 
              <span className="text-green-400 font-semibold"> fact-checking</span> and reliable news.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <span className="relative z-10">🚀 Launch Explorer</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 hover:border-white/60 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                🎯 Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* News Categories Grid */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`p-8 rounded-2xl bg-gradient-to-br ${category.color} transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}>
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  <p className="text-white/80 mt-2">Discover the latest in {category.name.toLowerCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Spotlight */}
      <div className="py-20 bg-gradient-to-b from-gray-800/50 to-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Community Spotlight
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <blockquote className="text-2xl text-gray-200 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="text-lg font-semibold text-white">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-gray-400">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Call to Action with 3D Effect */}
      <div className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Join the Truth Revolution?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Be part of a community that values accuracy, transparency, and truth. 
            Start fact-checking, submit articles, and help build a more informed world.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <span className="relative z-10">🚀 Get Started Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="px-10 py-5 border-2 border-white/30 hover:border-white/60 rounded-full font-bold text-xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
              📚 Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-2 border-t border-white/10">
        <div className="container mx-auto px-2 text-center">
          <p className="text-gray-400">
            © 2025 all rights reserved by the team.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;