import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/schedule/SchedulePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import GroupPage from "./pages/admin/GroupPage";
import DashboardPage from "./pages/admin/DashboardPage";
import SubjectPage from "./pages/admin/SubjectPage";
import TeacherPage from "./pages/admin/TeacherPage";
import RoomPage from "./pages/admin/RoomPage";

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
        <Route index element={<DashboardPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="subject" element={<SubjectPage />} />
        <Route path="teacher" element={<TeacherPage />} />
        <Route path="group" element={<GroupPage />} />
        <Route path="room" element={<RoomPage />} />
      </Route>
    </Routes>
  );
};

export default RoutesProvider;
