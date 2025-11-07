import React, { useState, useEffect } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);

  // Load assignments from localStorage
  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(savedAssignments);
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFile({
        name: selectedFile.name,
        data: reader.result
      });
    };
    reader.readAsDataURL(selectedFile); // convert file to base64
  };

  // Add new assignment
  const addAssignment = () => {
    if (!name || !dueDate) return;
    const newAssignments = [...assignments, { name, dueDate, file, submitted: false }];
    setAssignments(newAssignments);
    localStorage.setItem("assignments", JSON.stringify(newAssignments));
    setName("");
    setDueDate("");
    setFile(null);
  };

  // Delete assignment
  const deleteAssignment = (index) => {
    const newAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(newAssignments);
    localStorage.setItem("assignments", JSON.stringify(newAssignments));
  };

  // Show due date info
  const showDueDate = (date) => {
    alert(`This assignment is due on: ${date}`);
  };

  // Download file
  const downloadFile = (file) => {
    if (!file) return;
    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name;
    link.click();
  };

  // Mark as submitted
  const submitAssignment = (index) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index].submitted = true;
    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
  };

  return (
    <div>
      <h2>Assignments</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Assignment Name"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={addAssignment}>Add</button>

      <ul>
        {assignments.map((a, i) => (
          <li key={i} style={{ marginBottom: "8px" }}>
            <strong>{a.name}</strong> 
            {a.submitted ? (
              <span style={{ marginLeft: "10px", color: "green" }}>Submitted ✅</span>
            ) : (
              <>
                <button style={{ marginLeft: "5px" }} onClick={() => showDueDate(a.dueDate)}>
                  Due Date Info
                </button>
                {a.file && (
                  <button style={{ marginLeft: "5px" }} onClick={() => downloadFile(a.file)}>
                    Download Assignment
                  </button>
                )}
                <button style={{ marginLeft: "5px" }} onClick={() => submitAssignment(i)}>
                  Submit
                </button>
              </>
            )}
            <button style={{ marginLeft: "5px" }} onClick={() => deleteAssignment(i)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;
