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
  isCategoryDefault: function (category) {
    return category === "Default";
  },
};
