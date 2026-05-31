import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, profile, loading } = useAuth();

  if (loading) return (
    <div style={styles.loading}>
      <p>Loading...</p>
    </div>
  );

  if (!user) return <Navigate to="/" replace />;

  if (profile?.status === "pending") return (
    <div style={styles.pending}>
      <h2>Account Pending Approval</h2>
      <p>Your account is being reviewed. You'll receive an email once approved!</p>
    </div>
  );

  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRoutes() {
  const { user, profile, loading } = useAuth();

  if (loading) return (
    <div style={styles.loading}>
      <p>Loading...</p>
    </div>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          !user ? <Login /> :
          profile?.role === "admin" ? <Navigate to="/admin/dashboard" replace /> :
          <Navigate to="/student/dashboard" replace />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

const styles = {
  loading: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#333",
  },
  pending: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    color: "#333",
    padding: "40px",
    textAlign: "center",
  },
};