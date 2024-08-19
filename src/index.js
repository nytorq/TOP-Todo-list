import "./styles.css";
import {textCreator, imageCreator, buttonCreator, fieldCreator} from "./tools.js";
// const userData = {
//     projects: [
//         {
//             name: '',
//             tasks: [
//                 {
//                    id: 0,
//                    title: '',
//                    description: '',
//                    dueDate: '',
//                    priority: 1, 
//                 }
//             ]
//         }
//     ],
// };
class User {
    projects = [];
    addProject(project) {
        this.projects.push(project);
    }
}
class Project {
    constructor(name) {
        this.name = name;
    }
    tasks = [];
    addTask(task) {
        this.tasks.push(task);
    }
};
class Task {
    constructor(title, description, date) {
        this.title = title;
        this.desc = description;
        this.dueDate = date
    }
    id = idCreator();
};

// Creating basic data structure
const user1 = new User();
const project1 = new Project();
user1.addProject(project1);
let idCounter = 0;

// Utility functions

const idCreator = () => {
    let currentID = idCounter;
    idCounter += 1;
    return currentID;
}



// General page elements
const newTaskButton = buttonCreator('Create Task', 'testClass')
const body = document.querySelector('body');
const header = textCreator('h1', 'MasterTasker');
body.appendChild(header);


// Creating form for creating new tasks
const newTaskForm = document.createElement('form');
const formHeader = textCreator('h2', 'Home');
newTaskForm.appendChild(formHeader);
body.appendChild(newTaskForm);
const taskTitle = fieldCreator('input','Task', 'taskTitle');
newTaskForm.append(taskTitle);
const taskDescription = fieldCreator('input','Description', 'taskDescription');
newTaskForm.append(taskDescription);
const taskDueDate = fieldCreator('date','Due Date', 'taskDueDate');
newTaskForm.append(taskDueDate);
newTaskForm.appendChild(newTaskButton);
newTaskButton.addEventListener('click', ()=>{
    event.preventDefault();
    let taskName = document.getElementById('taskTitle');
    let taskDesc = document.getElementById('taskDescription');
    let taskDueDate = document.getElementById('taskDueDate');
    const newTask = new Task(taskName.value, taskDesc.value, taskDueDate.value );
    let newField = fieldCreator('checkbox', taskName.value, `task-${newTask.id}`);
    newTaskForm.insertBefore(newField, taskTitle)
    project1.addTask(newTask);
    console.dir(user1);
    taskName.value = '';
    taskDesc.value = '';
    taskDueDate.value = '';
});