document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    
    document.getElementById('task').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    addTask();
    }
    });
    
    // Add event listeners for filter buttons
    document.getElementById('showAll').addEventListener('click', function () {
    showAllTasks();
    });
    
    document.getElementById('showActive').addEventListener('click', function () {
    showActiveTasks();
    });
    
    document.getElementById('showCompleted').addEventListener('click', function () {
    showCompletedTasks();
    });
    
    document.getElementById('showDeleted').addEventListener('click', function () {
    showDeletedTasks();
    });
    });
    
    function loadTasks() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
    document.getElementById('taskList').innerHTML = tasks;
    // reapply "task" style to tasks loaded
    }
    }
    
    function saveTasks() {
    let tasks = document.getElementById('taskList').innerHTML;
    localStorage.setItem('tasks', tasks);
    }
    
    function addTask() {
    let taskInput = document.getElementById('task');
    let taskList = document.getElementById('taskList');
    
    if (taskInput.value.trim() === '') { return; }
    
    let taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerHTML = `
    <span style="flex-grow: 1;">${taskInput.value}</span>
    
    <i class="check" onclick="completeTask(this)";>
    <img src="https://cdn-icons-png.flaticon.com/128/4315/4315445.png"/>
    </i>

    <i class="trash" onclick="deleteTask(this)" marginLeft = "auto">
    <img src="https://cdn-icons-png.flaticon.com/128/484/484662.png"/>
    </i>
    `;
    
    taskList.appendChild(taskDiv);
    taskInput.value = '';
    saveTasks();
    }
    
    function clearAll() {
        let taskInput = document.getElementById('task');
        // let taskList = document.getElementById('taskList');
        taskInput.value = '';
    }

    function completeTask(button) {
    let task = button.parentNode;
    task.classList.toggle('completed');
    saveTasks();
    }
    
    function deleteTask(trashIcon) {
    let task = trashIcon.parentNode;
    // task.remove();
    task.style.display = 'none';
    task.classList.toggle('deleted');
    saveTasks();
    }
    
    function showAllTasks() {
    let tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
    task.style.display = 'flex';
    });
    let deletedTasks = document.querySelectorAll('.task.deleted');
    deletedTasks.forEach(task => {
    task.style.display = 'none';
    });
    }
    
    function showActiveTasks() {
    showAllTasks();
    let completedTasks = document.querySelectorAll('.task.completed');
    completedTasks.forEach(task => {
    task.style.display = 'none';
    });
    let activeTasks = document.querySelectorAll('.task:not(.completed)');
    activeTasks.forEach(task => {
    task.style.display = 'flex';
    });
    let deletedTasks = document.querySelectorAll('.task.deleted');
    deletedTasks.forEach(task => {
    task.style.display = 'none';
    });
    }
    
    function showCompletedTasks() {
    showAllTasks();
    let activeTasks = document.querySelectorAll('.task:not(.completed)');
    activeTasks.forEach(task => {
    task.style.display = 'none';
    });
    let completedTasks = document.querySelectorAll('.task.completed');
    completedTasks.forEach(task => {
    task.style.display = 'flex';
    });
    let deletedTasks = document.querySelectorAll('.task.deleted');
    deletedTasks.forEach(task => {
    task.style.display = 'none';
    });
    }
    
    function showDeletedTasks() {
    showAllTasks();
    let completedTasks = document.querySelectorAll('.task:not(.deleted)');
    completedTasks.forEach(task => {
    task.style.display = 'none';
    });
    let deletedTasks = document.querySelectorAll('.task.deleted');
    deletedTasks.forEach(task => {
    task.style.display = 'flex';
    });
    }
    
    