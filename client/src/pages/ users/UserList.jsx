
import { useCallback, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import userService from "../../services/userService";
import ErrorMessage from "../../components/common/ErrorMessage";
import UserDetailsModal from "../../components/users/UserDetailsModal";
import UserFormModal from "../../components/users/UserFormModal";

const toSafeUser = (user) => ({
  _id: user._id || user.id,
  name: user.name || "",
  email: user.email || "",
  role: user.role || "",
});

const UserList = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const result = await userService.getAll();
      setUsers(Array.isArray(result) ? result.map(toSafeUser) : []);
      setError("");
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message || "Failed to fetch users."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadUsers = async () => {
      try {
        const result = await userService.getAll();
        if (isCurrentRequest) {
          setUsers(Array.isArray(result) ? result.map(toSafeUser) : []);
          setError("");
        }
      } catch (fetchError) {
        if (isCurrentRequest) {
          setError(
            fetchError.response?.data?.message || "Failed to fetch users."
          );
        }
      } finally {
        if (isCurrentRequest) setLoading(false);
      }
    };

    loadUsers();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  const openForm = (user = null) => {
    setSelectedUser(user);
    setActiveModal("form");
    setSuccess("");
  };

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedUser(null);
  }, []);

  const handleSave = async (userData) => {
    if (selectedUser) {
      await userService.update(selectedUser._id, userData);
      setSuccess("User updated successfully.");
    } else {
      await userService.create({ ...userData, role: "User" });
      setSuccess("User created successfully.");
    }

    closeModal();
    setLoading(true);
    await fetchUsers();
  };

  return (
    <main className="users-container">
      <div className="users-heading">
        <div>
          <h1>User Management</h1>
          <p>View and manage user accounts.</p>
        </div>
        {currentUser?.role === "Admin" && (
          <button
            type="button"
            className="btn btn-primary add-user-button"
            onClick={() => openForm()}
          >
            Add User
          </button>
        )}
      </div>

      {success && <p className="success-message" role="status">{success}</p>}
      <ErrorMessage message={error} />

      {loading && <p role="status">Loading users...</p>}

      {!loading && !error && users.length === 0 && (
        <p className="empty-state">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>
                  <span className="visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="user-actions">
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`View details for ${user.name}`}
                      title="View details"
                      onClick={() => {
                        setSelectedUser(user);
                        setActiveModal("details");
                      }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Edit ${user.name}`}
                      title="Edit user"
                      onClick={() => openForm(user)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m15 5 4 4M4 20l4-.8L19.5 7.7a2.12 2.12 0 0 0-3-3L5 16.2 4 20Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeModal === "form" && (
        <UserFormModal
          isOpen
          onClose={closeModal}
          user={selectedUser}
          onSave={handleSave}
        />
      )}
      {activeModal === "details" && (
        <UserDetailsModal
          isOpen
          onClose={closeModal}
          user={selectedUser}
        />
      )}
    </main>
  );
};

export default UserList;