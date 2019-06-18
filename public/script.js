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


function inputHandler(todoElem, index) {
    return function(event) {
        console.dir(event);
        if(event.keyCode  === 13){
            if(event.target.value === 0 || event.target.value === prev) {
                parent.replaceChild(tmp, input);
                return;
            }
            changeTaskName(index, event.target.value)
            .then(()=>{
                parent.replaceChild(tmp, input);
            });
            return;
        }
        return;
    }(event);
}

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
            listeners: [
                {type: 'keydown', listener: inputHandler}
            ]
        });

        li.appendChild(input);
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
