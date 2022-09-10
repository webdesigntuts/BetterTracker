const requireAuth = (req, res, next) => {
  if (req?.session?.userId) next();
  else res.status(401).json({ authed: false });
};

export default requireAuth;
