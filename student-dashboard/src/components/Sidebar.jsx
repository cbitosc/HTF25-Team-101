// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarStyle = {
    width: isOpen ? "200px" : "0",
    transition: "width 0.3s ease",
    overflowX: "hidden",
    background: "#282c34",
    color: "white",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
    paddingTop: "60px",
    zIndex: "10",
  };

  const linkStyle = {
    display: isOpen ? "block" : "none",
    padding: "12px 16px",
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
  };

  return (
    <div style={sidebarStyle}>
      <a href="/" style={linkStyle}>Dashboard</a>
      <a href="/assignments" style={linkStyle}>Assignments</a>
      <a href="/exams" style={linkStyle}>Exams</a>
      <a href="/grades" style={linkStyle}>Grades</a>
    </div>
  );
};

export default Sidebar;
