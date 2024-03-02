import Task from "../../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.query();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.query().findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await Task.query().insert(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.query().findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    const updatedTask = await Task.query().patchAndFetchById(id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.query().findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    await Task.query().deleteById(id);
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
