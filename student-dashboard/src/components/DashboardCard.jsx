import React from "react";

const DashboardCard = ({ title, value }) => {
  return (
    <div style={{ background: "#fff", padding: "20px", margin: "10px", borderRadius: "8px", boxShadow: "0 0 5px #ccc" }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
};

export default DashboardCard;
