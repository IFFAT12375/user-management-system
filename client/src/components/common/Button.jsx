const Button = ({
  children,
  type = "button",
  loading = false,
  disabled = false,
  onClick,
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;