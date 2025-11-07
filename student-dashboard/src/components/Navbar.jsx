// src/components/Navbar.jsx
import React, { useState } from "react";
import ProfileModal from "./ProfileModal";

const Navbar = ({ toggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div
        style={{
          background: "#4A90E2",
          color: "white",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            onClick={toggleSidebar}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              marginRight: "16px",
              fontWeight: "bold",
            }}
          >
            ☰
          </span>
          <h2 style={{ margin: 0 }}>Student Dashboard</h2>
        </div>

        <div>
          <span
            onClick={() => setShowProfile(true)}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              background: "white",
              color: "#4A90E2",
              borderRadius: "50%",
              padding: "6px 10px",
              fontWeight: "bold",
            }}
          >
            👤
          </span>
        </div>
      </div>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default Navbar;
