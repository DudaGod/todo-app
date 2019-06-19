'use strict';

const {assert} = require('chai');

describe('Todo-app', () => {
    it('should add task to completed section', function() {
        return this.browser
            .url('/')
            .click('.add-todo-text')
            .keys('Hello world')
            .click('.add-todo-btn')
            .waitForVisible('.added-tasks input')
            .click('.added-tasks input')
            .isExisting('.completed-tasks li')
            .then((exists) => {
                assert.isTrue(exists, 'Todo item does not appear in completed section');
            });
    });

    it('should render todo item correctly', function() {
        return this.browser
            .url('/')
            .click('.add-todo-text')
            .keys('Hello world')
            .click('.add-todo-btn')
            .waitForVisible('.added-tasks li')
            .assertView('plain', '.added-tasks li');
    });

    it('should render complited task in uncompleted tasks', function() {
        return this.browser
            .url('/')
            .click('.completed-tasks li input[type=checkbox]')
            .waitForVisible('.added-tasks li')
            .assertView('plain', '.added-tasks li');
    });
});
