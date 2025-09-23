import React from "react";
import CourseHeader from "./coursesPage/CoursesHeader";
import CourseSummaryCards from "./coursesPage/CoursesCards";
import CourseTable from "./coursesPage/CoursesMain";

function CoursesPage() {
  return (
    <div>
      <CourseHeader />
      <CourseSummaryCards />
      <CourseTable />
    </div>
  );
}

export default CoursesPage;
