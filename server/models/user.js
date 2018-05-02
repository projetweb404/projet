
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = '^&é"^mé&$ê)ze23f$&^$&é^pe345"okdeidzhj49oiuç_"éeéjuç_&é_poé&de';

/*** GERER LES ERREURS DE SAISIE AUTREMENT QU'AVEC DES FICHIERS ... ***/

let UserSchema = new mongoose.Schema ({ // comme le nom l'indique on crée une sorte de class User avec ses propriétés

    username: {
        type: String,
        required: true,
        trim: true, // enlever les espaces indésirables
        minlength: 2,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unqiue: true,
        validate: { // voir regex ......
            validator: validator.isEmail, // inutile peut être cause des verifs faite au niveau du signup form
            message: 'email is not valid'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        //tokens // A VOIR ..................... 
    },

    birth_date: {
        type: String, // voir s'il n'existe pas d'autre type !!!!!!,
        required: true,
        trim: true
    },
    token: {
        type: String
    } 

});


UserSchema.statics.findByCredentials = function (credentials) {
    let user = this;

    return User.findOne({
        email: credentials.email,
    })
    .then((user) => {
        if (!user)
            return Promise.reject(new Error("user introuvable"));

            return new Promise ((resolve, reject) => {

                bcrypt.compare(credentials.password, user.password, (err, same) => {
                    
                    if (same)
                        resolve(user);
                    else
                        reject();
                })
            });
    }).catch((e) => {
        //throw new Error(e);
        return Promise.reject(new Error("user introuvable"));
    });
}

UserSchema.statics.findByToken = function (token) {
    let user = this;
    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SIGN_SECRET);
    }catch(error) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token
    });

};


UserSchema.methods.genAuthToken = function () {
    let user = this;

    let token = jwt.sign({
                _id: user.id
                },
                JWT_SIGN_SECRET,
                {
                    expiresIn: '1h'
                });
 
   user.token = token;
   console.log(user.token);

    return new Promise ((resolve, reject) => {
        user.save()
        .then((user) => {
            if (user)
                resolve(token);
            else
                reject();
        }).catch((e) => {
            res.status(400).send('Token non sauvegardé');
        });
    });
};


UserSchema.pre('save', function(next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
        
    } else {
        next();
    }
});

let User = mongoose.model('User', UserSchema); // maintenant qu'on a le schema, on crée une "classe" à partir de celui-ci

module.exports = {

    User
}