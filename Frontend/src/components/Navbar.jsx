import React, { useState, useEffect } from 'react';
// import { a, } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
//   const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a to="/" className="text-2xl font-bold tracking-tight">
          News Aggregator
        </a>
        <div className="flex space-x-4 items-center">
          {user ? (
            <>
              <a to="/categories" className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                Categories
              </a>
              <a to="/fact-check" className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                Dashboard
              </a>
              <a to="/source-reliability" className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                Source Reliability
              </a>
              <a to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                User Account
              </a>
              <a to="/submit" className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                Submit Article
              </a>
              {user.role === 'admin' && (
                <a
                  to="/admin/dashboard"
                  className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300"
                >
                  Admin Dashboard
                </a>
              )}
              <button
                onClick={handleLogout}
                className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a to="/news" className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                News Feed
              </a>
              <a to="/login" className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                Login
              </a>
              <a to="/register" className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;