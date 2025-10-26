import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function Analytics() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const querySnapshot = await getDocs(collection(db, "assignments"));
      setAssignments(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchAssignments();
  }, []);

  // Prepare data for charts
  const trendData = assignments.filter(a => a.grade != null).map(a => ({ date: a.dueDate, grade: a.grade }));
  
  const courseAvg = assignments.reduce((acc, a) => {
    if(a.grade != null){
      acc[a.course] = acc[a.course] || { total:0, count:0 };
      acc[a.course].total += a.grade;
      acc[a.course].count += 1;
    }
    return acc;
  }, {});
  const barData = Object.keys(courseAvg).map(course => ({
    course,
    avg: (courseAvg[course].total / courseAvg[course].count).toFixed(2)
  }));

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ padding: 20, flexGrow: 1 }}>
          <h3>Analytics</h3>
          <h4>Grades Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis domain={[0,100]} />
              <Tooltip />
              <Line type="monotone" dataKey="grade" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>

          <h4>Course Average Grades</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="course" />
              <YAxis domain={[0,100]} />
              <Tooltip />
              <Bar dataKey="avg" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </main>
      </div>
    </div>
  );
}
