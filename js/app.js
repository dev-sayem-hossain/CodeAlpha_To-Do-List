document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const submitBtn = form.querySelector("button[type=submit]");

  let tasks = [];
  let isEditing = false;
  let currentEditIndex = null;

  const createTaskElement = (taskText, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const textSpan = document.createElement("span");
    textSpan.textContent = taskText;

    const actionContainer = document.createElement("div");
    actionContainer.className = "task-actions";

    const editButton = document.createElement("button");
    editButton.title = "Edit";
    editButton.innerHTML = `<span class="iconify" data-icon="mdi:pencil" data-width="20" data-height="20"></span>`;
    editButton.addEventListener("click", () => handleEdit(index));

    const deleteButton = document.createElement("button");
    deleteButton.title = "Delete";
    deleteButton.innerHTML = `<span class="iconify" data-icon="mdi:delete" data-width="20" data-height="20"></span>`;
    deleteButton.addEventListener("click", () => handleDelete(index));

    actionContainer.append(editButton, deleteButton);
    li.append(textSpan, actionContainer);

    return li;
  };

  const renderTaskList = () => {
    taskList.innerHTML = "";
    tasks.forEach((taskText, index) => {
      const taskItem = createTaskElement(taskText, index);
      taskList.appendChild(taskItem);
    });
  };

  const resetForm = () => {
    input.value = "";
    submitBtn.textContent = "Add";
    isEditing = false;
    currentEditIndex = null;
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (!taskText) return;

    if (isEditing) {
      tasks[currentEditIndex] = taskText;
    } else {
      tasks.unshift(taskText);
    }

    resetForm();
    renderTaskList();
  };

  const handleEdit = (index) => {
    input.value = tasks[index];
    submitBtn.textContent = "Update";
    isEditing = true;
    currentEditIndex = index;
    input.focus();
  };

  const handleDelete = (index) => {
    tasks.splice(index, 1);
    renderTaskList();

    // If currently editing the deleted task, reset the form
    if (isEditing && currentEditIndex === index) {
      resetForm();
    } else if (isEditing && currentEditIndex > index) {
      // Adjust index if a task above current edit is deleted
      currentEditIndex--;
    }
  };

  form.addEventListener("submit", handleAddTask);
  renderTaskList();
});
