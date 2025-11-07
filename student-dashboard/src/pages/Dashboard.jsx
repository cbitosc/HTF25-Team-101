import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import ChartCard from "../components/ChartCard";

const Dashboard = () => {
  const [grades, setGrades] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const loadData = () => {
    setGrades(JSON.parse(localStorage.getItem("grades")) || []);
    setAssignments(JSON.parse(localStorage.getItem("assignments")) || []);
    setExams(JSON.parse(localStorage.getItem("exams")) || []);
  };

  useEffect(() => {
    loadData();
    const handleStorageChange = (e) => {
      if (["grades", "assignments", "exams"].includes(e.key)) loadData();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const averageGrade =
    grades.length > 0
      ? (grades.reduce((sum, g) => sum + g.score, 0) / grades.length).toFixed(2)
      : 0;

  const pendingAssignments = assignments.filter((a) => !a.submitted);
  const examsPending = exams.filter((e) => !e.completed);

  const upcomingExams = examsPending
    .filter((e) => e.date)
    .map((e) => ({ ...e, examDate: new Date(e.date) }))
    .sort((a, b) => a.examDate - b.examDate);

  const notificationCount = pendingAssignments.length + upcomingExams.length;

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear ALL data?")) {
      localStorage.removeItem("grades");
      localStorage.removeItem("assignments");
      localStorage.removeItem("exams");
      setGrades([]);
      setAssignments([]);
      setExams([]);
      alert("All data has been cleared!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "15px",
        }}
      >
        <DashboardCard title="Average Grade" value={averageGrade} />
        <DashboardCard title="Assignments Pending" value={pendingAssignments.length} />
        <DashboardCard title="Exams Pending" value={examsPending.length} />
        <DashboardCard title="Exams Completed" value={grades.length} />
        <button
          onClick={clearAllData}
          style={{
            background: "#d9534f",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Clear All Data
        </button>
      </div>

      {/* Notifications Button with Badge */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "15px",
          position: "relative",
        }}
      >
        Show Notifications
        {notificationCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "4px 7px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {notificationCount}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {showNotifications && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            background: "#f9f9f9",
            marginBottom: "15px",
          }}
        >
          <h4>Notifications</h4>
          <ul>
            {pendingAssignments.length > 0 && (
              <>
                <li>
                  <strong>Pending Assignments:</strong>
                </li>
                {pendingAssignments.map((a, i) => (
                  <li key={i}>{a.title}</li>
                ))}
              </>
            )}

            {upcomingExams.length > 0 && (
              <>
                <li style={{ marginTop: "5px" }}>
                  <strong>Upcoming Exams:</strong>
                </li>
                {upcomingExams.map((e, i) => (
                  <li key={i}>
                    {e.subject} - {e.examType} on {e.examDate.toLocaleDateString()}
                  </li>
                ))}
              </>
            )}

            {pendingAssignments.length === 0 && upcomingExams.length === 0 && (
              <li>No notifications</li>
            )}
          </ul>
        </div>
      )}

      {/* Grades Chart */}
      {grades.length > 0 ? (
        <ChartCard
          title="Grades Trend"
          labels={grades.map((g) => g.subject)}
          data={grades.map((g) => g.score)}
        />
      ) : (
        <p>No exam results available yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
