const express = require('express');
const userController = require('./routes/userController');
const todoController = require('./routes/todoController');
const listTodosController = require('./routes/listTodosController')
const { authenticate } = require('./middlewares/authenticate');

let router = (function () {
    
    let apiRouter = express.Router();
    /*
    apiRouter.use('/api/todos/addtodo', authenticate);
    apiRouter.use('/api/todos/:id', authenticate);
    apiRouter.use('/api/todos/', authenticate);
    apiRouter.use('/api/todos/listTodos/', authenticate);
    */

    apiRouter.route('/login/api/users/login').post(userController.login);
    apiRouter.route('/api/users/signup').post(userController.signup);

    apiRouter.route('/api/todos/').post(listTodosController.createList);
    apiRouter.route('/api/todos/listTodos/').get(listTodosController.getLists);
    //apiRouter.route('/api/todos/listTodos/').delete(listTodosController.getLists);

    apiRouter.route('/api/todos/addtodo').post(todoController.addTodo);
    apiRouter.route('/api/todos/:id').delete(todoController.deleteTodo);
    apiRouter.route('/api/todos/:id').post(todoController.validateTodo);
    apiRouter.route('/api/todos/:id').get(todoController.getTodos);


    apiRouter.route('/api/users/signup/confirm').post(userController.confirmRegistration);
    
    
    

    return apiRouter;
})();

module.exports = {
    router
}