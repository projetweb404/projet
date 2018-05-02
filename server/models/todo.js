const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema ({
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 120,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: Date.now()
    },
      
    list: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

let Todo = mongoose.model('Todo', TodoSchema);


module.exports = {
    Todo
}