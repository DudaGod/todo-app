'use strict';

const serverRequests = require('../../public/server-requests');
const {assert} = require('chai');

describe('server-requests', () => {
    it('should get todo list from the server', async () => {
        // arrange
        global.fetch = () => {
            return Promise.resolve({
                json: () => {
                    return Promise.resolve(['todo-1', 'todo-2'])}
                }
            );
        };

        // act
        const result = await serverRequests.getTodoList();

        // assert
        assert.deepEqual(result, ['todo-1', 'todo-2']);
    });

    it('should inform the server that todo item is completed', async () => {
        // arrange
        let latestArgs;
        global.fetch = (...args) => {
            latestArgs = args;
            return Promise.resolve();
        };

        // act
        await serverRequests.completeTodo(1);

        // assert
        assert.equal(latestArgs[1].body, JSON.stringify({index: 1}));
    });
});
