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

/**
 * ============================================
 * Delete a category
 * ============================================
 */
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.query().findById(categoryId);

    if (category) {
      const userCategory = await knex("category_user")
        .where({ user_id: req.user.id, category_id: category.id })
        .first();

      if (userCategory) {
        await knex("category_user")
          .where({ user_id: req.user.id, category_id: category.id })
          .delete();
        await knex("tasks")
          .where({ category_id: category.id, user_id: req.user.id })
          .delete();

        const userCategories = await knex("category_user").where({
          category_id: category.id,
        });

        if (userCategories.length === 0) {
          await Category.query().deleteById(category.id);
        }
      }

      res.redirect("/?msg=Category deleted successfully!");
    } else {
      res.redirect(
        `/?msg=Sorry, we were unable to delete the category. Please try again!`
      );
    }
  } catch (error) {
    console.error(error);
    res.redirect(
      `/?msg=Sorry, we've encountered an error with our server. Please try again!`
    );
  }
};

/**
 * ============================================
 * Handle the categories form
 * ============================================
 */
export const handlePostCategories = async (req, res) => {
  const method = req.body.method;

  switch (method) {
    case "DELETE":
      await deleteCategory(req, res);
      break;
    case "PUT":
      await updateCategory(req, res);
      break;
    default:
      await createCategory(req, res);
      break;
  }
};
