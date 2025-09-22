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

// Dashboard

import { Dashboard } from "./DashboardTest/Dashboard";
import { Users } from "./DashboardTest/Users";
import { Tutors } from "./DashboardTest/Tutors";
import { Courses } from "./DashboardTest/Courses";
import { Reviews } from "./DashboardTest/Reviews";
import { Settings } from "./DashboardTest/Settings";
import Sidebar from "./DashboardTest/common/sidebar";
import NavbarTest from "./DashboardTest/common/navbar";

// new dashboard imports
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
import { useState } from "react";
import StudentsPage from "./Dashboard/StudentsPage";
// ===== Layouts =====
const MainLayout = () => (
  <div>
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const AdminLayout = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 w-full flex flex-col">
      <NavbarTest />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

// dashboard layout new
const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  return (
    <div>
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
      { path: "/contact", element: <Contact /> },
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
    // new dashboard layout
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
      { path: "reviews", element: <ReviewsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "adminSignup", element: <AdminSignup /> },
      { path: "verify-otp", element: <AdminVerifyOtp /> },
    ],
  },
]);

// ===== App =====
function App() {
  return <RouterProvider router={router} />;
}

export default App;
