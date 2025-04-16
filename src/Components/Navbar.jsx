import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaTachometerAlt, FaGamepad, FaBlog, FaTrafficLight, FaArrowRight } from 'react-icons/fa';
import HomePage from '../Pages/HomePage';
import DashBoard from '../Pages/DashBoard'
import Game from '../Pages/Game'
import Blog from '../Pages/Blog'
import TrafficMonitoringSystem from '../Pages/TrafficMonitoringSystem'

function Navbar() {
  return (
      <div className="flex min-h-screen bg-white text-gray-800">
        {/* Sidebar */}
        <aside className="w-64 bg-[rgb(168,213,226)] p-6 hidden md:block rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6"><a href='/HomePage'>MyRoute</a></h2>
          <nav className="space-y-8">
            <Link
              to="/dashboard"
              className="block flex justify-between items-center space-x-2 hover:text-white transition duration-300"
            >
              <div className="flex items-center space-x-2">
                <FaTachometerAlt size={20} />
                <span>Dashboard</span>
              </div>
              <FaArrowRight size={16} />
            </Link>
            <Link
              to="/game"
              className="block flex justify-between items-center space-x-2 hover:text-white transition duration-300"
            >
              <div className="flex items-center space-x-2">
                <FaGamepad size={20} />
                <span>Game</span>
              </div>
              <FaArrowRight size={16} />
            </Link>
            <Link
              to="/blog"
              className="block flex justify-between items-center space-x-2 hover:text-white transition duration-300"
            >
              <div className="flex items-center space-x-2">
                <FaBlog size={20} />
                <span>Blog</span>
              </div>
              <FaArrowRight size={16} />
            </Link>
            <Link
              to="/traffic-monitoring"
              className="block flex justify-between items-center space-x-2 hover:text-white transition duration-300"
            >
              <div className="flex items-center space-x-2">
                <FaTrafficLight size={20} />
                <span>Traffic Monitoring</span>
              </div>
              <FaArrowRight size={16} />
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="bg-[rgb(168,213,226)] p-4 shadow-md md:hidden rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">MyRoute ✨</h1>
              <nav className="space-x-4">
                <Link
                  to="/Dashboard"
                  className="hover:text-blue-500 transition duration-300 flex items-center space-x-2"
                >
                  <FaTachometerAlt size={20} /> <span>Dashboard</span>
                </Link>
                <Link
                  to="/Game"
                  className="hover:text-blue-500 transition duration-300 flex items-center space-x-2"
                >
                  <FaGamepad size={20} /> <span>Game</span>
                </Link>
                <Link
                  to="/Blog"
                  className="hover:text-blue-500 transition duration-300 flex items-center space-x-2"
                >
                  <FaBlog size={20} /> <span>Blog</span>
                </Link>
                <Link
                  to="/TrafficMonitoringSystem"
                  className="hover:text-blue-500 transition duration-300 flex items-center space-x-2"
                >
                  <FaTrafficLight size={20} /> <span>Traffic Monitoring</span>
                </Link>
              </nav>
            </div>
          </header>

          {/* Page Routing with Routes */}
          <Routes>
            <Route path="/HomePage" element={<HomePage />} />   
            <Route path="/DashBoard" element={<DashBoard />} />
            <Route path="/Game" element={<Game />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/TrafficMonitoringSystem" element={<TrafficMonitoringSystem />} />
          </Routes>
        </main>
      </div>
  );
}

export default Navbar;
