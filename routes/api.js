'use strict';

const TodoList = require('../models/todo-list');

module.exports = (router) => {
    const todoList = new TodoList();

    router.get('/todos', (req, res) => {
        res.json(todoList.todos);
    });

    router.post('/todos', (req, res) => {
        todoList.add(req.body['todo-text']);

        res.redirect('/');
    });

    router.patch('/todos', (req, res) => {
        todoList.complete(req.body.index);

        res.end();
    });

    return router;
};
