const JWT_SIGN_SECRET = '^&é"^mé&$ê)ze23f$&^$&é^pe345"okdeidzhj49oiuç_"éeéjuç_&é_poé&de';

let authenticate = (req, res, next) => {

    let { User } = require('../models/user');
    
    let token="";
    //let token = sessionStorage.getItem('token');

    User.findByToken(token)
    .then((user) => {
        if (!user)
            return Promise.reject();

        else {
            req.user = user;
            req.token = token;
            console.log('ok auth');
        }
       next();
    })
    .catch((err) => {
        res.render(err);
    });
}

module.exports = {
    authenticate,
    JWT_SIGN_SECRET
}