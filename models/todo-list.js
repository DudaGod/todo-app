'use strict';

const TodoItem = require('./todo-item');

module.exports = class TodoList {
    constructor(texts = []) {
        this.todos = texts.map((text) => new TodoItem(text));
    }

    add(text) {
        this.todos.push(new TodoItem(text));
    }

    complete(index) {
        this.todos[index].complete();
    }
};
