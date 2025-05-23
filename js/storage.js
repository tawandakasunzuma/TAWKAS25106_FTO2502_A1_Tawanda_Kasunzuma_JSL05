import { initialTasks } from "./initialData.js";

/**
 * Loads tasks from localStorage or sets initial tasks if no localStorage exist
 * @returns {Array<Object>} Array of task objects
 */

export function loadTasks() {
  if (!localStorage.getItem("storedTasks")) {
    localStorage.setItem("storedTasks", JSON.stringify(initialTasks));
  }
  return JSON.parse(localStorage.getItem("storedTasks")) || [];
}

/**
 * Saves tasks to localStorage
 * @param {Array<Object>} tasks
 */

export function saveTasks(tasks) {
  localStorage.setItem("storedTasks", JSON.stringify(tasks));
}