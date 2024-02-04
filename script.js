var tasks = [];

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var task = { description: taskInput.value, selected: false };
        tasks.push(task);

        var li = document.createElement("li");
        
        // Checkbox
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
            task.selected = checkbox.checked;
        });

        // Task description
        var taskDescription = document.createElement("span");
        taskDescription.textContent = task.description;

        // Delete button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            taskList.removeChild(li);
            removeTask(task);
        };

        // Append elements to li
        li.appendChild(checkbox);
        li.appendChild(taskDescription);
        li.appendChild(deleteButton);
        
        taskList.appendChild(li);

        taskInput.value = "";
    }
}

function removeTask(task) {
    var index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
}

function exportToExcel() {
    var selectedTasks = tasks.filter(task => task.selected);

    if (selectedTasks.length === 0) {
        alert("No tasks selected for export.");
        return;
    }

    var ws = XLSX.utils.json_to_sheet(selectedTasks);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Selected Tasks");
    XLSX.writeFile(wb, "selected-tasks.xlsx");
}
