document.getElementById('routine-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskInput = document.getElementById('task');
    const dateInput = document.getElementById('date');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');

    const task = taskInput.value;
    const date = dateInput.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    addTaskToList(task, date, startTime, endTime);
    saveTask(task, date, startTime, endTime);

    taskInput.value = '';
    dateInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';
});

document.addEventListener('DOMContentLoaded', loadTasks);

function addTaskToList(task, date, startTime, endTime) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${date} - ${startTime} to ${endTime} - ${task}</span>
        <input type="checkbox" onchange="completeTask(this)">
        <button onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(li);
}

function removeTask(button) {
    const li = button.parentElement;
    li.remove();
    removeTaskFromStorage(li);
}

function completeTask(checkbox) {
    const taskSpan = checkbox.previousElementSibling;
    taskSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
}

function saveTask(task, date, startTime, endTime) {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks.push({ task, date, startTime, endTime });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks.forEach(({ task, date, startTime, endTime }) => addTaskToList(task, date, startTime, endTime));
}

function removeTaskFromStorage(li) {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    const taskText = li.querySelector('span').textContent;
    const filteredTasks = tasks.filter(t => `${t.date} - ${t.startTime} to ${t.endTime} - ${t.task}` !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}