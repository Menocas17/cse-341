export function restrictTo(role) {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Access denied, you must be ${role} to access` });
    }
    next();
  };
}
