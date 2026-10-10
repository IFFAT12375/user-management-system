
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import UserList from "../pages/ users/UserList";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/users" element={<UserList />} />
        </Route>
      </Route>

      <Route
        path="/"
        element={<Navigate to="/users" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/users" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;