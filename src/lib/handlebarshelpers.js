export default {
  doneButton: function () {
    return `<button class="done">
      <img src="./images/v-icon.svg" alt="Done" />
      </button>`;
  },
  deleteButton: function () {
    return `<button class="delete">
      <img src="./images/delete-icon.svg" alt="Delete" />
      </button>`;
  },
  editButton: function () {
    return `<button class="edit">
      <img src="./images/edit-icon.svg" alt="Edit" />
      </button>`;
  },
  ifCategoryDefault: function (options, category) {
    if (category === "Default") {
      console.log(options.fn(this));
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
};
