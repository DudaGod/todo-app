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
        const list = new TodoList(['come to the lecture', 'understand testing', 'come to the lecture']);

        // act
        await list.deleteTask(1);

        // assert
        assert.deepEqual(
            [{
                "isCompleted": false,
                "name": "come to the lecture"
            },
            {
                "isCompleted": false,
                "name": "come to the lecture"
            }],
            list.todos
        );
    });

    it('should delete all completed task', async () => {
        // arrange
        const list = new TodoList(['come to the lecture', 'understand testing', 'come to the lecture']);

        // act
        await list.complete(1)
        await list. deleteCompletedTasks();

        // assert
        assert.deepEqual(
            [{
                "isCompleted": false,
                "name": "come to the lecture"
            },
            {
                "isCompleted": false,
                "name": "come to the lecture"
            }],
            list.todos
        );
    });

    it('should change name todo', async () => {
        // arrange
        const list = new TodoList(['come to the lecture', 'understand testing']);

        // act
        await list.changeTaskName(0, 'not come to the lecture');

        // assert
        assert.equal('not come to the lecture', list.todos[0].name);
    });

    it('should change name todo', async () => {
        // arrange
        const list = new TodoList(['come to the lecture', 'understand testing']);

        // act
        await list.changeTaskName(0, 'not come to the lecture');

        // assert
        assert.equal('not come to the lecture', list.todos[0].name);
    });
});
