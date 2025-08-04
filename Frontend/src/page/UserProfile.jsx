import React from "react";

const UserDashboard = () => {
  // Sample user data (you can replace this with actual data from backend/API)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
    password: "********",
    reputationScore: 85,
    contributionHistory: [
      { id: 1, date: "2025-08-01", title: "Article on AI Trends", status: "Approved" },
      { id: 2, date: "2025-08-03", title: "Blockchain Basics", status: "Pending" },
      { id: 3, date: "2025-08-04", title: "React Hooks Guide", status: "Rejected" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Dashboard</h1>

        {/* User Profile Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
            <p><span className="font-semibold">Password:</span> {user.password}</p>
            <p><span className="font-semibold">Reputation Score:</span> {user.reputationScore}</p>
          </div>
        </div>

        {/* Contribution History Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contribution History</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 text-left">#</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-left">Title</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.contributionHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{item.id}</td>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td
                      className={`border px-4 py-2 font-semibold ${
                        item.status === "Approved"
                          ? "text-green-600"
                          : item.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
