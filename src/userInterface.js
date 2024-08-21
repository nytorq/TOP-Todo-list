import {textCreator, imageCreator, buttonCreator, fieldCreator, idCounter, idCreator} from "./tools.js";
import {User, Project, Task, currentUser, project1, addTaskObject} from "./logic.js"

const renderUI = function() {
    const body = document.querySelector('body');
    const header = textCreator('h1', 'Personal Projects');
    body.appendChild(header);

    // Creating form and its fields for creating new tasks
    const newTaskButton = buttonCreator('Create Task', 'testClass')
    
    const formHeader = textCreator('h2', 'Home');
    const tasklist = document.createElement('div');
    tasklist.classList.add('tasklist');
    body.appendChild(tasklist);
    const tasks = document.createElement('div');
    tasks.classList.add('tasks');
    tasklist.appendChild(formHeader);
    tasklist.appendChild(tasks);
    const newTaskForm = document.createElement('form');
    const taskTitle = fieldCreator('input','Task', 'taskTitle');
    newTaskForm.appendChild(taskTitle);
    const taskDescription = fieldCreator('input','Description', 'taskDescription');
    newTaskForm.appendChild(taskDescription);
    const taskDueDate = fieldCreator('date','Due Date', 'taskDueDate');
    newTaskForm.appendChild(taskDueDate);
    const taskPriority = fieldCreator('select', 'Priority', 'taskPriority');
    newTaskForm.appendChild(taskPriority);
    newTaskForm.appendChild(newTaskButton);
    tasklist.appendChild(newTaskForm);

    // Create new task form
    const taskDetailsCreator = function() {
        const taskInput = fieldCreator('input','Task', 'taskTitle');
        taskDetails.appendChild(taskInput);
        taskInput.value = taskTitle.value
        const DescInput = fieldCreator('input','Description', 'taskDescription');
        taskDetails.appendChild(DescInput);
        taslDescription.value = DescInput.value
        const dueDatePicker = fieldCreator('date','Due Date', 'taskDueDate');
        taskDetails.appendChild(taskDueDate);
        const taskPriority = fieldCreator('select', 'Priority', 'taskPriority');
        taskDetails.appendChild(taskPriority);
    }


    // Adding functionality to "Create Task" button
    const createTask = function(event) {
        event.preventDefault();
        let taskTitle = document.getElementById('taskTitle');
        let taskDescription = document.getElementById('taskDescription');
        let taskDueDate = document.getElementById('taskDueDate');
        let taskPriority = document.getElementById('taskPriority');
        
        // Creating new Task object and adding it to project
        addTaskObject(taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value);
        

        // Creating new task in the UI
        const container = document.createElement('div');
        container.classList.add('taskContainer');
        const taskDetails = document.createElement('div');
        taskDetails.classList.add('taskDetails');

        

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const moreButton = document.createElement('span');
        moreButton.classList.add('material-symbols-outlined');
        moreButton.innerText = "more_horiz";
        container.appendChild(checkbox);
        container.appendChild(taskDetails);
        container.appendChild(moreButton);

        tasks.appendChild(container);
        
        // Original task row creator
        // let newCheckbox = fieldCreator('checkbox', taskTitle.value, `task-${taskObject.id}`);
        // tasks.appendChild(newCheckbox)

        // Clearing out inputs
        taskTitle.value = '';
        taskDescription.value = '';
        taskDueDate.value = '';

        console.log(currentUser);
        console.log(taskTitle.value);
    }
    newTaskButton.addEventListener('click', createTask);
};




export {renderUI};