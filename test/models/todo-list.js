'use strict';

const TodoList = require('../../models/todo-list');
const {assert} = require('chai');

describe('TodoList', () => {
    it('should add todo', async () => {
        // arrange
        const list = new TodoList();

        // act
        await list.add('get a job in Yandex');

        // assert
        assert.equal(list.todos[0].name, 'get a job in Yandex');
    });

    it('should complete todo', async () => {
        // arrange
        const list = new TodoList(['come to the lecture', 'understand testing']);

        // act
        await list.complete(0);

        // assert
        assert.isTrue(list.todos[0].isCompleted);
    });
});
