import React, { useEffect } from 'react';
// import { useNavigate, a } from 'react-router-dom';

const ErrorPage = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       navigate('/');
//     }, 3000);
//     return () => clearTimeout(timerId);
//   }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-xl">
        <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-orange-500 mb-6">
          404
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved. Redirecting you to the home page...
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            to="/"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Go Home Now
          </a>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition font-semibold"
          >
            Go Back
          </button>
        </div>
        <div className="mt-6 text-sm text-gray-400">You will be redirected in 3 seconds.</div>
      </div>
    </div>
  );
};

export default ErrorPage;
