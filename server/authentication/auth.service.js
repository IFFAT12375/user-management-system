const User = require("../user-management/user.model");

const {
  hashPassword,
  comparePassword,
} = require("../utils/password");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

const createTokens = (user) => {
  const payload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
  };
};

const formatUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error(
      "User with this email already exists"
    );

    error.statusCode = 409;

    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "User",
  });

  const tokens = createTokens(user);

  return {
    user: formatUser(user),
    ...tokens,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email or password");

    error.statusCode = 401;

    throw error;
  }

  const passwordValid = await comparePassword(
    password,
    user.password
  );

  if (!passwordValid) {
    const error = new Error("Invalid email or password");

    error.statusCode = 401;

    throw error;
  }

  const tokens = createTokens(user);

  return {
    user: formatUser(user),
    ...tokens,
  };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token is required");

    error.statusCode = 401;

    throw error;
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    const authError = new Error(
      "Invalid or expired refresh token"
    );

    authError.statusCode = 401;

    throw authError;
  }

  const user = await User.findById(decoded.userId);

  if (!user) {
    const error = new Error("User no longer exists");

    error.statusCode = 401;

    throw error;
  }

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    accessToken,
  };
};

module.exports = {
  register,
  login,
  refreshAccessToken,
};