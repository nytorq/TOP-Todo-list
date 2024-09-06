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

const addProject = function(projectName) {
    let newProject = new Project(projectName);
    let parsedAppData = loadFromLocalStorage();
    // if (!parsedAppData.projects) {
    //     parsedAppData.projects = [];
    // }
    parsedAppData.projects.push(newProject);
    saveToLocalStorage(parsedAppData)
    console.log(`%cYour project, "${projectName}", has been added.`, 'color: blue;', loadFromLocalStorage())
}

const addTask = function(project, title, description, date, priority) {
    let taskObject = new Task(title, description, date, priority);
    let parsedAppData = loadFromLocalStorage();
    let matchedProject = parsedAppData.projects.filter((obj) => obj.name === project);
    matchedProject[0].tasks.push(taskObject);
    saveToLocalStorage(parsedAppData);
    console.log(`%cA new task has been added to the project "${matchedProject[0].name}":`, 'color: blue;');
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

if (!localStorage.appData) {
    createAppData();
    addProject('Personal');
}

export {Project, Task, addProject, addTask, removeTask, editTask, loadFromLocalStorage}