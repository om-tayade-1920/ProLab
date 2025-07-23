import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateProject from "./pages/CreateProject";
import ProjectsList from "./pages/ProjectsList";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleProject from "./pages/SingleProject";

function AppRoutes() {
  const location = useLocation();

  const noNavbarRoutes = ["/", "/register"];
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route path="/project" element={<ProtectedRoute><ProjectsList /></ProtectedRoute>} />
        <Route path="/project/:id" element={<ProtectedRoute><SingleProject /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      </Routes>
      
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
