import {textCreator, imageCreator, buttonCreator, fieldCreator, idCounter, idCreator} from "./tools.js";
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

// Creating basic data structure
const currentUser = new User();
const project1 = new Project();
currentUser.addProject(project1);

// Data creation functions

const addTaskObject = function(title, description, date, priority) {
    const taskObject = new Task(title, description, date, priority);
    project1.addTask(taskObject);
    return taskObject;
}

export {User, Project, Task, currentUser, project1, addTaskObject}