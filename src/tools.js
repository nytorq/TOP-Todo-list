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
    const label = document.createElement('label');
    label.innerText = labelText;
    label.setAttribute('for', connection);
    const field = document.createElement('input');
    field.type = type;
    field.id = connection;
    field.name = connection;
    label.appendChild(field)
    if (className) {
        label.className.add(`'${className}'`)
    }
    return label;
}

export {textCreator, imageCreator, buttonCreator, fieldCreator}