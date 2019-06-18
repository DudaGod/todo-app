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

    deleteTask(index) {
        this.todos.splice(index, 1);
    }

    deleteCompletedTasks() {
        this.todos = this.todos.filter( item => item.isCompleted !== true);
    }

    returnToUncompletedTodo(index) {
        this.todos[index].uncompleted();
    }

    changeTaskName(index, name) {
        this.todos[index].changeName(name)
    }
};
