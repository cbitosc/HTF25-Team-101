import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import ChartCard from "../components/ChartCard";

const Grades = () => {
  const [grades, setGrades] = useState([]);

  // Function to compute grades from exams
  const computeGrades = () => {
    const exams = JSON.parse(localStorage.getItem("exams")) || [];
    const completedExams = exams.filter(e => e.completed && e.result !== "");
    const currentGrades = completedExams.map(e => ({
      subject: `${e.subject} - ${e.examType}`,
      score: Number(e.result),
    }));
    setGrades(currentGrades);
    localStorage.setItem("grades", JSON.stringify(currentGrades));
  };

  useEffect(() => {
    // Initial load
    computeGrades();

    // Listen for changes in localStorage exams (optional)
    const handleStorageChange = (e) => {
      if (e.key === "exams") computeGrades();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Average grade safely
  const averageGrade = grades.length
    ? (grades.reduce((sum, g) => sum + g.score, 0) / grades.length).toFixed(2)
    : 0;

  // Manual clear grades function
  const clearGrades = () => {
    if (window.confirm("Are you sure you want to delete all grades?")) {
      setGrades([]);
      localStorage.removeItem("grades");
      alert("All grades have been cleared.");
    }
  };

  return (
    <div>
      <h2>Grades</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "15px" }}>
        <DashboardCard title="Average Grade Percentage" value={averageGrade} />
        <DashboardCard title="Exams Completed" value={grades.length} />
        <button onClick={clearGrades} style={{ height: "40px" }}>
          Clear All Grades
        </button>
      </div>

      {grades.length > 0 ? (
        <ChartCard
          title="Grades Trend"
          labels={grades.map(g => g.subject)}
          data={grades.map(g => g.score)}
        />
      ) : (
        <p>No exam results available yet.</p>
      )}
    </div>
  );
};

export default Grades;
