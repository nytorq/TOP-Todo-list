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
    let taskObject = new Task(title, description, date, priority);
    let appData = loadFromLocalStorage();
    appData.projects[0].tasks.push(taskObject);
    saveToLocalStorage(appData);
    console.log(localStorage.appData);
    return taskObject;
}

// const updateLocalStorage = function(object) {
//     const JSONString = JSON.stringify(object);
//     localStorage.setItem('currentUser', JSONString);
// }

// // Creating basic data structure


// const updateAppData = function() {
//     if (localStorage.currentUser) {
//         let JSONString = localStorage.getItem('currentUser');
//         currentUser = JSON.parse(JSONString);
//     } else {
//         currentUser = new User();
//         project1 = new Project();
//         currentUser.addProject(project1);
//         updateLocalStorage(currentUser)
//     }
// }

// updateAppData();

// Data creation functions


const storageKey = 'appData';

const saveToLocalStorage = function(object) {
    try {
        let JSONString = JSON.stringify(object)
        localStorage.setItem(storageKey, JSONString);
    } catch {
        throw new Error('Could not save to localStorage.');
    }
}

const loadFromLocalStorage = function() {
    let appData;
    if (localStorage.appData) {
        let stringyAppData = localStorage.appData;
        appData = JSON.parse(stringyAppData);
        return appData;
    } else {
        let newUser = new User();
        let newProject = new Project();
        newUser.addProject(newProject);
        saveToLocalStorage(newUser);
    }
}


loadFromLocalStorage();

window.loadFromLocalStorage = loadFromLocalStorage;

/* 
1. See if there's appData to pull from
    1. If there isn't, go ahead and create a new User and a Project. Then run saveToLocalStorage.
    2. If there is, loadFromLocalStorage. Then populate you app with appData

2. Adding a task
    1. Perform loadFromLocalStorage
    2. Navigate down to curren project
    3. Add new task to tasks array
    4. Run STLS
*/ 


export {User, Project, Task, currentUser, project1, addTaskObject, loadFromLocalStorage}