import React, {Component} from 'react';
import axios from 'axios';

class SignupForm extends Component {

    constructor (props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            birth_date: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    validatePassword(){
        
        let password = document.getElementById("password");
        let confirm_password = document.getElementById("confirm_password");
        
        if (password.value !== confirm_password.value) {
            confirm_password.setCustomValidity("Les mots de passe ne correspondent pas !");
            return false;
        } else {
            confirm_password.setCustomValidity('');
            return true;
        }
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value }); // on recupere le nom de l'e target (l'input ici) et on dit des que tu changes change l'etat
       /* 
        password.onchange = validatePassword;
        confirm_password.onkeyup = validatePassword;
        */
    }

    

    onSubmit (e) {
        e.preventDefault();
       if ( !this.validatePassword())
            console.log("");
        else {
        
       // console.log("submitted");
        console.log(this.state.birth_date);
        
        axios.post('/api/users/signup', {user: this.state})
        .then((res) => {
            //console.log(res.data);
            axios.post('/api/users/signup/confirm', {email: this.state.email})
            .then(() => {
                console.log('mail de confimation envoyé');
            }).catch((e) => {
                console.log(e);
            })
        });
    }
    }

    render() {
        return (
            <div className="form-group">
                <form onSubmit={this.onSubmit}>
                    <h1>Crée toi un compte s'il te plaît</h1>
                    <label className="control-label">Pseudo</label>

                    <input type="text" name="username" value={this.state.username} className="form-control" placeholder="Votre pseudo"
                        onChange={this.onChange}
                    />
                    <input type="text" name="email" value={this.state.email} className="form-control" placeholder="Votre mail"
                        onChange={this.onChange}
                    />
                    <input type="date" name="birth_date" value={this.state.birth_date} className="form-control" placeholder="Votre date de naissance"
                        onChange={this.onChange}
                    />                    
                     <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                        onChange={this.onChange}
                    />
                    <input type="password" id="confirm_password" name="confirm_password" className="form-control" placeholder="Confirm password"
                        onChange={this.onChange}
                    />                   
                <button className="btn btn-primary btn-lg"></button>
                </form>
            </div>
        )
    }
    
}






export default SignupForm;