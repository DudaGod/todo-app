'use strict';

module.exports = class TodoItem {
    constructor(text) {
        this.text = text;
        this.isCompleted = false;
    }

    complete() {
        this.isCompleted = true;
    }
};
