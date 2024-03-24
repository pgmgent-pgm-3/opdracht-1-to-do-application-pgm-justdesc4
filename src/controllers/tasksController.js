import Task from "../models/Task.js";
import Category from "../models/Category.js";
import { validationResult } from "express-validator";

/**
 * ============================================
 * Get all tasks
 * ============================================
 */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.query();
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
    const task = await Task.query().findById(id).withGraphFetched("category");
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
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
export const createTask = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.formErrorFields = {};
    errors.array().forEach((error) => {
      req.formErrorFields[error.path] = error.msg;
    });

    req.flash = {
      type: "danger",
      message: errors
        .array()
        .map((error) => error.msg)
        .join(", "),
    };

    return next();
  }

  try {
    const categoryId = req.body.category_id || req.params.categoryId;
    const taskData = { category_id: categoryId, done: false, ...req.body };

    await Task.query().insert(taskData);
  } catch (error) {
    console.log(error);
  }

  req.flash = {
    type: "success",
    message: "The task has been created successfully!",
  };

  req.body = {};

  return next();
};

/**
 * ============================================
 * Update a task
 * ============================================
 */
export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { done, task: taskDescription } = req.body;

  const category = await Category.query().findById(
    parseInt(req.params.categoryId)
  );
  if (category) {
    const redirectLink = category.link;
  }

  try {
    const task = await Task.query().findById(taskId);

    if (!task) {
      return res.redirect(
        `/${redirectLink}?msg=Sorry we can't find the task. Please try again!`
      );
    }

    // Set task done
    if (done !== undefined) {
      task.done = done;

      try {
        await task.$query().patch();
        return res.redirect(
          `/${redirectLink}?msg=The task has been updated succesfully!`
        );
      } catch (error) {
        return res.redirect(
          `/${redirectLink}?msg=Sorry, the task could not be updated! Please try again.`
        );
      }
    }

    // Update task description
    if (taskDescription !== undefined) {
      task.task = taskDescription;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach((error) => {
          req.formErrorFields[error.path] = error.msg;
        });

        req.flash = {
          type: "danger",
          message: errors
            .array()
            .map((error) => error.msg)
            .join(", "),
        };

        return res.render("editTask", { task, flash: req.flash });
      }

      try {
        await task.$query().patch();
        return res.redirect("/?msg=The task has been updated succesfully!");
      } catch (error) {
        console.log(error);
      }
    }
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
  const id = req.params.taskId;

  const category = await Category.query().findById(
    parseInt(req.params.categoryId)
  );
  if (category) {
    const redirectLink = category.link;
  }

  try {
    const task = await Task.query().findById(id);
    if (!task) {
      return res.redirect(
        `/${redirectLink}?msg=Sorry we can't find the task. Please try again!`
      );
    }

    await Task.query().deleteById(id);

    return res.redirect(
      `/${redirectLink}?msg=The task has been deleted successfully!`
    );
  } catch (error) {
    return res.redirect(
      `/${redirectLink}?msg=There was a problem while deleting the task. Please try again!`
    );
  }
};

/**
 * ============================================
 * Handle the tasks form
 * ============================================
 */
export const handlePostTasks = async (req, res, next) => {
  const method = req.body.method;

  switch (method) {
    case "DELETE":
      await deleteTask(req, res);
      break;
    case "PUT":
      await updateTask(req, res);
      break;
    default:
      await createTask(req, res, next);
      break;
  }
};
