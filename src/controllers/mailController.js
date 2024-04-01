import User from "../models/User.js";
import Category from "../models/Category.js";
import Task from "../models/Task.js";
import mailTransport from "../lib/mailtransporter.js";

/**
 * ============================================
 * Send mail with tasks
 * ============================================
 */
export const sendTasksMail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.query().findById(req.user.id);
    const category = await Category.query().findById(req.params.categoryId);
    let tasks = [];
    if (req.params.categoryId === "1") {
      tasks = await Task.query().where({ user_id: req.user.id });
    } else {
      tasks = await Task.query().where({
        user_id: req.user.id,
        category_id: req.params.categoryId,
      });
    }

    await mailTransport.sendMail({
      from: "noreply@justdoit.be",
      to: email,
      subject: "Your tasks from Just Do It!",
      template: "default",
      context: {
        title: "Your tasks from " + category.category + " category.",
        message: `Hello, <br>
                  <br>Here are the tasks you have requested: <br>
                  <br>${tasks.map((task) => `- ${task.task}`).join("<br>")} <br>
                  <br>Have a nice day!`,
      },
    });

    res.redirect(`/${category.link}?msg=Mail has been sent!`);
  } catch (error) {
    console.error(error);
    res.redirect(`/${category.link}?msg=Error sending mail!`);
  }
};
