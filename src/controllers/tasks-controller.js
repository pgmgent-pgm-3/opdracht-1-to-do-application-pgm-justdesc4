import Task from "../models/Task.js";

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
    const categoryId = req.body.category_id || req.params.categoryId;
    const taskData = { category_id: categoryId, done: false, ...req.body };

    await Task.query().insert(taskData);
    res.redirect("back");
  } catch (error) {
    const url = new URL(req.headers.referer);
    url.searchParams.set(
      "msg",
      "Sorry, the task could not be added! Please try again."
    );
    return res.redirect(url.toString());
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { done, task: taskDescription } = req.body;
  const url = new URL(req.headers.referer);
  try {
    const task = await Task.query().findById(taskId);
    if (!task) {
      url.searchParams.set(
        "msg",
        "Sorry we can't find the task. Please try again!"
      );
      return res.redirect(url.toString());
    }
    if (done !== undefined) {
      task.done = done;

      try {
        await task.$query().patch();
        url.searchParams.set("msg", "The task has been updated succesfully!");
        return res.redirect(url.toString());
      } catch (error) {
        url.searchParams.set(
          "msg",
          "Sorry, the task could not be updated! Please try again."
        );
        return res.redirect(url.toString());
      }
    }
    if (taskDescription !== undefined) {
      task.task = taskDescription;

      try {
        await task.$query().patch();
        return res.redirect("/?msg=The task has been updated succesfully!");
      } catch (error) {
        return res.redirect(
          "/?msg=Sorry, the task could not be updated! Please try again."
        );
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.taskId;
    const task = await Task.query().findById(id);
    const url = new URL(req.headers.referer);
    if (!task) {
      url.searchParams.set(
        "msg",
        "Sorry we can't find the task. Please try again!"
      );
      return res.redirect(url.toString());
    }
    await Task.query().deleteById(id);
    url.searchParams.set("msg", "The task has been deleted successfully!");
    return res.redirect(url.toString());
  } catch (error) {
    url.searchParams.set(
      "msg",
      "There was a problem while deleting the task. Please try again!"
    );
    return res.redirect(url.toString());
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
