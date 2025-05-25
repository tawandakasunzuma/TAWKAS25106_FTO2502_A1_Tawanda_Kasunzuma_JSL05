import { loadTasks } from "./storage.js";
import { renderTasks, clearExistingTasks } from "./render.js";
import {
  openNewTaskModal,
  setupModalCloseHandler,
  handleNewTaskSubmission,
  setTasks
} from "./modal.js";

// Run after the whole page is loaded
document.addEventListener("DOMContentLoaded", () => {

  // Get tasks from localStorage or use default tasks if none exists
  const tasks = loadTasks();

  // Save tasks into shared place so other parts of app can use them 
  setTasks(tasks);

  // Clear old tasks that may be showing
  clearExistingTasks();

  // Render all tasks on the board and place them, in the correct container
  renderTasks(tasks);

  // Enable the close buttons on both modals
  setupModalCloseHandler("task-modal", "close-modal-btn");
  setupModalCloseHandler("new-task-modal", "new-close-modal-btn");

  // Open new task modal when '+ Add New Task' button is clicked
  document.getElementById("task-add-btn").addEventListener("click", openNewTaskModal);

  // Handle add new task form submission
  document.getElementById("new-task-form").addEventListener("submit", event => {
    
    // Prevent page from refreshing on submission
    event.preventDefault();
    // Handle logic for adding a new task
    handleNewTaskSubmission();
  });
});