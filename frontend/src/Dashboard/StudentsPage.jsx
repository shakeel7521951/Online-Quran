import React, { useState } from "react";
import StudentsHeader from "./studentsPage/StudentsHeader";
import StudentSummaryCards from "./studentsPage/StudentsCards";
import StudentTable from "./studentsPage/StudentsTable";

function StudentsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStudentAdded = (newStudent) => {
    // Trigger a refresh of the table
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <StudentsHeader onStudentAdded={handleStudentAdded} />
      <StudentSummaryCards />
      <StudentTable key={refreshTrigger} onStudentAdded={handleStudentAdded} />
    </div>
  );
}

export default StudentsPage;
