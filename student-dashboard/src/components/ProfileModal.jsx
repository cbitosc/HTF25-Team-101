// src/components/ProfileModal.jsx
import React, { useState, useEffect } from "react";

const ProfileModal = ({ onClose }) => {
  const [profile, setProfile] = useState({
    name: "",
    rollNo: "",
    mobile: "",
  });

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved successfully!");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Student Profile
        </h3>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter your name"
          style={inputStyle}
        />

        <label>Roll No:</label>
        <input
          type="text"
          name="rollNo"
          value={profile.rollNo}
          onChange={handleChange}
          placeholder="Enter your roll number"
          style={inputStyle}
        />

        <label>Mobile No:</label>
        <input
          type="text"
          name="mobile"
          value={profile.mobile}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handleSave}
            style={{
              background: "#4A90E2",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            style={{
              background: "gray",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  outline: "none",
};

export default ProfileModal;
