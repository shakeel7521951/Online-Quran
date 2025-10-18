// src/App.jsx
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Common Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/common/Login";
import Signup from "./components/common/Signup";
import Profile from "./features/profile/Profile";
import ProtectedRoute from "./features/ProtectedRoute";
import { AdminRoute } from "./features/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FreeTrialClass from "./components/ServicesComp/FreeTrialClass";

// Dashboard (old)
import { Dashboard } from "./DashboardTest/Dashboard";
import { Users } from "./DashboardTest/Users";
import { Tutors } from "./DashboardTest/Tutors";
import { Courses } from "./DashboardTest/Courses";
import { Reviews } from "./DashboardTest/Reviews";
import { Settings } from "./DashboardTest/Settings";
import Sidebar from "./DashboardTest/common/sidebar";
import NavbarTest from "./DashboardTest/common/navbar";

// New Dashboard
import DashSidebar from "./Dashboard/common/DashSidebar";
import DashNavbar from "./Dashboard/common/DashNavbar";
import AdminSignup from "./Dashboard/common/AdminSignup";
import AdminVerifyOtp from "./Dashboard/common/AdminVerifyOtp";
import DashboardHome from "./Dashboard/DashboardHome";
import UsersPage from "./Dashboard/UsersPage";
import TutorsPage from "./Dashboard/TutorsPage";
import CoursesPage from "./Dashboard/CoursesPage";
import ReviewsPage from "./Dashboard/ReviewsPage";
import SettingsPage from "./Dashboard/SettingsPage";
import EnrollmentsPage from "./Dashboard/EnrollmentsPage";
import ContactsPage from "./Dashboard/ContactsPage";
import StudentsPage from "./Dashboard/StudentsPage";
import FeePlan from "./pages/FeePlan";

import { useState } from "react";
import Teacher from "./pages/Teacher";
import NoraaniQaida from "./components/CoursesLine/NoraniQaida";
import Course from "./pages/Course";
import MadaniQaida from "./components/CoursesLine/MadaniQaida";
import NazraQuran from "./components/CoursesLine/NazraQuran";
import NamazDua from "./components/CoursesLine/NamazDua";
import BasicIslamic from "./components/CoursesLine/BasicIslamic";
import TajweedSection from "./components/ServicesComp/TajweedSection";
import ScienceObligatory from "./components/CoursesLine/ScienceObligatory";
import QuranMemorization from "./components/ServicesComp/QuranMemorization";

// ===== Layouts =====
const MainLayout = () => (
  <div className="overflow-hidden">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const AdminLayout = () => (
  <div className="overflow-hidden flex min-h-screen">
    <Sidebar />
    <div className="flex-1 w-full flex flex-col">
      <NavbarTest />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // desktop collapse

  return (
    <div className="overflow-hidden">
      <DashSidebar
        open={open}
        setOpen={setOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div
        className={`${
          collapsed ? "md:ml-20" : "md:ml-64"
        } transition-all duration-300`}
      >
        <DashNavbar setOpen={setOpen} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ===== Router Config =====
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/about", element: <About /> },
      { path: "/course", element: <Course /> },
      { path: "/courses/norani-qaida", element: <NoraaniQaida /> },
      { path: "/courses/madni-qaida", element: <MadaniQaida /> },
      { path: "/courses/nazra-quran", element: <NazraQuran /> },
      { path: "/courses/namaz", element: <NamazDua /> },
      { path: "/courses/basic-islamic-knowledge", element: <BasicIslamic/> },
      { path: "/courses/obligatory-science", element: <ScienceObligatory/> },
      { path: "/feeplan", element: <FeePlan/> },
      { path: "/teachers", element: <Teacher/> },
      { path: "/contact", element: <Contact /> },
      { path: "/tajweed", element: <TajweedSection /> },
      { path: "/courses/quran-memorization", element: <QuranMemorization /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  { path: "/FreeTrialClass", element: <FreeTrialClass /> },
  {
    path: "/dashboardTest",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "tutors", element: <Tutors /> },
      { path: "courses", element: <Courses /> },
      { path: "reviews", element: <Reviews /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "users", element: <UsersPage /> },
      { path: "tutors", element: <TutorsPage /> },
      { path: "students", element: <StudentsPage /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "enrollments", element: <EnrollmentsPage /> },
      { path: "contacts", element: <ContactsPage /> },
      { path: "reviews", element: <ReviewsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "adminSignup", element: <AdminSignup /> },
      { path: "verify-otp", element: <AdminVerifyOtp /> },
    ],
  },
]);

// ===== App =====
function App() {
  return (
    <div className="overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
