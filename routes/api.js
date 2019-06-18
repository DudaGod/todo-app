'use strict';

const todos = require('../controllers/todos');

module.exports = (router) => {
    router.get('/todos', todos.get);
    router.post('/todos', todos.add);
    router.patch('/todos', todos.complete);
    router.patch('/delete-task', todos.deleteTask);
    router.patch('/delete-compleated-tasks', todos.deleteCompletedTasks);
    router.patch('/return-to-uncompleted-todo', todos.returnToUncompletedTodo);
    router.patch('/change-task-name', todos.changeTaskName);
    

    return router;
};
