const mailer = require("nodemailer");

let smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "projetweb404@gmail.com",
        pass: "projetweb4041"
    }
});


    sendMail = function (email) {
        let mail = {
            from: "projetweb404@gmail.com",
            to: `${email}`,
            subject: "Bienvenue !",
            html: "Votre inscription a bien été prise en compte, vous pouvez dès à présent vous connecter à votre espace personnel"
        }

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
                console.log("Erreur lors de l'envoie du mail!");
                console.log(error);
            }else{
                console.log("Mail envoyé avec succès!")
            }
            smtpTransport.close();
        });

    }

    module.exports = {
        sendMail
    }