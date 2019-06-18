'use strict';

module.exports = class TodoItem {
    constructor(name) {
        this.name = name;
        this.isCompleted = false;
    }

    complete() {
        this.isCompleted = true;
    }

    uncompleted() {
        this.isCompleted = false;
    }

    changeName(name) {
        this.name = name;
    }
};
