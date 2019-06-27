'use strict';

const TodoList = require('../../../models/todo-list');
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

    it('should delete one task', async () => {
        // arrange
        const list = new TodoList(['come to the lecture', 'understand testing', 'come to the tutor']);

        // act
        await list.delete(1);

        // assert
        assert.deepEqual(2, list.todos.length);
    });

    it('should delete one completed task', async () => {
        // arrange
        const list = new TodoList(['come to the lecture', 'understand testing']);

        // act
        await list.complete(1)
        await list.delete(1);

        // assert
        assert.deepEqual(1, list.todos.length);
    });

    it('should delete all completed task', async () => {
        // arrange
        const list = new TodoList(['come to the lecture', 'understand testing', 'come to the tutor']);

        // act
        await list.complete(1)
        await list. deleteCompleted();

        // assert
        assert.deepEqual(
            [{
                "isCompleted": false,
                "name": "come to the lecture"
            },
            {
                "isCompleted": false,
                "name": "come to the tutor"
            }],
            list.todos
        );
    });

    it('should rename todo', async () => {
        // arrange
        const list = new TodoList(['come to the lecture', 'understand testing']);

        // act
        await list.rename(0, 'not come to the lecture');

        // assert
        assert.equal('not come to the lecture', list.todos[0].name);
    });

});
