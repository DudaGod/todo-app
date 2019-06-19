'use strict';

const addedTasks = document.querySelector('.added-tasks');
const completedTasks = document.querySelector('.completed-tasks');
const buttonDeleteAllCompletedTasks = document.querySelector('.delete-all-completed-tasks');

document.addEventListener("DOMContentLoaded", () => {
    getTodoList()
        .then((todos = []) => {
            todos.forEach((todo, index) => {

                const todoElem = createElement({
                    tag: 'li', 
                });

                const checkBox = createElement({
                    tag: 'input',
                    attrs: [
                        {name: 'type', value: 'checkbox'}
                    ],
                    listeners: [
                        {type: 'change', listener: checkBoxChangeListener(todoElem, index)}
                    ]
                });

                const text = createElement({
                    tag: 'div', 
                    text: todo.name,
                    listeners: [
                        {type: 'click', listener: onChangeTaskNameListener(todoElem, index)}
                    ]
                });

                const buttonClose = createElement({
                    tag: 'button', 
                    text: 'close',
                    listeners: [
                        {type: 'click', listener: deleteThisTask(todoElem, index)}
                    ]
                });

                if (todo.isCompleted) {
                    checkBox.setAttribute('checked', todo.isCompleted);
                }

                todoElem.appendChild(checkBox);
                todoElem.appendChild(text);
                todoElem.appendChild(buttonClose);

                todo.isCompleted
                    ? completedTasks.appendChild(todoElem)
                    : addedTasks.appendChild(todoElem);
            });
        });

        buttonDeleteAllCompletedTasks.addEventListener('click', onClickDeleteAllCompletedTasks);
});

function onClickDeleteAllCompletedTasks() {
    deleteAllCompletedTasks();
    location.reload();
}


function onClickApply(parent, input, tmp, prev, li, todoIndex) {
    return function() {
            if(input.value === 0 || input.value === prev) {
                parent.replaceChild(tmp, li);
                return;
            }
            changeTaskName(todoIndex, input.value)
            .then(()=>{
                tmp.childNodes[1].innerText = input.value;
                parent.replaceChild(tmp, li);
            });
            return;
        }
};

function onChangeTaskNameListener(todoElem, todoIndex) {
    return function(event){
        let tmp = todoElem;
        let prev = event.target.innerText;
        let parent = tmp.parentNode;

        let li = createElement({
            tag: 'li', 
        });

        let input = createElement({
            tag: 'input', 
            attrs: [
                {name: 'value', value: prev}
            ],
        });

        let button = createElement({
            tag: 'button', 
            text: 'apply',
            listeners: [
                {type: 'click', listener: onClickApply(parent, input, tmp, prev, li, todoIndex)}
            ]
        });

        li.appendChild(input);
        li.appendChild(button);

        parent.replaceChild(li, tmp);
        
    }
}

function checkBoxChangeListener(todoElem, todoIndex) {
    return function() {
        if (!(this.checked && doesHaveParent(this, 'added-tasks'))) {
            todoElem.remove();
            returnToUncompletedTodo(todoIndex)
            .then( data => {
                addedTasks.appendChild(todoElem);
            });
            return;
        }

        todoElem.remove();
        completedTasks.appendChild(todoElem);

        completeTodo(todoIndex);
    }
}

function deleteThisTask(todoElem, todoIndex) {
    return function() {
        deleteTask(todoIndex)
        .then( () => {
            todoElem.remove();
        });
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
