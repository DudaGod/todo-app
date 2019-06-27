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

exports.delete = (req, res) => {
    todoList.delete(req.body.index);
    res.end(JSON.stringify({status : 'ok'}));
}

exports.deleteCompleted = (req, res) => {
    todoList.deleteCompleted();
    res.end(JSON.stringify({status : 'ok'}));
}

exports.uncomplete = (req, res) => {
    todoList.uncomplete(req.body.index);
    res.end(JSON.stringify({status : 'ok'}));
}

exports.rename = (req, res) => {
    todoList.rename(req.body.index, req.body.name);
    res.end(JSON.stringify({status : 'ok'}));
}