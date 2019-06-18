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

exports.deleteTask = (req, res) => {
    todoList.deleteTask(req.body.index);
    res.end(JSON.stringify({status : 'ok'}));
}

exports.deleteCompletedTasks = (req, res) => {
    todoList.deleteCompletedTasks();
    res.end(JSON.stringify({status : 'ok'}));
}

exports.returnToUncompletedTodo = (req, res) => {
    todoList.returnToUncompletedTodo(req.body.index);
    res.end(JSON.stringify({status : 'ok'}));
}

exports.changeTaskName = (req, res) => {
    todoList.changeTaskName(req.body.index, req.body.name);
    res.end(JSON.stringify({status : 'ok'}));
}