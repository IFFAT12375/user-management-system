import { useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import userService from "../../services/userService";
import UserDetailsModal from "../users/UserDetailsModal";
import UserFormModal from "../users/UserFormModal";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const { user, logout, updateCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [profileSuccess, setProfileSuccess] = useState("");

  const closeModal = useCallback(() => setActiveModal(null), []);
  const refreshContent = useCallback(() => {
    setRefreshKey((key) => key + 1);
  }, []);

  const handleLogout = async () => {
    let logoutError = "";

    try {
      await logout();
    } catch {
      logoutError =
        "The server could not confirm logout. Your local session was cleared.";
    } finally {
      navigate("/login", {
        replace: true,
        state: logoutError ? { logoutError } : undefined,
      });
    }
  };

  const handleProfileSave = async (userData) => {
    const userId = user?._id || user?.id;
    if (!userId) {
      throw new Error("Unable to identify the signed-in user.");
    }

    const result = await userService.update(userId, userData);
    const safeUser = {
      id: result?.id || result?._id || userId,
      name: result?.name || userData.name,
      email: result?.email || userData.email,
      role: result?.role || user.role,
    };

    updateCurrentUser(safeUser);
    refreshContent();
    setProfileSuccess("Your profile was updated successfully.");
    closeModal();
  };

  return (
    <div className="dashboard-shell">
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onViewProfile={() => {
          setSidebarOpen(false);
          setActiveModal("profile");
        }}
      />

      <div className="dashboard-main">
        <Navbar
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          onOpenProfile={() => setActiveModal("profile")}
          onLogout={handleLogout}
        />
        {profileSuccess && (
          <p className="success-message dashboard-success" role="status">
            {profileSuccess}
          </p>
        )}
        <Outlet context={{ refreshKey }} />
      </div>

      {activeModal === "profile" && (
        <UserDetailsModal
          isOpen
          onClose={closeModal}
          user={user}
          onEdit={() => setActiveModal("edit-profile")}
        />
      )}
      {activeModal === "edit-profile" && (
        <UserFormModal
          isOpen
          onClose={closeModal}
          user={user}
          onSave={handleProfileSave}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
