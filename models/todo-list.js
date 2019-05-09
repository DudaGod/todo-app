'use strict';

const TodoItem = require('./todo-item');

module.exports = class TodoList {
    constructor(names = []) {
        this.todos = names.map((name) => new TodoItem(name));
    }

    add(name) {
        this.todos.push(new TodoItem(name));
    }

    complete(index) {
        this.todos[index].complete();
    }
};
