import React from "react";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
    
      <div className="flex items-center gap-6">
        <span className="text-xl font-bold">NewsLetter</span>
        <a href="#" className="hover:text-gray-300">People</a>
        <a href="#" className="hover:text-gray-300">Feed</a>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-1 rounded bg-white text-black border border-gray-300 focus:outline-none"
        />
      </div>

    
      <div className="flex items-center gap-3">
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
          Notification 
        </button>
        <button className="bg-black text-white px-3 py-1 rounded border border-white text-sm">
          Profile
        </button>
        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;

