export default {
  doneButton: (taskId) => {
    return `<form method="POST" action="/tasks/{{@root.categoryId}}/${taskId}">
    <input type="hidden" name="method" value="PUT">
    <input type="hidden" name="done" value="true">
      <button type="submit" class="done">
        <img src="./images/v-icon.svg" alt="Done" />
      </button>
    </form>`;
  },
  deleteButton: (taskId) => {
    return `<form method="POST" action="/tasks/{{@root.categoryId}}/${taskId}">
      <input type="hidden" name="method" value="DELETE">
      <button type="submit" class="delete">
        <img src="./images/delete-icon.svg" alt="Delete" />
      </button>
    </form>`;
  },
  editButton: () => {
    return `
      <button type="submit" class="edit">
        <img src="/images/edit-icon.svg" alt="Edit" />
      </button>`;
  },
  eq: (a, b) => {
    return a === b;
  },
};
