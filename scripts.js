import { initialTasks } from "./initialData.js";

/**
 * Creates a single task DOM element.
 * @param {Object} task - Task data object.
 * @param {string} task.title - Title of the task.
 * @param {number} task.id - Unique task ID.
 * @param {string} task.status - Status column: 'todo', 'doing', or 'done'.
 * @returns {HTMLElement} The created task div element.
 */
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  return taskDiv;
}

/**
 * Finds the task container element based on task status.
 * @param {string} status - The task status ('todo', 'doing', or 'done').
 * @returns {HTMLElement|null} The container element, or null if not found.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clears all existing task-divs from all task containers.
 */
function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Renders all tasks from initial data to the UI.
 * Groups tasks by status and appends them to their respective columns.
 * @param {Array<Object>} tasks - Array of task objects.
 */
function renderTasks(tasks) {
  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}

/**
 * Opens the modal dialog with pre-filled task details.
 * @param {Object} task - The task object to display in the modal.
 */
function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  const modalHeading = document.querySelector(".modal-heading");
  modalHeading.textContent = "Add New Task";

  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  modal.showModal();
}

/**
 * Sets up modal close behavior.
 */
function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

/**
 * Initializes the task board and modal handlers.
 */
function initTaskBoard() {
  clearExistingTasks();
  renderTasks(initialTasks);
  setupModalCloseHandler();
}

/*====================
    NEW
====================*/

/**
 * Add new task
 */
function addNewTask() {
  const addNewTaskBtn = document.getElementById("task-add-btn");
  const modal = document.getElementById("task-modal");
  const modalHeading = document.querySelector(".modal-heading");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  let id = 6;
  
  // Open blank model
  addNewTaskBtn.addEventListener("click", () => {
    modalHeading.textContent = "Add New Task";

    titleInput.value = "";
    titleInput.setAttribute("placeholder","e.g. Take coffee break");
    descInput.value = "";
    descInput.setAttribute("placeholder","e.g. Pet your dog, have a cup of coffee, dance to your favorite song and come back to crush this challenge.")
    
    modal.showModal();
  })

  // Handle form submission

  const form = document.getElementById("task-form");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const newTitle = titleInput.value;
    const newDesc = descInput.value;
    const newStatus = statusSelect.value;
    
    initialTasks.push(
        {
            id: id++,
            title: newTitle,
            description: newDesc,
            status: newStatus,
        }
    )
    modal.close();

  })
}

addNewTask()

/*====================
====================*/

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", initTaskBoard); 