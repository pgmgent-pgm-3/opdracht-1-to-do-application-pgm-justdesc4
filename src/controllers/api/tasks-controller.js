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
    const categoryId = req.params.categoryId;
    const taskData = { category_id: categoryId, done: false, ...req.body };
    await Task.query().insert(taskData);
    res.redirect("back");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { done, task: taskDescription } = req.body;
  try {
    const task = await Task.query().findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    if (done !== undefined) {
      task.done = done;
    }
    if (taskDescription !== undefined) {
      task.task = taskDescription;
      await task.$query().patch();
      // i want an "alert("Updated succesfully!")" message here but it's impossible in server side ??? :/
      return res.redirect("/");
    }
    await task.$query().patch();
    res.redirect("back");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.taskId;
    const task = await Task.query().findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    await Task.query().deleteById(id);
    res.redirect("back");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handlePostTasks = async (req, res) => {
  const method = req.body.method;

  switch (method) {
    case "DELETE":
      await deleteTask(req, res);
      break;
    case "PUT":
      await updateTask(req, res);
      break;
    default:
      await createTask(req, res);
      break;
  }
};
