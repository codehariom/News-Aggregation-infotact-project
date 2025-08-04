<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/babel-standalone@7/babel.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="overflow-x-hidden">
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useRef } = React;

    function Dashboard() {
      const [theme, setTheme] = useState("light");
      const [isSettingsOpen, setIsSettingsOpen] = useState(false);
      const contentRef = useRef(null);
      const sourceRef = useRef(null);
      const userGrowthRef = useRef(null);

      const metrics = {
        totalUsers: 1250,
        totalArticles: 320,
        totalAnnotations: 450,
        totalSourcePendingDebunk: 15,
        contentModeration: { pending: 25, approved: 280, rejected: 15 },
        sourceManagement: { active: 50, inactive: 10 },
      };

      const notifications = [
        { id: 1, message: "New user registered: John Doe", time: "2 mins ago" },
        { id: 2, message: "Article pending review: AI Trends 2025", time: "10 mins ago" },
        { id: 3, message: "Source debunk pending: Fake News Alert", time: "1 hour ago" },
      ];

      useEffect(() => {
        if (contentRef.current) {
          new Chart(contentRef.current, {
            type: 'pie',
            data: {
              labels: ['Pending', 'Approved', 'Rejected'],
              datasets: [{
                data: [
                  metrics.contentModeration.pending,
                  metrics.contentModeration.approved,
                  metrics.contentModeration.rejected,
                ],
                backgroundColor: ['#FFBB38', '#4CAF50', '#F44336'],
              }],
            },
            options: { responsive: true },
          });
        }

        if (sourceRef.current) {
          new Chart(sourceRef.current, {
            type: 'bar',
            data: {
              labels: ['Active', 'Inactive'],
              datasets: [{
                label: 'Sources',
                data: [
                  metrics.sourceManagement.active,
                  metrics.sourceManagement.inactive,
                ],
                backgroundColor: ['#2196F3', '#9E9E9E'],
              }],
            },
            options: { responsive: true },
          });
        }

        if (userGrowthRef.current) {
          new Chart(userGrowthRef.current, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'User Growth',
                data: [200, 300, 450, 600, 900, 1250],
                borderColor: '#4CAF50',
                fill: false,
              }],
            },
            options: { responsive: true },
          });
        }
      }, []);

      const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
      };

      return (
        <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'} p-6`}>
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button onClick={() => setIsSettingsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
                Settings
              </button>
              <button onClick={() => alert("Logged out")} className="px-4 py-2 bg-red-600 text-white rounded">
                Logout
              </button>
            </div>
          </header>

          {isSettingsOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg w-96`}>
                <h2 className="text-xl font-bold mb-4">Settings</h2>
                <label className="block mb-2">Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full p-2 mb-4 border rounded">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
                <input type="text" placeholder="Update Username" className="w-full p-2 mb-4 border rounded" />
                <input type="password" placeholder="New Password" className="w-full p-2 mb-4 border rounded" />
                <button onClick={() => setIsSettingsOpen(false)} className="w-full bg-green-600 text-white py-2 rounded">
                  Save & Close
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { label: "Total Users", value: metrics.totalUsers },
              { label: "Total Articles", value: metrics.totalArticles },
              { label: "Total Annotations", value: metrics.totalAnnotations },
              { label: "Pending Debunk", value: metrics.totalSourcePendingDebunk },
            ].map(({ label, value }) => (
              <div key={label} className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow`}>
                <h3 className="text-lg font-semibold">{label}</h3>
                <p className="text-3xl font-bold">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow`}>
              <h3 className="text-lg font-semibold mb-4">Content Moderation Status</h3>
              <canvas ref={contentRef} height="200"></canvas>
            </div>
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow`}>
              <h3 className="text-lg font-semibold mb-4">Source Management</h3>
              <canvas ref={sourceRef} height="200"></canvas>
            </div>
          </div>

          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow mb-6`}>
            <h3 className="text-lg font-semibold mb-4">User Growth Trend</h3>
            <canvas ref={userGrowthRef} height="200"></canvas>
          </div>

          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-6 rounded-lg shadow`}>
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <ul className="space-y-2">
              {notifications.map((n) => (
                <li key={n.id}><strong>{n.message}</strong> - {n.time}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Dashboard />);
  </script>
</body>
</html>
