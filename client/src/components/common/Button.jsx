const Button = ({
  children,
  type = "button",
  loading = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="btn"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;