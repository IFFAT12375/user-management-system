
import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import userService from "../../services/userService";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import UserDetailsModal from "../../components/users/UserDetailsModal";
import UserFormModal from "../../components/users/UserFormModal";

const PAGE_SIZE = 5;

const toSafeUser = (user) => ({
  _id: user._id || user.id,
  name: user.name || "",
  email: user.email || "",
  role: user.role || "",
});

const UserList = () => {
  const { user: currentUser } = useAuth();
  const { refreshKey } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersOnly = users.filter(
    (user) => user.role?.toLowerCase() !== "admin"
  );
  const pageCount = Math.ceil(usersOnly.length / PAGE_SIZE);
  const visibleUsers = usersOnly.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const firstEntry = usersOnly.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const lastEntry = Math.min(currentPage * PAGE_SIZE, usersOnly.length);
  const isAdmin = currentUser?.role === "Admin";
  const currentUserId = currentUser?._id || currentUser?.id;

  const fetchUsers = useCallback(async () => {
    try {
      const result = await userService.getAll();
      setUsers(Array.isArray(result) ? result.map(toSafeUser) : []);
      setCurrentPage(1);
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
          setCurrentPage(1);
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
  }, [refreshKey]);

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

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    setDeleteError("");

    try {
      await userService.remove(deleteTarget._id);
      const updatedUsers = users.filter(
        (user) => user._id !== deleteTarget._id
      );
      const remainingPages = Math.max(
        1,
        Math.ceil(
          updatedUsers.filter((user) => user.role?.toLowerCase() !== "admin")
            .length / PAGE_SIZE
        )
      );
      setUsers(updatedUsers);
      setCurrentPage((page) => Math.min(page, remainingPages));
      setSuccess("User deleted successfully.");
      setDeleteTarget(null);
    } catch (deleteRequestError) {
      setDeleteError(
        deleteRequestError.response?.data?.message ||
          "Unable to delete the user."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <main className="users-container">
      <div className="users-heading">
        <div>
          <h1>User Management</h1>
          <p>View and manage user accounts.</p>
        </div>
        {isAdmin && (
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

      {!loading && !error && usersOnly.length === 0 && (
        <p className="empty-state">No users found.</p>
      )}

      {usersOnly.length > 0 && (
        <div className="users-table-wrapper">
          <div className="table-toolbar">
            <div>
              <h2>Users</h2>
              <p>Showing {firstEntry}–{lastEntry} of {usersOnly.length} users</p>
            </div>
          </div>
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
              {visibleUsers.map((user) => (
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
                    {(isAdmin || currentUserId === user._id) && (
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
                    )}
                    {isAdmin && (
                      <button
                        type="button"
                        className="icon-button delete-user-button"
                        aria-label={`Delete ${user.name}`}
                        title="Delete user"
                        onClick={() => {
                          setDeleteTarget(user);
                          setDeleteError("");
                        }}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-pagination">
            <span>
              Page {currentPage} of {pageCount}
            </span>
            <div className="pagination-controls">
              <button
                type="button"
                className="pagination-button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-button pagination-number${page === currentPage ? " is-current" : ""}`}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                type="button"
                className="pagination-button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(pageCount, page + 1))
                }
                disabled={currentPage === pageCount}
              >
                Next
              </button>
            </div>
          </div>
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
      {deleteTarget && (
        <Modal
          isOpen
          onClose={() => {
            if (!deleteLoading) setDeleteTarget(null);
          }}
          title="Delete User"
          size="sm"
        >
          <p>
            Are you sure you want to delete <strong>{deleteTarget.name}</strong>?
            This action cannot be undone.
          </p>
          <ErrorMessage message={deleteError} />
          <div className="modal-actions">
            <Button
              type="button"
              variant="secondary"
              disabled={deleteLoading}
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              loading={deleteLoading}
              onClick={handleDelete}
            >
              Delete User
            </Button>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default UserList;