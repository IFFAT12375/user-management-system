export const hasRole = (user, role) => user?.role === role;

export const isAdmin = (user) => hasRole(user, "Admin");
