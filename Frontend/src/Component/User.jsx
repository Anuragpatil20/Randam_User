import React, { useState } from 'react';

export default function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('');

  const fetchUser = async () => {
    setLoading(true);
    const url = gender ? `https://randomuser.me/api/?gender=${gender}` : `https://randomuser.me/api/`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const fetchedUser = data.results[0];
      setUser(fetchedUser);

      await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchedUser),
      });

      console.log(data.results);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-blue-200 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🎲 Random User Generator</h2>

        <div className="flex items-center justify-between mb-6 gap-3">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button
            onClick={fetchUser}
            className="w-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
          >
            Generate
          </button>
        </div>

        {loading && (
          <div className="flex justify-center my-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500"></div>
          </div>
        )}

        {user && !loading && (
          <div className="text-center mt-6">
            <img
              src={user.picture.large}
              alt="User"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-400 shadow-md"
            />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {`${user.name.title} ${user.name.first} ${user.name.last}`}
            </h3>

            <div className="space-y-3 text-left px-4">
              <div className="flex items-center gap-3">
                <img className="h-6" src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="User Icon" />
                <span className="text-gray-800 font-medium">{`${user.name.first} ${user.name.last}`}</span>
              </div>

              <div className="flex items-center gap-3">
                <img className="h-6" src="https://cdn-icons-png.flaticon.com/128/542/542689.png" alt="Email Icon" />
                <span className="text-gray-600">{user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <img className="h-6" src="https://cdn-icons-png.flaticon.com/128/126/126341.png" alt="Phone Icon" />
                <span className="text-gray-600">{user.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <img className="h-6" src="https://cdn-icons-png.flaticon.com/128/1865/1865269.png" alt="Location Icon" />
                <span className="text-gray-500 italic">{`${user.location.city}, ${user.location.country}`}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
