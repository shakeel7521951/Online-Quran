import React from "react";
import StudentsHeader from "./studentsPage/StudentsHeader";
import StudentSummaryCards from "./studentsPage/StudentsCards";
import StudentTable from "./studentsPage/StudentsTable";

function StudentsPage() {
  return (
    <div>
      <StudentsHeader />
      <StudentSummaryCards />
      <StudentTable />
    </div>
  );
}

export default StudentsPage;
