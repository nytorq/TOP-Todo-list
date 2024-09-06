import {textCreator, imageCreator, buttonCreator, fieldCreator, idCounter, idCreator, spaceCharRemover} from "./tools.js";
import {addTask, addProject, removeProject, loadFromLocalStorage} from "./logic.js"


const createTask = function(event) {
    event.preventDefault();
    

    // Creating new Task object and adding it to project
    console.log(taskDescription.value)
    let taskData = addTask(taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value);

    // Creating new task in the UI
    const container = document.createElement('div');
    container.classList.add('taskContainer');
    const taskDetails = document.createElement('div');
    taskDetails.classList.add('taskDetails');
    taskDetailsCreator(taskDetails, taskData);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const moreButton = document.createElement('span');
    moreButton.classList.add('material-symbols-outlined');
    moreButton.innerText = "more_horiz";
    container.appendChild(checkbox);
    container.appendChild(taskDetails);
    container.appendChild(moreButton);
    tasks.appendChild(container);
    // console.dir(currentUser.projects[0].tasks[0])
    
    // Clearing out inputs
    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
}

const addProjectFromUI = function() {
    let projectName = document.getElementById('projectName');
    if (projectName.value) {
        addProject(projectName.value);
        createTaskBoard(projectName.value)
        projectName.value = '';
    }
}

const clearUI = function() {
    let body = document.querySelector('body');
    body.innerHTML = '';
}

const removeProjectFromUI = function(project) {
    if (confirm(`Are you sure you want to delete this project, "${project}"?`)) {
        removeProject(project);
        clearUI();
        renderUI();
    }
}

const createTaskBoard = function(projectName) {
    let body = document.querySelector('body');
    let projectWithNoSpaces = spaceCharRemover(projectName);

    // Creating the task board 
    const taskBoard = document.createElement('div');
    taskBoard.classList.add('taskBoard', `${projectWithNoSpaces}`);
    body.appendChild(taskBoard);
    let taskBoardHeader = textCreator('h2', projectName);
    taskBoard.appendChild(taskBoardHeader);
    // Creating the task board's icon button for removing projects
    const iconButton = document.createElement('span');
    iconButton.innerText = 'close';
    iconButton.classList.add('material-symbols-outlined', 'removeProject', projectName);
    taskBoard.appendChild(iconButton);
    iconButton.addEventListener('click', ()=> removeProjectFromUI(projectName))
    // Creating the task board's container for showcasing tasks
    let tasks = document.createElement('div');
    tasks.classList.add(`tasks-${projectWithNoSpaces}`)
    taskBoard.appendChild(tasks)
    // Creating task board's task form
    let newTaskForm = document.createElement('form');
    const taskTitleField = fieldCreator('input','Task', 'taskTitle-input');
    taskTitleField.classList.add(`${projectWithNoSpaces}`);
    newTaskForm.appendChild(taskTitleField);
    const taskDescField = fieldCreator('input','Description', 'taskDescription-input');
    taskDescField.classList.add(`${projectWithNoSpaces}`);
    newTaskForm.appendChild(taskDescField);
    const taskDueDateField = fieldCreator('date','Due Date', 'taskDueDate-input');
    taskDueDateField.classList.add(`${projectWithNoSpaces}`);
    newTaskForm.appendChild(taskDueDateField);
    const taskPriorityField = fieldCreator('select', 'Priority', 'taskPriority-input');
    taskPriorityField.classList.add(`${projectWithNoSpaces}`);
    newTaskForm.appendChild(taskPriorityField);
    const newTaskButton = buttonCreator('Create Task')
    newTaskButton.classList.add(`${projectWithNoSpaces}`);
    newTaskForm.appendChild(newTaskButton);
    newTaskButton.addEventListener('click', createTask);
    taskBoard.appendChild(newTaskForm)
}

const renderUI = function() {
    // Creating page UI
    const body = document.querySelector('body');
    const header = textCreator('h1', 'MasterTasker');
    const newProjectButton = buttonCreator('Create Project','newProjectButton');
    body.appendChild(header);
    const projectNameInput = fieldCreator('text', 'Project Name', 'projectName');
    body.appendChild(projectNameInput);
    body.appendChild(newProjectButton);
    newProjectButton.addEventListener('click', addProjectFromUI);

    // Creating task boards for each project
    let parsedAppData = loadFromLocalStorage();
    for (let i = 0 ; i < parsedAppData.projects.length ; i++) {
        createTaskBoard(parsedAppData.projects[i].name);
    }
}

renderUI();

const taskDetailsCreator = function(container, taskData) {
    const taskTitleField = fieldCreator('input','Task', 'taskTitle');
    container.appendChild(taskTitleField);
    const taskDescField = fieldCreator('input','Description', 'taskDescription');
    container.appendChild(taskDescField);
    const taskDueDateField = fieldCreator('date','Due Date', 'taskDueDate');
    container.appendChild(taskDueDateField);
    const taskPriorityField = fieldCreator('select', 'Priority', 'taskPriority');
    container.appendChild(taskPriorityField);
    
    if (taskData) {
        let input = taskTitleField.querySelector('input');
        input.value = taskData.title;
        input = taskDescField.querySelector('input');
        input.value = taskData.desc;
        input = taskDueDateField.querySelector('input');
        input.value = taskData.dueDate;
        input = taskPriorityField.querySelector('select');
        input.value = taskData.priority;
    }
}


// let taskTitle = document.getElementById('taskTitle-main');
// let taskDescription = document.getElementById('taskDescription-main');
// let taskDueDate = document.getElementById('taskDueDate-main');
// let taskPriority = document.getElementById('taskPriority-main');

export {};