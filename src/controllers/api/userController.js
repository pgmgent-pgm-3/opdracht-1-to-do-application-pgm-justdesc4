import User from "../../models/User.js";

/**
 * ============================================
 * get all users
 * ============================================
 */
export const getUsers = async (req, res) => {
  const users = await User.query().withGraphFetched("[tasks]");

  res.json(users);
};

/**
 * ============================================
 * Get user by id
 * ============================================
 */
export const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.query().findById(id).withGraphFetched("[tasks]");

  res.json(user);
};
