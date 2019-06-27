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
                    attrs: [
                        {name: 'class', value: 'todo-name'}
                    ],
                    listeners: [
                        {type: 'click', listener: onChangeTaskNameListener(todoElem, index)}
                    ]
                });

                const buttonClose = createElement({
                    tag: 'button', 
                    text: 'close',
                    listeners: [
                        {type: 'click', listener: deleteTodo(todoElem, index)}
                    ]
                });

                if (todo.isCompleted) {
                    checkBox.setAttribute('checked', todo.isCompleted);
                }

                appendChilds(todoElem, [checkBox, text, buttonClose])

                todo.isCompleted
                    ? completedTasks.appendChild(todoElem)
                    : addedTasks.appendChild(todoElem);
            });
        });

        buttonDeleteAllCompletedTasks.addEventListener('click', onClickDeleteAllCompletedTasks);
});

function onClickDeleteAllCompletedTasks() {
    if(completedTasks.childNodes.length > 0){
        deleteAllCompletedTasks()
            .then(
                () => completedTasks.innerHTML = ""
            );
    }
    return;
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
        });

        let button = createElement({
            tag: 'button', 
            text: 'apply',
            listeners: [
                {
                    type: 'click', 
                    listener: onClickApply(
                        { parent, input, tmp, prev, li, todoIndex }
                    )
                }
            ]
        });
        appendChilds(li, [input, button])
        parent.replaceChild(li, tmp);
    }
}

function onClickApply(closureObject) {
    return function() {
            if(closureObject.input.value === 0 || closureObject.input.value === closureObject.prev) {
                closureObject.parent.replaceChild(closureObject.tmp, closureObject.li);
                return;
            }
            changeTaskName(closureObject.todoIndex, closureObject.input.value)
                .then(() => { 
                    closureObject.tmp.querySelector('.todo-name').innerText = closureObject.input.value;
                    closureObject.parent.replaceChild(closureObject.tmp, closureObject.li);
                });
        }
};

function checkBoxChangeListener(todoElem, todoIndex) {
    return function() {
        if (!(this.checked && doesHaveParent(this, 'added-tasks'))) {
            todoElem.remove();
            returnToUncompletedTodo(todoIndex)
            .then( () => addedTasks.appendChild(todoElem));
            return;
        }

        todoElem.remove();
        completedTasks.appendChild(todoElem);

        completeTodo(todoIndex);
    }
}

function deleteTodo(todoElem, todoIndex) {
    return function() {
        deleteTask(todoIndex)
            .then( () => todoElem.remove());
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

function appendChilds(element, childs){
    childs.forEach(function(value){
        element.appendChild(value);
    })
}
