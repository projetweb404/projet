const express = require('express');
const _ = require('lodash');
const { mongoose } = require('../db/mongoose');
const { Todo } = require('../models/todo');
const { ObjectId } = require('mongodb');

let getAll = function (req, res) {
    
}

let addTodo = function (req, res) {

    console.log('C est là id', req.body.listId);
    console.log('C est là text', req.body.text);

    let newTodo = new Todo({
        text: req.body.text,
        list: new mongoose.Types.ObjectId(req.body.listId),
        creator: new mongoose.Types.ObjectId('123456789124')
    });

    console.log(newTodo);

    newTodo.save()
    .then ((todoAddedTodo) => {
        res.send(todoAddedTodo._id);

    }).catch ((e) => {
        res.json({
            'status': 'problème enregistrement todo !',
            'probleme': e
        })
    });
};

let deleteTodo = function (req, res) {

    Todo.findOneAndRemove({
        _id: req.params.id
    }).then(() => {
        res.send({'statut':'todo supprimée'});
    }).catch((e) => {
        res.send(e);
    })
};   


let validateTodo = function (req, res) {

    Todo.findByIdAndUpdate(req.params.id, { $set: {
         completed: !req.body.completed
        }}, {new: true})
    .then((resultat) => {
        res.json({
            'status':'todo updated',
            completed: resultat.completed
        })
    }).catch((e) => {
        res.json({'statut':'pas updated', 'error': e});
    });
}

let getTodos = function (req, res) {

    Todo.find({
        list: new mongoose.Types.ObjectId(req.params.id)
    }).then((resultat) => {
        console.log(resultat);
        res.send(resultat);
    }).catch((e) => {
        res.send(e);
        console.log(e);
    })
}


module.exports = {
    addTodo,
    deleteTodo,
    validateTodo,
    getTodos
}