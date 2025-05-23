import { initialTasks } from "./initialData.js";

if (!localStorage.getItem("storedTasks")) {
  localStorage.setItem("storedTasks",JSON.stringify(initialTasks));
}

const storedTasks = JSON.parse(localStorage.getItem("storedTasks")) || [];
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

  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  modal.showModal();
}

/**
 * Sets up close behavior for any modal and its associated close button.
 * @param {string} modalId - The ID of the modal element.
 * @param {string} closeBtnId - The ID of the button that closes the modal.
 */
function setupModalCloseHandler(modalId,closeBtnId) {
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(closeBtnId);

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

/**
 * Initializes the task board and modal handlers.
 */
function initTaskBoard() {
  clearExistingTasks();
  renderTasks(storedTasks);
  setupModalCloseHandler("task-modal", "close-modal-btn");
  setupModalCloseHandler("new-task-modal", "new-close-modal-btn");
}

/*====================
    NEW
====================*/

const taskAddBtn = document.getElementById("task-add-btn");

taskAddBtn.addEventListener("click",() => {
  console.log('Yes');
  openNewTaskModal();
})

let nextTaskId = 6;

function openNewTaskModal() {
  const newModal = document.getElementById("new-task-modal");
  newModal.showModal()
}

function handleNewTaskSubmission () {

  const newTitleInput = document.getElementById("new-task-title");
  const newDescInput = document.getElementById("new-task-desc");
  const newStatusSelect = document.getElementById("new-task-status");

  // Add new task to array
  storedTasks.push(
    {
      id: nextTaskId++,
      title: newTitleInput.value,
      description: newDescInput.value,
      status: newStatusSelect.value
    }
  )

  // Save new into localStorage
  localStorage.setItem("storedTasks",JSON.stringify(storedTasks));

  // Close modal
  document.getElementById("new-task-modal").close();
  // Clear fields
  newTitleInput.value = "";
  newDescInput.value = "";
  newStatusSelect.value = "todo";

  // Rerender
  clearExistingTasks();
  renderTasks(storedTasks);
}

// Add new task by submitting
document.getElementById("new-task-form").addEventListener("submit",(event) => {
  event.preventDefault();
  handleNewTaskSubmission();
})

/*====================
====================*/

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", initTaskBoard); 