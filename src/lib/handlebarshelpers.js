export default {
  doneButton: () => {
    return `<button class="done">
      <img src="./images/v-icon.svg" alt="Done" />
      </button>`;
  },
  deleteButton: () => {
    return `<button class="delete">
      <img src="./images/delete-icon.svg" alt="Delete" />
      </button>`;
  },
  editButton: () => {
    return `<button class="edit">
      <img src="./images/edit-icon.svg" alt="Edit" />
      </button>`;
  },
  isCategoryDefault: (category) => {
    return category === "Default";
  },
  isCategoryHousehold: (category) => {
    return category === "Household";
  },
};
