"use strict";

const tasks = [
  "You can edit or delete a task by clicking on the icons. ➡️",
  "To add the new task, click on the ➕ icon or press 'Enter'. 🚀",
  "To add a new task, just click on the box above and type your new task. 📝",
  "Welcome! 🎉",
];

// Get DOM elements
const addTaskIcon = document.querySelector("#add-task-icon");
const addTaskInput = document.querySelector("#add-task-input");
const todoListSection = document.querySelector("#todo-list-section");

// Display default tasks
displayDefaultTasks();

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

function displayDefaultTasks() {
  tasks.forEach((taskDescription) => {
    displayTask(taskDescription);
  });
}

function addNewTask() {
  const taskDescription = addTaskInput.value.trim();
  addTaskInput.value = ""; // Clear the input

  if (taskDescription) {
    tasks.push(taskDescription);
    displayTask(taskDescription);
  } else {
    displayAlertMessage("⚠️ Please enter a description for the task.");
  }
}

function displayTask(taskDescription) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  const taskGroup = document.createElement("div");
  taskGroup.classList.add(
    "task-container__group",
    "task-container__group--left"
  );

  const radioIcon = document.createElement("img");
  radioIcon.src = "./assets/icons/radio-button-unchecked.svg";
  radioIcon.alt = "Radio button unchecked icon";
  radioIcon.classList.add("task-container__icon");
  radioIcon.addEventListener("click", () => {
    markTaskAsCompleted(
      radioIcon,
      taskContainer,
      taskDescriptionParagraph,
      actionGroup
    );
    taskContainer.removeChild(actionGroup);
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
    removeTask(
      taskDescription,
      radioIcon,
      taskContainer,
      taskDescriptionParagraph,
      actionGroup
    );
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

function markTaskAsCompleted(
  radioIcon,
  taskContainer,
  taskDescriptionParagraph,
  actionGroup
) {
  // Create a reference to the next sibling of current the task container to move it to the previous position if the undo option is clicked
  const nextSibling = taskContainer.nextElementSibling;
  displayAlertMessage(
    "🎉 Task completed!",
    nextSibling,
    radioIcon,
    taskContainer,
    taskDescriptionParagraph,
    actionGroup
  );

  radioIcon.src = "./assets/icons/check.svg";
  radioIcon.classList.add("normal-cursor");
  radioIcon.alt = "Check icon";
  taskDescriptionParagraph.classList.add(
    "task-container__task-description--line-through"
  );

  const completedTasksSection = document.querySelector(
    "#completed-tasks-section"
  );
  completedTasksSection.appendChild(taskContainer);

  /*
  const completedTaskDetails = document.querySelector(
    "#completed-tasks-details"
  );
  completedTaskDetails.open = true;
  */
}

function removeTask(
  taskDescription,
  radioIcon,
  taskContainer,
  taskDescriptionParagraph,
  actionGroup
) {
  const nextSibling = taskContainer.nextElementSibling;
  displayAlertMessage(
    "🗑️ Task removed",
    nextSibling,
    radioIcon,
    taskContainer,
    taskDescriptionParagraph,
    actionGroup
  );

  // Remove task from DOM
  todoListSection.removeChild(taskContainer);

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
  form.classList.add("task-container__edit-form");
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

// Display alert message with or without undo option
function displayAlertMessage(
  message,
  nextElementSibling,
  radioIcon,
  taskContainer,
  taskDescriptionParagraph,
  actionGroup
) {
  // Remove previous alert boxes
  const previousAlerts = document.querySelectorAll(".box-alert");
  previousAlerts.forEach((alert) => {
    alert.remove();
  });

  // Create alert box for HTML
  const alertBox = document.createElement("div");
  alertBox.classList.add("box-alert");

  const alertMessage = document.createElement("p");
  alertMessage.classList.add("box-alert__message");
  alertMessage.textContent = message;

  alertBox.appendChild(alertMessage);
  document.body.appendChild(alertBox);

  // Undo option
  const undoOption = document.createElement("p");
  undoOption.classList.add("box-alert__message", "box-alert__message--undo");
  undoOption.textContent = "Undo";

  undoOption.addEventListener("click", () => {
    alertBox.remove();
    radioIcon.src = "./assets/icons/radio-button-unchecked.svg";
    radioIcon.classList.remove("normal-cursor");
    taskDescriptionParagraph.classList.remove(
      "task-container__task-description--line-through"
    );
    radioIcon.alt = "Radio button unchecked icon";
    taskContainer.appendChild(actionGroup);
    todoListSection.insertBefore(taskContainer, nextElementSibling);
  });

  if (message === "🎉 Task completed!" || message === "🗑️ Task removed")
    alertBox.appendChild(undoOption);

  setTimeout(() => {
    alertBox.remove();
  }, 5000);
}
