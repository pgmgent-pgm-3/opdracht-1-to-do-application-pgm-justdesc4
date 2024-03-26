import Category from "../models/Category.js";
import knex from "../lib/Knex.js";

/**
 * ============================================
 * Create a new category
 * ============================================
 */
export const createCategory = async (req, res) => {
  try {
    const link = req.body.category;
    let category = await Category.query().findOne({ link });

    if (!category) {
      category = await Category.query().insert({
        link,
        ...req.body,
      });
    }

    const userCategory = await knex("category_user")
      .where({ user_id: req.user.id, category_id: category.id })
      .first();

    if (!userCategory) {
      await knex("category_user").insert({
        user_id: req.user.id,
        category_id: category.id,
      });
    }

    res.redirect(`/${category.link}`);
  } catch (error) {
    console.error(error);
    res.redirect(
      `/?msg=Sorry, we've encountered an error with our server. Please try again!`
    );
  }
};
