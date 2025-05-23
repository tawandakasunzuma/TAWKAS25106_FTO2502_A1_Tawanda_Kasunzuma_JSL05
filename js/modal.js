import { clearExistingTasks, renderTasks } from "./render.js";
import { saveTasks } from "./storage.js";

export let storedTasks = [];
let nextTaskId = 6;

export function setTasks(tasks) {
  storedTasks = tasks;
}

/**
 * Opens the modal dialog with pre-filled task details.
 * @param {Object} task - The task object to display in the modal.
 */

export function openTaskModal(task) {
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
 * Opens the modal for creating a new task
 */

export function openNewTaskModal() {
  const newModal = document.getElementById("new-task-modal");
  newModal.showModal()
}

/**
 * Sets up close behavior for any modal and its associated close button.
 * @param {string} modalId - The ID of the modal element.
 * @param {string} closeBtnId - The ID of the button that closes the modal.
 */

export function setupModalCloseHandler(modalId,closeBtnId) {
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(closeBtnId);

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

/**
 * Handles new task form submission
 * Updates the UI and adds the new task to localStorage
 */

export function handleNewTaskSubmission () {

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
  
  // Reset fields
  newTitleInput.value = "";
  newDescInput.value = "";
  newStatusSelect.value = "todo";

  // Rerender
  clearExistingTasks();
  renderTasks(storedTasks);
}