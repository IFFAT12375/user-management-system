import { useState } from "react";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import Modal from "../common/Modal";

const UserFormModal = ({ isOpen, onClose, user, onSave }) => {
  const isEditing = Boolean(user);
  const [formData, setFormData] = useState(() => ({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  }));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
    };

    if (!isEditing) {
      userData.password = formData.password;
    }

    try {
      await onSave(userData);
    } catch (saveError) {
      setError(
        saveError.response?.data?.message ||
          saveError.message ||
          `Unable to ${isEditing ? "update" : "create"} the user.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit User" : "Add User"}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <ErrorMessage message={error} />

        <div className="form-group">
          <label htmlFor="user-name">Name</label>
          <input
            id="user-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            minLength={2}
            maxLength={50}
            autoComplete="name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-email">Email</label>
          <input
            id="user-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>

        {!isEditing && (
          <div className="form-group">
            <label htmlFor="user-password">Initial password</label>
            <input
              id="user-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              autoComplete="new-password"
              required
            />
          </div>
        )}

        {isEditing && (
          <p className="user-form-role">
            Role: <strong>{user.role || "User"}</strong> (not editable here)
          </p>
        )}

        <div className="modal-actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isEditing ? "Save Changes" : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;