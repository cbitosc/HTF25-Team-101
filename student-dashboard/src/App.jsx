// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Exams from "./pages/Exams";
import Grades from "./pages/Grades";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        style={{
          marginLeft: isSidebarOpen ? "200px" : "0",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/grades" element={<Grades />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
