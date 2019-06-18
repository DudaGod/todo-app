'use strict';

const getTodoList = () => {
    return fetch('/api/v1/todos')
        .then((res) => res.json());
};

const completeTodo = (index) => {
    return fetch('/api/v1/todos', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({index})
    });
};

const returnToUncompletedTodo = (index) => {
    return fetch('/api/v1/return-to-uncompleted-todo', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({index})
    });
};

const deleteAllCompletedTasks = () => {
    return fetch('/api/v1/delete-compleated-tasks', {
        method: 'PATCH',
    });
}

const deleteTask = (index) => {
    return fetch('/api/v1/delete-task', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({index})
    });
}

const changeTaskName = (index, name) => {
    return fetch('/api/v1/change-task-name', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({index, name})
    });
}


try {
    module.exports = {
        getTodoList, 
        completeTodo, 
        deleteAllCompletedTasks, 
        deleteTask,
        returnToUncompletedTodo,
        changeTaskName
    };
} catch (e) {}
