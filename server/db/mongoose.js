const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //Pour pouvoir utiliser les promesses avec mongoose == beaucoup plus fluide et lisible

mongoose.connect('mongodb://groupe:grgrgr123456@ds263109.mlab.com:63109/sss').then(() => {
    console.log('connecté à la base de données !');
}).catch((e) => {
    console.log('echec connexion base de données');
});



module.exports = {
    mongoose
}