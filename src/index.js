import "./styles.css";
import {renderUI} from "./userInterface.js";

/* CHECKLIST OF FUNCTIONALITY
    [X] UI and data handing are separated
    [X] Tasks should have the following:
        [X] status
        [X] title
        [X] description
        [X] due date
        [X] priority
    [X] Edit a task
    [X] Delete a task
    [X] Tasks should be bundled into separate projects
    [X] Users can create new projects
    [X] Users can switch between projects
    [X] Stores everything in localStorage
    [X] No crashing if there's nothing in localStorage

KNOWN ISSUES

- Can't have certain characters as project titles, for example a hash tag or spaces for a project named "Project #3". 
    I started working on this issue with userInterface.js:145, shown below:
    let taskContainer = document.querySelector(`.tasks-${parsedAppData.projects[i].name}`);

*/ 