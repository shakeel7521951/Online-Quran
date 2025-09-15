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
import { Sidebar } from "./Dashboard/common/Sidebar";
import DashboardNavbar from "./Dashboard/common/Navbar";
import { Dashboard } from "./Dashboard/Dashboard";
import { Users } from "./Dashboard/Users";
import { Tutors } from "./Dashboard/Tutors";
import { Courses } from "./Dashboard/Courses";
import { Reviews } from "./Dashboard/Reviews";
import { Settings } from "./Dashboard/Settings";
import AdminSignup from "./Dashboard/AdminSignup";

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
    <div className="flex-1 flex flex-col">
      <DashboardNavbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

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
    path: "/dashboard",
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
      { path: "adminSignup", element: <AdminSignup /> },
    ],
  },
]);

// ===== App =====
function App() {
  return <RouterProvider router={router} />;
}

export default App;
