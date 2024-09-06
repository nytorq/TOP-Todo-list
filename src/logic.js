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

const addTask = function(project, title, description, date, priority) {
    let taskObject = new Task(title, description, date, priority);
    let parsedAppData = loadFromLocalStorage();
    let matchedProject = parsedAppData.projects.filter((obj) => obj.name === project);
    // appData.projects[0].tasks.push(taskObject);
    // console.log('These are the matching projects: ', matchedProject[0])
    // console.log('The matchedProject has an addTask method:', typeof matchedProject[0].addTask === 'function');
    // console.log('This is parsedAppData before rewrite: ', parsedAppData)
    matchedProject[0].tasks.push(taskObject);
    // console.log('This is parsedAppData AFTER rewrite: ', parsedAppData)
    saveToLocalStorage(parsedAppData);
    console.log(`%cA new task has been added to ${matchedProject[0].name}:`, 'color: blue;');
    return taskObject;
}

const removeTask = function(project, taskID) {
    let parsedAppData = loadFromLocalStorage();
    let matchedProject = parsedAppData.projects.filter((obj) => obj.name === project);
    let prunedTasks = matchedProject[0].tasks.filter((task, index) => index !== taskID);
    matchedProject[0].tasks = prunedTasks;
    saveToLocalStorage(parsedAppData);
    console.log(`%cTask has been removed. The following task(s) remain: `, 'color: blue;', matchedProject[0].tasks);
}

const editTask = function(project, taskID, taskProperty, value) {
    let parsedAppData = loadFromLocalStorage();
    let matchedProject = parsedAppData.projects.filter((obj) => obj.name === project);
    let targetTask = matchedProject[0].tasks.filter((task, index) => index === taskID);
    targetTask[0][taskProperty] = value;
    saveToLocalStorage(parsedAppData);
    console.log(`%c${project}'s task #${taskID} property, "${taskProperty}" has been changed to: `, 'color: blue;', targetTask[0]);
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
window.addTask = addTask;
window.removeTask = removeTask;
window.editTask = editTask;
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

const testProject = new Project('testProject');
testProject.addTask('testTask');
window.testProject = testProject;

export {Project, Task, addTask, loadFromLocalStorage}