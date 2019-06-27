'use strict';

const todos = require('../controllers/todos');

module.exports = (router) => {
    router.get('/todos', todos.get);
    router.post('/todos', todos.add);
    router.patch('/todos', todos.complete);
    router.delete('/delete', todos.delete);
    router.delete('/delete-compleated', todos.deleteCompleted);
    router.patch('/uncomplete', todos.uncomplete);
    router.patch('/rename', todos.rename);
    

    return router;
};
