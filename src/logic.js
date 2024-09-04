import {idCreator} from "./tools.js";

// Classes
// class User {
//     projects = [];
//     addProject(project) {
//         this.projects.push(project);
//     }
// }
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

const storageKey = 'appData';

/*
 - Create new X
 - Retrieve appData. Convert from string to object
 - Insert X into its respective place
 - Stringify object
 - Save into localStorage
*/


const addProject = function(projectName) {
    let newProject = new Project(projectName);
    let parsedAppData = loadFromLocalStorage();
    console.log('parsedAppData is ' + parsedAppData);
    if (!parsedAppData.projects) {
        parsedAppData.projects = [];
    }
    parsedAppData.projects.push(newProject);
    saveToLocalStorage(parsedAppData)
}

const addTaskObject = function(project, title, description, date, priority) {
    let taskObject = new Task(project, title, description, date, priority);
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


const saveToLocalStorage = function(object) {
    try {
        let JSONString = JSON.stringify(object)
        localStorage.setItem(storageKey, JSONString);
    } catch {
        throw new Error('Could not save to localStorage.');
    }
}

const loadFromLocalStorage = function() {
    if (localStorage.appData) {
        let parsedAppData = JSON.parse(localStorage.appData)
        return parsedAppData;
    } else if (!localStorage.appData) {
        saveToLocalStorage(createAppData())
        let parsedAppData = JSON.parse(localStorage.appData)
        return parsedAppData;
    }

}

const createAppData = function() {
    let blankObject = {
        projects: []
    };
    return blankObject;
}


window.loadFromLocalStorage = loadFromLocalStorage;
window.addTaskObject = addTaskObject;
window.addProject = addProject;
window.createAppData = createAppData;

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


export {Project, Task, addTaskObject, loadFromLocalStorage}