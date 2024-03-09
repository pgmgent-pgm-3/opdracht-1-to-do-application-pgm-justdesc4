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
    const task = await Task.query().findById(id).withGraphFetched("category");
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
    const taskData = { ...req.body, done: false };
    const task = await Task.query().insert(taskData);
    res.redirect("back");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { done, deleted } = req.body;
  try {
    const task = await Task.query().findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    task.done = done;
    task.deleted = deleted;
    await task.$query().patch();
    res.status(200).json(task);
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

export const handlePostTasks = async (req, res) => {
  const method = req.body.method;

  switch (method) {
    case "delete":
      await deleteTask(req, res);
      break;
    case "update":
      await updateTask(req, res);
      break;
    default:
      await createTask(req, res);
      break;
  }
};
