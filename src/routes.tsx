import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

const RoutesProvider = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />
      </Route>

      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route
        path="admin"
        element={
          <ProtectedRoute required_role="user">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="schedule" element={<SchedulePage />} />
      </Route>
    </Routes>
  );
};

export default RoutesProvider;
