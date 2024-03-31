import User from "../../models/User.js";

/**
 * ============================================
 * Get user by id
 * ============================================
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== parseInt(id)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to view this user." });
    }

    const user = await User.query().findById(id).withGraphFetched("[tasks]");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
