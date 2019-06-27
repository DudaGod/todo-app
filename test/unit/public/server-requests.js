'use strict';

const serverRequests = require('../../../public/server-requests');

describe('server-requests', () => {
    let fetchStub;

    beforeEach(() => {
        fetchStub = sinon.stub();
        global.fetch = fetchStub;
    });

    afterEach(() => {
        delete global.fetch;
    });

    it('should get todo list from the server', async () => {
        // arrange
        fetchStub.resolves({
            json: () => {
                return Promise.resolve(['todo-1', 'todo-2']);
            }
        });

        // act
        const result = await serverRequests.getTodoList();

        // assert
        assert.deepEqual(result, ['todo-1', 'todo-2']);
    });

    it('should inform the server that todo item is completed', async () => {
        // act
        await serverRequests.completeTodo(1);

        // assert
        assert.isTrue(fetchStub.calledOnce);
        assert.equal(fetchStub.firstCall.args[1].body, JSON.stringify({index: 1}));
    });

    it('should inform what delete at the server', async () => {
        // act
        await serverRequests.deleteTask(1);

         // assert
        assert.isTrue(fetchStub.calledOnce);
        assert.equal(fetchStub.firstCall.args[1].body, JSON.stringify({index: 1}));
    });

    it('should inform delete all completed task at the server', async () => {
        // act
        await serverRequests.deleteAllCompletedTasks();

         // assert
        assert.isTrue(fetchStub.calledOnce);
    });

    it('should inform what task return to uncompleted todo at the server', async () => {
        // act
        await serverRequests.returnToUncompletedTodo(2);

         // assert
        assert.isTrue(fetchStub.calledOnce);
        assert.equal(fetchStub.firstCall.args[1].body, JSON.stringify({index: 2}));
    });

});
