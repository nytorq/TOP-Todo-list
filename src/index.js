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
};
const user1 = new User();
const project1 = new Project();
user1.addProject(project1);


const newTask = buttonCreator('New Task', 'testClass')
const body = document.querySelector('body');

const taskTitle = fieldCreator('input','Task', 'taskTitle');
body.append(taskTitle);
const taskDescription = fieldCreator('input','Description', 'taskDescription');
body.append(taskDescription);
const taskDueDate = fieldCreator('date','Due Date', 'taskDueDate');
body.append(taskDueDate);
body.appendChild(newTask);
newTask.addEventListener('click', ()=>{
    let taskName = document.getElementById('taskTitle');
    let taskDesc = document.getElementById('taskDescription');
    let taskDueDate = document.getElementById('taskDueDate');
    let newField = fieldCreator('checkbox', taskName.value, 'newTask');
    body.appendChild(newField)
    const newTask = new Task(taskName.value, taskDesc.value, taskDueDate.value );
    project1.addTask(newTask);
    console.dir(user1);
});