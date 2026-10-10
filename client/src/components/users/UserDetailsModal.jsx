import { useEffect, useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import Button from "../common/Button";
import Modal from "../common/Modal";
import userService from "../../services/userService";

const toSafeUser = (user) => {
  if (!user) return null;

  return {
    name: user.name || "",
    email: user.email || "",
    role: user.role || "",
  };
};

const UserDetailsModal = ({ isOpen, onClose, user, onEdit }) => {
  const userId = user?._id || user?.id;
  const [details, setDetails] = useState(() => toSafeUser(user));
  const [loading, setLoading] = useState(Boolean(userId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || !userId) return undefined;

    let isCurrentRequest = true;

    const fetchDetails = async () => {
      try {
        const result = await userService.getById(userId);
        if (isCurrentRequest) setDetails(toSafeUser(result));
      } catch (fetchError) {
        if (isCurrentRequest) {
          setError(
            fetchError.response?.data?.message ||
              "Unable to load user details."
          );
        }
      } finally {
        if (isCurrentRequest) setLoading(false);
      }
    };

    fetchDetails();

    return () => {
      isCurrentRequest = false;
    };
  }, [isOpen, userId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Details"
      size="sm"
    >
      {loading && <p role="status">Loading user details...</p>}
      <ErrorMessage message={error} />
      {!loading && !error && details && (
        <>
          <dl className="user-details">
            <div>
              <dt>Name</dt>
              <dd>{details.name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{details.email}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{details.role}</dd>
            </div>
          </dl>
          {onEdit && (
            <div className="modal-actions">
              <Button type="button" onClick={onEdit}>
                Edit details
              </Button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default UserDetailsModal;