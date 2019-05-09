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

try {
    module.exports = {getTodoList, completeTodo};
} catch (e) {}
