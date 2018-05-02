const mongoose = require('mongoose');
const { Todo } = require('./todo');



let ListeTodosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    collaborators: [{ // comme les users ...
        type: mongoose.Schema.Types.ObjectId
    }]
});

let ListeTodos = mongoose.model('ListeTodos', ListeTodosSchema);

module.exports = {
    ListeTodos
}