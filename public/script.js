'use strict';

const addedTasks = document.querySelector('.added-tasks');
const completedTasks = document.querySelector('.completed-tasks');

document.addEventListener("DOMContentLoaded", () => {
    getTodoList()
        .then((todos = []) => {
            todos.forEach((todo, index) => {
                const todoElem = createElement({tag: 'li', text: todo.name});
                const checkBox = createElement({
                    tag: 'input',
                    attrs: [
                        {name: 'type', value: 'checkbox'}
                    ],
                    listeners: [
                        {type: 'change', listener: checkBoxChangeListener(todoElem, index)}
                    ]
                });

                if (todo.isCompleted) {
                    checkBox.setAttribute('checked', todo.isCompleted);
                }

                todoElem.insertBefore(checkBox, todoElem.firstChild);

                todo.isCompleted
                    ? completedTasks.appendChild(todoElem)
                    : addedTasks.appendChild(todoElem);
            });
        });
});

function checkBoxChangeListener(todoElem, todoIndex) {
    return function() {
        if (!(this.checked && doesHaveParent(this, 'added-tasks'))) {
            return;
        }

        todoElem.remove();
        completedTasks.appendChild(todoElem);

        completeTodo(todoIndex);
    }
}

function createElement({tag, text, attrs = [], listeners = []}) {
    const elem = document.createElement(tag);

    if (text) {
        elem.innerText = text;
    }

    attrs.forEach(({name, value}) => {
        elem.setAttribute(name, value);
    });

    listeners.forEach(({type, listener}) => {
        elem.addEventListener(type, listener);
    });

    return elem;
}

function doesHaveParent(element, className) {
    if (element.classList.contains(className)) {
        return true;
    }

    return element.parentElement
        ? doesHaveParent(element.parentElement, className)
        : false;
}
