import React from 'react';

export default function Home() {
  return (
    <div className="text-center py-20 px-6 bg-gradient-to-r from-blue-400 to-indigo-600 text-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to My Task Tracker</h1>
      <p className="text-lg max-w-xl mx-auto mb-10">
        Stay organized, manage your daily tasks effortlessly, and boost your productivity with this beautiful and easy-to-use React app.
      </p>
      <a
        href="/tasks"
        className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded shadow hover:bg-gray-100 transition"
      >
        Get Started
      </a>
    </div>
  );
}
