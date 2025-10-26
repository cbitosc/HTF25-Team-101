import React, { useState, useEffect } from "react";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [year, setYear] = useState("1st Year");
  const [semester, setSemester] = useState("Sem-1");
  const [examType, setExamType] = useState("Mid-1");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const semesters = ["Sem-1", "Sem-2"];
  const examTypes = ["Mid-1", "Mid-2", "Lab Internal", "Lab External", "Sem Exam"];

  // Load exams from localStorage
  useEffect(() => {
    const savedExams = JSON.parse(localStorage.getItem("exams")) || [];
    setExams(savedExams);
  }, []);

  const saveExams = (newExams) => {
    setExams(newExams);
    localStorage.setItem("exams", JSON.stringify(newExams));
  };

  // Add exam
  const addExam = () => {
    if (!subject || !date || !time) return;

    const newExams = [
      ...exams,
      { subject, date, time, notes, year, semester, examType, completed: false, result: "" },
    ];
    saveExams(newExams);

    setSubject("");
    setDate("");
    setTime("");
    setNotes("");
  };

  // Delete exam
  const deleteExam = (index) => {
    const newExams = exams.filter((_, i) => i !== index);
    saveExams(newExams);
  };

  // Toggle completed
  const toggleCompleted = (index) => {
    const newExams = [...exams];
    newExams[index].completed = !newExams[index].completed;

    // Clear result if unchecked
    if (!newExams[index].completed) newExams[index].result = "";

    saveExams(newExams);
  };

  // Add result and update Grades
  const addResult = (index) => {
    const exam = exams[index];
    if (!exam.completed) {
      alert("Mark the exam as Completed first!");
      return;
    }

    const score = prompt("Enter result/score for this exam:", exam.result || "");
    if (score === null || score.trim() === "") return;

    const newExams = [...exams];
    newExams[index].result = Number(score);
    saveExams(newExams);

    // Update Grades
    const grades = JSON.parse(localStorage.getItem("grades")) || [];

    const gradeIndex = grades.findIndex(
      (g) => g.subject === `${exam.subject} - ${exam.examType}`
    );

    if (gradeIndex !== -1) {
      // Update existing grade
      grades[gradeIndex].score = Number(score);
    } else {
      // Add new grade
      grades.push({
        subject: `${exam.subject} - ${exam.examType}`,
        score: Number(score),
      });
    }

    localStorage.setItem("grades", JSON.stringify(grades));
    alert("Result added successfully and reflected in Grades!");
  };

  // Filter exams
  const filteredExams = exams.filter(
    (e) => e.year === year && e.semester === semester && e.examType === examType
  );

  return (
    <div>
      <h2>Exam Schedule</h2>

      {/* Input Section */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject / Exam Name"
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)"
        />

        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((yr, i) => <option key={i} value={yr}>{yr}</option>)}
        </select>

        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          {semesters.map((sem, i) => <option key={i} value={sem}>{sem}</option>)}
        </select>

        <select value={examType} onChange={(e) => setExamType(e.target.value)}>
          {examTypes.map((type, i) => <option key={i} value={type}>{type}</option>)}
        </select>

        <button onClick={addExam}>Add Exam</button>
      </div>

      {/* Exams Table */}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
            <th>Notes</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExams.length === 0 ? (
            <tr>
              <td colSpan="6">No exams added for this selection.</td>
            </tr>
          ) : (
            filteredExams.map((exam, idx) => (
              <tr key={idx}>
                <td>{exam.subject}</td>
                <td>{exam.date}</td>
                <td>{exam.time}</td>
                <td>{exam.notes || "-"}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={exam.completed}
                    onChange={() => toggleCompleted(exams.indexOf(exam))}
                  />
                </td>
                <td>
                  <button
                    onClick={() => addResult(exams.indexOf(exam))}
                    disabled={!exam.completed}
                  >
                    Add Result
                  </button>
                  <button onClick={() => deleteExam(exams.indexOf(exam))} style={{ marginLeft: "5px" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Exams;
