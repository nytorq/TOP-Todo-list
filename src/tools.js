import {User, Project, Task, currentUser, project1, addTaskObject} from "./logic.js"

const textCreator = (type, string) => {
    const element = document.createElement(`${type}`);
    element.innerText = string;
    return element;
}

const imageCreator = (src, altText) => {
    const image = document.createElement('img');
    image.src = src;
    image.alt = altText;
    return image;
}

const buttonCreator = (value, className) => {
    const button = document.createElement('button');
    button.classList.add(`${className}`)
    button.innerText = value;
    return button;
}

const fieldCreator = (type, labelText, connection, className) => {

    let field;

    const populateSelect = (select, options) => {
        select.innerHTML = '';
    
        options.forEach( option  => {
            const optionElement = document.createElement('option');
            optionElement.innerText = option;
            optionElement.value = option;
            select.appendChild(optionElement);
        });
    }

    const div = document.createElement('div');
    div.classList.add('field');
    const label = document.createElement('label');
    label.innerText = labelText;
    label.setAttribute('for', connection);

    if (type === 'select') {
        field = document.createElement('select');
        field.id = connection;
        populateSelect(field, Task.validPriorities);
    } else {
        field = document.createElement('input');
        field.type = type;
        field.id = connection;
        field.name = connection;
    }
    
    if (className) {
        label.className.add(`'${className}'`);
        field.className.add(`'${className}'`);
    }
    div.appendChild(label)
    div.appendChild(field)
    return div;
}

let idCounter = 0;

const idCreator = () => {
    let currentID = idCounter;
    idCounter += 1;
    return currentID;
}

export {textCreator, imageCreator, buttonCreator, fieldCreator, idCounter, idCreator}