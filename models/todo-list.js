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

    delete(index) {
        this.todos = this.todos.filter( (item, todosIndex) => todosIndex !== index);
    }

    deleteCompleted() {
        this.todos = this.todos.filter( item => !item.isCompleted);
    }

    uncomplete(index) {
        this.todos[index].uncompleted();
    }

    rename(index, name) {
        this.todos[index].changeName(name)
    }
};
