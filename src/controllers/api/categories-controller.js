import Category from "../../models/Category.js";

/**
 * ============================================
 * Get all categories
 * ============================================
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.query();
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
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
