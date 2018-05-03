const express = require('express');
const _ = require('lodash');
const { mongoose } = require('../db/mongoose');
const { ListeTodos } = require('../models/listeTodos');


let createList = function (req, res) {
   
    let newList = new ListeTodos({
        title: req.body.title,
        creator: new mongoose.Types.ObjectId('123456789124')
    });

    console.log(newList);

    newList.save()
    .then ((newAdddedList) => {
        res.send(newAdddedList._id);
    }).catch ((e) => {
        res.json({
            'status': 'problème enregistrement liste de todos !',
            'probleme': e
        })
    });
};

let getLists = function (req, res) {

    ListeTodos.find({
        creator: new mongoose.Types.ObjectId('123456789124')
    }).then((resultat) => {
        console.log(resultat);
        res.send(resultat);
    }).catch((e) => {
        console.log('couldn t fetch lists');
        res.send(e);
    })
};


module.exports = {
    createList,
    getLists
}