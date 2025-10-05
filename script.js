// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false => don't save again
    }

    // Add a task to the DOM and optionally save to Local Storage
    // If taskText is null, the function reads from the input field
    function addTask(taskText = null, save = true) {
        // Determine text: either passed-in value (when loading) or input field value
        const text = (taskText !== null) ? taskText.trim() : taskInput.value.trim();

        // If the text is empty and this call came from the UI, prompt the user
        if (text === "") {
            if (taskText === null) { // only alert when user attempted to add (not when loading)
                alert("Please enter a task.");
            }
            return;
        }

        // Create list item
        const li = document.createElement('li');

        // Create text node (keeps text separate from button)
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove button handler: remove from DOM and update Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(li);

            // Update local storage: remove first matching instance
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(text);
            if (index > -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Append button and item to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);
        // classList.add

        // Save to Local Storage if requested
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input if the task was added from the input field
        if (taskText === null) {
            taskInput.value = '';
        }
    }

    // Event listeners
    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial load
    loadTasks();
});
