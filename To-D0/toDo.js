
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completeCounter = document.getElementById("complete-counter");
const uncompleteCounter = document.getElementById("uncomplete-counter");

function updateCounter() {
    const completeTasks = document.querySelectorAll("li.completed").length;
    const uncompleteTasks = document.querySelectorAll("li:not(.completed)").length;
    completeCounter.textContent = completeTasks;
    uncompleteCounter.textContent = uncompleteTasks;
}

document.getElementById("view").addEventListener("click", function () {
    const tasks = Array.from(document.querySelectorAll("#list-container li span"))
        .filter(span => !span.classList.contains("edit-btn") && !span.classList.contains("delete-btn"))
        .map(span => span.textContent.trim());
    if (tasks.length === 0) {
        alert("No tasks available.");
    } else {
        alert("Tasks:\n" + tasks.join("\n"));
    }
});

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";

    const checkbox = li.querySelector("input[type='checkbox']");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounter();
    });

    editBtn.addEventListener("click", function () {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null && update.trim() !== "") {
            taskSpan.textContent = update.trim();
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounter();
        }
    });

    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounter();
        }
    });

    updateCounter();
}
