'use strict';

const todos = require('../controllers/todos');

module.exports = (router) => {
    router.get('/todos', todos.get);
    router.post('/todos', todos.add);
    router.patch('/todos', todos.complete);

    return router;
};
