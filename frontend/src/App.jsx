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
import { Dashboard } from "./Dashboard/common pages/Dashboard";
import { Sidebar } from "./Dashboard/common pages/Sidebar";
import Users from "./Dashboard/common pages/Users";
import Tutors from "./Dashboard/common pages/Tutors";
import { Courses } from "./Dashboard/common pages/Courses";
import { Reviews } from "./Dashboard/common pages/Reviews";
import { Settings } from "./Dashboard/common pages/Settings";

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
    <div className="flex-1 p-6">
      <Outlet />
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
    element: (<AdminRoute><AdminLayout /></AdminRoute>),
    children: [
      { index: true, element: <Dashboard /> }, 
      { path: "users", element: <Users /> },
      { path: "tutors", element: <Tutors /> },
      { path: "courses", element: <Courses /> },
      { path: "reviews", element: <Reviews /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

// ===== App =====
function App() {
  return <RouterProvider router={router} />;
}

export default App;
