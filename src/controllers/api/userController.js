import User from "../../models/User.js";

export const getUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.query().findById(id).withGraphFetched("[tasks]");

  res.json(user);
};
