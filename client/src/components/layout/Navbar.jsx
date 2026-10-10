const Navbar = ({ user, onMenuClick, onOpenProfile, onLogout }) => {
  return (
    <header className="app-navbar">
      <button
        type="button"
        className="menu-toggle"
        aria-label="Open navigation"
        aria-controls="app-sidebar"
        onClick={onMenuClick}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <button
        type="button"
        className="navbar-profile"
        onClick={onOpenProfile}
        aria-label="Open your profile"
      >
        <span className="user-avatar navbar-avatar" aria-hidden="true">
          {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
        </span>
        <span className="navbar-account">
          <span className="navbar-account-name">{user?.name || "Account"}</span>
          <span className="navbar-account-email">{user?.email || ""}</span>
        </span>
      </button>

      <button
        type="button"
        className="logout-button"
        onClick={onLogout}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 17l5-5-5-5M15 12H3m9-8h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7" />
        </svg>
        <span>Log out</span>
      </button>
    </header>
  );
};

export default Navbar;
