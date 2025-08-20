import React, { useState, useEffect } from 'react';
// import { a } from 'react-router-dom';
import axios from 'axios';
import { 
  FaNewspaper, 
  FaUser, 
  FaCog, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes, 
  FaPlus,
  FaEye,
  FaCrown,
  FaBell
} from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem('token');
        });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsUserMenuOpen(false);
  };


  const navigationItems = [
    { name: 'News Feed', href: '/news', icon: FaNewspaper },
    { name: 'Submit Article', href: '/submit', icon: FaPlus },
  ];

  const adminItems = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: FaCrown },
    { name: 'Source Management', href: '/source-management', icon: FaCog },
    { name: 'Content Moderation', href: '/content-moderation', icon: FaEye },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Truth Seeker
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                to={item.href}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                <item.icon className="text-lg" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  <FaBell className="text-lg" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* Bookmarks removed */}

                {/* User Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.username?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:block font-medium">{user.username || 'User'}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.username || 'User'}</p>
                        <p className="text-sm text-gray-500">{user.email || 'user@example.com'}</p>
                        {user.role && (
                          <span className="inline-flex items-center px-2 py-1 mt-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {user.role === 'admin' ? 'Administrator' : 'User'}
                          </span>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <a
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaUser className="text-gray-400" />
                          <span>Profile</span>
                        </a>
                        
                        <a
                          to="/settings"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaCog className="text-gray-400" />
                          <span>Settings</span>
                        </a>

                        {user.role === 'admin' && (
                          <div className="border-t border-gray-100 pt-1">
                            <p className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Admin Tools
                            </p>
                            {adminItems.map((item) => (
                              <a
                                key={item.name}
                                to={item.href}
                                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <item.icon className="text-gray-400" />
                                <span>{item.name}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FaSignOutAlt />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a
                  to="/login"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </a>
                <a
                  to="/register"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Get Started
                </a>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Navigation */}
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="text-gray-400" />
                  <span>{item.name}</span>
                </a>
              ))}

              {/* Admin Items for Mobile */}
              {user?.role === 'admin' && (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin Tools
                  </div>
                  {adminItems.map((item) => (
                    <a
                      key={item.name}
                      to={item.href}
                      className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="text-gray-400" />
                      <span>{item.name}</span>
                    </a>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;