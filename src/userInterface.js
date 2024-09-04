import {textCreator, imageCreator, buttonCreator, fieldCreator, idCounter, idCreator} from "./tools.js";
import {User, Project, Task, currentUser, project1, addTaskObject} from "./logic.js"

const renderUI = function() {
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

    // Creating form's task inputs
    const taskTitleField = fieldCreator('input','Task', 'taskTitle-main');
    newTaskForm.appendChild(taskTitleField);
    const taskDescField = fieldCreator('input','Description', 'taskDescription-main');
    newTaskForm.appendChild(taskDescField);
    const taskDueDateField = fieldCreator('date','Due Date', 'taskDueDate-main');
    newTaskForm.appendChild(taskDueDateField);
    const taskPriorityField = fieldCreator('select', 'Priority', 'taskPriority-main');
    newTaskForm.appendChild(taskPriorityField);

    newTaskForm.appendChild(newTaskButton);
    tasklist.appendChild(newTaskForm);

    // Create new task form
    


    // Adding functionality to "Create Task" button
    const createTask = function(event) {
        event.preventDefault();
        let taskTitle = document.getElementById('taskTitle-main');
        let taskDescription = document.getElementById('taskDescription-main');
        let taskDueDate = document.getElementById('taskDueDate-main');
        let taskPriority = document.getElementById('taskPriority-main');

        // Creating new Task object and adding it to project
        let taskData = addTaskObject(taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value);

        // Creating new task in the UI
        const container = document.createElement('div');
        let taskNumber = idCreator();
        container.classList.add(`'taskContainer-${taskNumber}'`);
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
    newTaskButton.addEventListener('click', createTask);
};


export {renderUI};