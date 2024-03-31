import Category from "../../models/Category.js";

/**
 * ============================================
 * Get all categories
 * ============================================
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.query().where({
      user_id: req.user.id,
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================================
 * Get category by id
 * ============================================
 */
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.query().findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    if (category.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to view this category." });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================================
 * Create a new category
 * ============================================
 */
export const createCategory = async (req, res) => {
  try {
    const link = req.body.category;
    let category = await Category.query().findOne({
      link,
    });

    if (!category) {
      category = await Category.query().insert({
        link,
        user_id: req.user.id,
        ...req.body,
      });
    }

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================================
 * Update category
 * ============================================
 */
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.query().findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    if (category.user_id !== req.user.id) {
      return res.status(403).json({
        message: "You do not have permission to update this category.",
      });
    }

    await category.$query().patch(req.body);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================================
 * Delete category
 * ============================================
 */
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.query().findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    if (category.user_id !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to delete this category.",
        });
    }

    await category.$query().delete();

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
