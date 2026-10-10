import { NavLink } from "react-router-dom";

const Sidebar = ({
  user,
  isOpen,
  onClose,
  onViewProfile,
}) => {
  return (
    <>
      <aside
        id="app-sidebar"
        className={`app-sidebar${isOpen ? " is-open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark" aria-hidden="true">U</span>
          <span>User System</span>
          <button
            type="button"
            className="sidebar-close"
            aria-label="Close navigation"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `sidebar-link${isActive ? " is-active" : ""}`
            }
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5h16v14H4zM4 10h16M9 10v9" />
            </svg>
            <span>User management</span>
          </NavLink>
        </nav>

        <div className="sidebar-profile">
          <button
            type="button"
            className="sidebar-user sidebar-profile-button"
            onClick={() => {
              onClose();
              onViewProfile();
            }}
            aria-label="Open your profile"
          >
            <span className="user-avatar" aria-hidden="true">
              {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
            </span>
            <span className="sidebar-user-details">
              <strong>{user?.name || "Signed-in user"}</strong>
              <span>{user?.role || "User"}</span>
            </span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
