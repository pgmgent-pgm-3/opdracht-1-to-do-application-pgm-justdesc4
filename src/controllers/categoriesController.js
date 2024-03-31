import Category from "../models/Category.js";
import Task from "../models/Task.js";

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
        user_id: req.user.id,
        ...req.body,
      });
    } else {
      if (category) {
        return res.redirect(`/?msg=This category already exists.`);
      }
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
 * Update category
 * ============================================
 */
export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    console.log(req.params.id);
    const category = await Category.query().findById(parseInt(categoryId));

    if (category && category.user_id === req.user.id) {
      const updatedData = {
        category: req.body.category,
        link: req.body.category.toLowerCase().replace(/ /g, "-"),
      };
      await category.$query().patch(updatedData);
      res.redirect(`/${category.link}?msg=Category updated successfully!`);
    } else {
      res.redirect(
        `/?msg=Sorry, we were unable to update the category. Please try again!`
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
 * Delete a category
 * ============================================
 */
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.query().findById(categoryId);

    if (category && category.user_id === req.user.id) {
      await Task.query()
        .where({ category_id: category.id, user_id: req.user.id })
        .delete();
      await Category.query().deleteById(category.id);

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
  delete req.body.method;

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
