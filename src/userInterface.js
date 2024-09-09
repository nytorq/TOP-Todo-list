import {textCreator, imageCreator, buttonCreator, fieldCreator, generateID, spaceCharRemover} from "./tools.js";
import {addTask, addProject, removeProject, loadFromLocalStorage} from "./logic.js"


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

const createTaskRow = function(taskData, container) {
    const taskRow = document.createElement('div');
    taskRow.classList.add('taskRow');
    taskRow.setAttribute('data-task-id', taskData.id);
    const taskDetails = document.createElement('div');
    taskDetails.classList.add('taskDetails');
    taskDetailsCreator(taskDetails, taskData);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const moreButton = document.createElement('span');
    moreButton.classList.add('material-symbols-outlined', 'removeTask');
    moreButton.innerText = "delete";
    taskRow.appendChild(checkbox);
    taskRow.appendChild(taskDetails);
    taskRow.appendChild(moreButton);
    container.appendChild(taskRow);
}

const createTaskFromUI = function(event) {
    event.preventDefault();
    // Creating new Task object and adding it to project
    let projectName = event.target.classList.value;
    let form = document.querySelector(`form.${projectName}`)
    let tasksContainer = document.querySelector(`.tasks-${projectName}`);
    let taskTitle = form.querySelector(`#taskTitle-input-${projectName}`);
    let taskDescription = form.querySelector(`#taskDescription-input-${projectName}`);
    let taskDueDate = form.querySelector(`#taskDueDate-input-${projectName}`);
    let taskPriority = form.querySelector(`#taskPriority-input-${projectName}`);
    let taskData = addTask(projectName, taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value);
    // taskDetailsCreator(taskContainer, taskData);
    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
    taskPriority.value = 'Low';

    // // Creating new task in the UI
    createTaskRow(taskData, tasksContainer);
    
    
    // // Clearing out inputs
    // taskTitle.value = '';
    // taskDescription.value = '';
    // taskDueDate.value = '';
}

const addProjectFromUI = function() {
    let projectName = document.getElementById('projectName');
    if (projectName.value) {
        let newProject = addProject(projectName.value);
        createTaskBoard(projectName.value, newProject.id)
        projectName.value = '';
    }
}

const createTaskBoard = function(projectName, projectID) {
    let body = document.querySelector('body');
    let projectWithNoSpaces = spaceCharRemover(projectName);

    // Creating the task board 
    const taskBoard = document.createElement('div');
    taskBoard.classList.add('taskBoard', `${projectWithNoSpaces}`);
    taskBoard.setAttribute('data-proj-id', projectID)
    body.appendChild(taskBoard);
    let taskBoardHeader = textCreator('h2', projectName);
    taskBoard.appendChild(taskBoardHeader);
    // Creating the task board's icon button for removing projects
    const iconButton = document.createElement('span');
    iconButton.innerText = 'close';
    iconButton.classList.add('material-symbols-outlined', 'removeProject', `${projectWithNoSpaces}`);
    taskBoard.appendChild(iconButton);
    iconButton.addEventListener('click', ()=> removeProjectFromUI(projectName))
    // Creating the task board's container for showcasing tasks
    let tasks = document.createElement('div');
    tasks.classList.add(`tasks-${projectWithNoSpaces}`)
    taskBoard.appendChild(tasks)
    // Creating task board's task form
    let newTaskForm = document.createElement('form');
    newTaskForm.classList.add(`${projectWithNoSpaces}`);
    const taskTitleField = fieldCreator('input','Task', `taskTitle-input-${projectWithNoSpaces}`);
    newTaskForm.appendChild(taskTitleField);
    const taskDescField = fieldCreator('input','Description', `taskDescription-input-${projectWithNoSpaces}`);
    newTaskForm.appendChild(taskDescField);
    const taskDueDateField = fieldCreator('date','Due Date', `taskDueDate-input-${projectWithNoSpaces}`);
    newTaskForm.appendChild(taskDueDateField);
    const taskPriorityField = fieldCreator('select', 'Priority', `taskPriority-input-${projectWithNoSpaces}`);
    newTaskForm.appendChild(taskPriorityField);
    const newTaskButton = buttonCreator('Create Task', `${projectWithNoSpaces}`)
    newTaskButton.classList.add(`${projectWithNoSpaces}`);
    newTaskForm.appendChild(newTaskButton);
    newTaskButton.addEventListener('click', createTaskFromUI);
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
        createTaskBoard(parsedAppData.projects[i].name, parsedAppData.projects[i].id);
        let taskContainer = document.querySelector(`.tasks-${parsedAppData.projects[i].name}`);
        for (let j = 0 ; j < parsedAppData.projects[i].tasks.length ; j++) {
            createTaskRow(parsedAppData.projects[i].tasks[j],taskContainer);
        }
    }
}

renderUI();

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
function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

const removeTaskFromUI = function() {
    let taskID = event.target.parentElement.dataset.taskId;
    if (confirm(`Are you sure you want to delete this task, "${taskID}"?`)) {
        let taskRow = document.querySelector(`[data-task-id="${taskID}"]`)
        // let taskBoard = event.target.closest('.taskBoard');
        // console.log(taskBoard);
        let projectName = taskRow.closest('.taskBoard').classList[1]
        removeTask(projectName, taskID);
        taskRow.remove();
        clearUI();
        renderUI();
    }
    // console.log(event)
    // console.log(event.target.parentElement.dataset.taskId);
    // console.log(event.target.parentElement.parentElement.parentElement.dataset.projId);
}
addGlobalEventListener('click', '.removeTask', removeTaskFromUI)

export {};