"use strict";

const tasks = [];

// Get DOM elements
const addTaskIcon = document.querySelector("#add-task-icon");
const addTaskInput = document.querySelector("#add-task-input");

// Set listeners to add animation to the add task icon
addTaskInput.addEventListener("focus", function () {
  addTaskIcon.classList.add("todo-list-section__icon--rotate");
});

addTaskInput.addEventListener("blur", function () {
  addTaskIcon.classList.remove("todo-list-section__icon--rotate");
});

// Set listeners to add a new task
addTaskIcon.addEventListener("click", addNewTask);

addTaskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewTask();
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

  const editIcon = document.createElement("img");
  editIcon.src = "./assets/icons/pencil-edit.svg";
  editIcon.alt = "Pencil edit icon";
  editIcon.classList.add("task-container__icon");

  actionGroup.append(trashIcon, editIcon);

  taskContainer.append(taskGroup, actionGroup);

  todoListSection.appendChild(taskContainer);
}