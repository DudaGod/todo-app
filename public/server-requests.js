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
    return fetch('/api/v1/uncomplete', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({index})
    });
};

const deleteAllCompletedTasks = () => {
    return fetch('/api/v1/delete-compleated', {
        method: 'DELETE',
    });
}

const deleteTask = (index) => {
    return fetch('/api/v1/delete', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({index})
    });
}

const changeTaskName = (index, name) => {
    return fetch('/api/v1/rename', {
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
