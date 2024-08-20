import {textCreator, imageCreator, buttonCreator, fieldCreator, idCounter, idCreator} from "./tools.js";
import {User, Project, Task, currentUser, project1, addTaskObject} from "./logic.js"

const populateSelect = (select, options) => {
    select.innerHTML = '';

    options.forEach( option  => {
        const optionElement = document.createElement('option');
        optionElement.innerText = option;
        optionElement.value = option;
        select.appendChild(optionElement);
    });
}

const renderUI = function() {
    // General page elements
    const newTaskButton = buttonCreator('Create Task', 'testClass')
    const body = document.querySelector('body');
    const header = textCreator('h1', 'Personal Projects');
    body.appendChild(header);

    // Creating form for creating new tasks
    const newTaskForm = document.createElement('form');
    const formHeader = textCreator('h2', 'Home');
    const tasklist = document.createElement('div');
    tasklist.classList.add('tasklist');
    body.appendChild(tasklist);
    const tasks = document.createElement('div');
    tasks.classList.add('tasks');
    tasklist.appendChild(formHeader);
    tasklist.appendChild(tasks);
    tasklist.appendChild(newTaskForm);
    const taskTitle = fieldCreator('input','Task', 'taskTitle');
    newTaskForm.appendChild(taskTitle);
    const taskDescription = fieldCreator('input','Description', 'taskDescription');
    newTaskForm.appendChild(taskDescription);
    const taskDueDate = fieldCreator('date','Due Date', 'taskDueDate');
    newTaskForm.appendChild(taskDueDate);
    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.innerText = "Priority";
    const taskPriority = document.createElement('select');
    populateSelect(taskPriority, Task.validPriorities);
    taskPriorityLabel.appendChild(taskPriority);
    newTaskForm.appendChild(taskPriorityLabel);
    newTaskForm.appendChild(newTaskButton);
        
    // Adding functionality to "Create Task" button
    newTaskButton.addEventListener('click', ()=>{
        event.preventDefault();
        let taskName = document.getElementById('taskTitle');
        let taskDesc = document.getElementById('taskDescription');
        let taskDueDate = document.getElementById('taskDueDate');
        
        // Creating new Task object and adding it to project
        let taskObject = addTaskObject(taskName.value, taskDesc.value, taskDueDate.value, taskPriority.value);
        

        // Creating new task in the UI
        let newField = fieldCreator('checkbox', taskName.value, `task-${taskObject.id}`);
        tasks.appendChild(newField)

        // Clearing out inputs
        taskName.value = '';
        taskDesc.value = '';
        taskDueDate.value = '';

        console.log(currentUser);
    });
};



export {renderUI};