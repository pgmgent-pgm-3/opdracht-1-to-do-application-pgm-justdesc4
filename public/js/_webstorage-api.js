(() => {
  const $form = document.getElementById("form");
  const $tasks = document.getElementById("tasks");

  // RENDER HTML

  function getTasks() {
    const tasks = localStorage.getItem("tasks");
    if (!tasks) return [];
    return tasks.split(",");
  }

  function getHTMLForTasks() {
    const tasks = getTasks();
    if (tasks.length === 0) return "";

    let html = "";

    tasks.forEach((task) => {
      html += `
        <article class="task">
            <button class="done">
                <img src="./images/v-icon.svg" alt="V icon">
            </button>
                <div class="task__text">
                    <p>
                        ${task}
                    </p>
                </div>
            <button class="delete">
                <img src="./images/delete-icon.svg" alt="Delete icon">
            </button>
            <button class="edit">
                <img src="./images/edit-icon.svg" alt="Edit icon">
            </button>
        </article>`;
    });

    return html;
  }

  // BUILD UI

  function buildUI() {
    $tasks.innerHTML = getHTMLForTasks();
  }

  // REGISTER LISTENERS

  function registerListeners() {
    // ADD Task
    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      const $formInput = document.querySelector("input").value;
      const tasks = getTasks();
      tasks.push($formInput);
      localStorage.setItem("tasks", tasks.join(","));
      buildUI();

      // REMOVE task

      // EDIT task

      // DONE task
    });
  }

  // INITIALIZE

  function initialize() {
    buildUI();
    registerListeners();
  }

  initialize();
})();
