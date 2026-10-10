const User = require("./user.model");
const { hashPassword } = require("../utils/password");

const toPublicUser = (user) => ({
  _id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});

const createUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("User with this email already exists");
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

  return toPublicUser(user);
};

const getUsers = async () => {
  const users = await User.find().select("-password");
  return users.map(toPublicUser);
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return toPublicUser(user);
};

const updateUser = async (id, data) => {
  const updates = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.email !== undefined) updates.email = data.email;

  const user = await User.findByIdAndUpdate(
    id,
    updates,
    {
      new: true,
      runValidators: true,
    },
  ).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return toPublicUser(user);
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return toPublicUser(user);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};