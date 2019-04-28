'use strict';

const addTaskForm = document.querySelector('.add-task-form');
const addedTasks = document.querySelector('.added-tasks');
const completedTasks = document.querySelector('.completed-tasks');

document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/v1/todos')
        .then((res) => res.json())
        .then((todos = []) => {
            todos.forEach((todo, index) => {
                const todoElem = createElement({tag: 'li', text: todo.text});
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

        fetch('/api/v1/todos', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({index: todoIndex})
        });

        todoElem.remove();
        completedTasks.appendChild(todoElem);
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
