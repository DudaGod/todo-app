'use strict';

const TodoList = require('../models/todo-list');
const todoList = new TodoList();

exports.get = (req, res) => {
    res.json(todoList.todos);
};

exports.add = (req, res) => {
    todoList.add(req.body['todo-text']);

    res.redirect('/');
};

exports.complete = (req, res) => {
    todoList.complete(req.body.index);

    res.end();
};
