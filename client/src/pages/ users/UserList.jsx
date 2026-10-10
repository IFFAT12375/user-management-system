
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";

import userService from "../../services/userService";
import ErrorMessage from "../../components/common/ErrorMessage";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await userService.getAll();

        // Adjust this if your API returns a different structure.
        const userList = Array.isArray(result)
          ? result
          : result.users;

        setUsers(userList || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to fetch users."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <main className="users-container">
      <h1>User Management</h1>

      <ErrorMessage message={error} />

      {!error && users.length === 0 && (
        <p>No users found.</p>
      )}

      {users.length > 0 && (
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id || user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={() => setIsModalOpen(true)}>
      Test Modal
    </button>

    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Test Modal"
      size="md"
    >
      <p>Your reusable modal is working!</p>
    </Modal>
    </main>
  );
};

export default UserList;