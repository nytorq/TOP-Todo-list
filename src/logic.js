import {textCreator, imageCreator, buttonCreator, fieldCreator, idCounter, idCreator} from "./tools.js";
let currentUser;
let project1;

// Classes
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
    static validPriorities = ["Low", "Medium", "High"];
    constructor(title, description, date, priority = 'Medium') {
        this.title = title;
        this.desc = description;
        this.dueDate = date
        if (Task.validPriorities.includes(priority)) {
            this.priority = priority;
        } else {
            throw new Error(`Priority must be one of ${Task.validPriorities.join(', ')}`)
        }
        this.priority = priority;
    }
    status = false;
    id = idCreator();
};

const addTaskObject = function(title, description, date, priority) {
    const taskObject = new Task(title, description, date, priority);
    currentUser.projects[0].taskObject;
    updateLocalStorage(currentUser);
    return taskObject;
}

const updateLocalStorage = function(object) {
    const JSONString = JSON.stringify(object);
    localStorage.setItem('currentUser', JSONString);
}

// Creating basic data structure


const populateData = function() {
    if (localStorage.currentUser) {
        let JSONString = localStorage.getItem('currentUser');
        currentUser = JSON.parse(JSONString);
    } else {
        currentUser = new User();
        project1 = new Project();
        currentUser.addProject(project1);
        updateLocalStorage(currentUser)
    }
}

populateData();

// Data creation functions



export {User, Project, Task, currentUser, project1, addTaskObject}