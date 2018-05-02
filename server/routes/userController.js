const express = require('express');
const _ = require('lodash');
const { User } = require('../models/user');
const { mongoose } = require('../db/mongoose');

let { sendMail } = require('../mailer/mailer');


login = function (req, res) {

        console.log('Body', req.body);
        let credentials = _.pick(req.body.userCredentials, ['email', 'password']);
        console.log(credentials);
        User.findByCredentials(credentials)
        .then((user) => {
            console.log('user:', user);
            user.genAuthToken()
            .then((token) => {
                res.json({
                    loggedIn: true,
                    token: token
                });
            })
        }).catch((e) => {
            console.log(e);
            res.send('erreur login');
        });

};

let signup = function (req, res) {

    if (req.method === 'GET')
        res.json({'page':'signup'});

    else if (req.method === 'POST'){
        console.log(req.body);
        let newUserInfos = _.pick(req.body.user, ['username', 'email', 'password', 'birth_date']);
        console.log(newUserInfos);

        let newUser = new User(newUserInfos);

        newUser.save()
        .then((newRegisteredUser) => {
            res.json({
                'username':newRegisteredUser.username,
                'status': 'user enregistré avec succès !'
            });
        }).catch ((e) => {
            res.json({
                'status': 'problème enregistrement user !',
                'probleme': e
            })
        });
    }
};


let confirmRegistration = function (req, res) {
    
    sendMail(req.body.email);
    res.send('mail envoyé');
}

module.exports = {
    login,
    signup,
    confirmRegistration
}