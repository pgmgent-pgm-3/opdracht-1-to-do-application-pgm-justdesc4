import Task from "../../models/Task.js";

/**
 * ============================================
 * Get all tasks
 * ============================================
 */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.query().where({ user_id: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================================
 * Get task by id
 * ============================================
 */
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.query().findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    if (task.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to view this task." });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================================
 * Create a new task
 * ============================================
 */
export const createTask = async (req, res) => {
  try {
    const task = await Task.query().insert({
      user_id: req.user.id,
      ...req.body,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================================
 * Update a task
 * ============================================
 */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.query().findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    if (task.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this task." });
    }

    const updatedTask = await Task.query().patchAndFetchById(id, req.body);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================================
 * Delete a task
 * ============================================
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.query().findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    if (task.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this task." });
    }

    await Task.query().deleteById(id);

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
