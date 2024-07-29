"use strict";

const tasks = [];

// Get DOM elements
const addTaskIcon = document.querySelector("#add-task-icon");
const addTaskInput = document.querySelector("#add-task-input");

// Set listeners to add animation to the add task icon
addTaskInput.addEventListener("focus", () => {
  addTaskIcon.classList.add("todo-list-section__icon--rotate");
});

addTaskInput.addEventListener("blur", () => {
  addTaskIcon.classList.remove("todo-list-section__icon--rotate");
});

// Set listeners to add a new task
addTaskIcon.addEventListener("click", addNewTask);

addTaskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewTask();
    addTaskInput.blur(); // Remove focus the input
  }
});

function addNewTask() {
  const taskDescription = addTaskInput.value.trim();

  if (taskDescription) {
    tasks.push(taskDescription);
    displayTask(taskDescription);
  } else {
    addTaskInput.value = "";
    alert("Please enter a task!");
  }
}

function displayTask(taskDescription) {
  // Clear the task input
  addTaskInput.value = "";

  const todoListSection = document.querySelector("#todo-list-section");

  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  const taskGroup = document.createElement("div");
  taskGroup.classList.add("task-container__group");

  const radioIcon = document.createElement("img");
  radioIcon.src = "./assets/icons/radio-button-unchecked.svg";
  radioIcon.alt = "Radio button unchecked icon";
  radioIcon.classList.add("task-container__icon");
  radioIcon.addEventListener("click", () => {
    taskContainer.removeChild(actionGroup);
    markTaskAsCompleted(radioIcon, taskContainer, taskDescriptionParagraph);
  });

  const taskDescriptionParagraph = document.createElement("p");
  taskDescriptionParagraph.classList.add("task-container__task-description");
  taskDescriptionParagraph.textContent = taskDescription;

  taskGroup.append(radioIcon, taskDescriptionParagraph);

  const actionGroup = document.createElement("div");
  actionGroup.classList.add("task-container__group");

  const trashIcon = document.createElement("img");
  trashIcon.setAttribute("id", "delete-task-icon");
  trashIcon.src = "./assets/icons/trash.svg";
  trashIcon.alt = "Trash icon";
  trashIcon.classList.add("task-container__icon");
  trashIcon.addEventListener("click", () => {
    removeTask(taskDescription, taskContainer);
  });

  const editIcon = document.createElement("img");
  editIcon.src = "./assets/icons/pencil-edit.svg";
  editIcon.alt = "Pencil edit icon";
  editIcon.classList.add("task-container__icon");
  editIcon.addEventListener("click", () => {
    editTask(taskDescriptionParagraph);
  });

  actionGroup.append(trashIcon, editIcon);

  taskContainer.append(taskGroup, actionGroup);

  todoListSection.appendChild(taskContainer);
}

function removeTask(taskDescription, taskContainer) {
  // Remove task from DOM
  taskContainer.classList.add("inactive");

  // Remove task from array
  tasks.find((task, index) => {
    if (task === taskDescription) {
      tasks.splice(index, 1);
    }
  });
}

function editTask(taskDescriptionParagraph) {
  const currentText = taskDescriptionParagraph.textContent;
  const form = document.createElement("form");
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentText;
  editInput.classList.add("task-container__edit-input");
  form.append(editInput);

  taskDescriptionParagraph.replaceWith(form);
  editInput.focus();

  editInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveTaskEdit(form, editInput, taskDescriptionParagraph);
    }
  });
}

function saveTaskEdit(form, input, taskDescriptionParagraph) {
  const editedTask = input.value.trim();
  if (editedTask) {
    taskDescriptionParagraph.textContent = editedTask;
  }
  form.replaceWith(taskDescriptionParagraph);
}

function markTaskAsCompleted(radioIcon, taskContainer, taskDescriptionParagraph) {
  radioIcon.src = "./assets/icons/check.svg";
  taskDescriptionParagraph.classList.add("task-container__task-description--line-through");

  const completedTasksSection = document.querySelector("#completed-tasks-section");
  completedTasksSection.appendChild(taskContainer);

  const completedTaskDetails = document.querySelector("#completed-tasks-details");
  completedTaskDetails.open = true;
}
