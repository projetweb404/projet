import  React, {Component}  from "react";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false
        }

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login (e) {
        e.preventDefault();
        console.log(this.state);

        axios.post('api/users/login', {
            userCredentials: this.state
        })
        .then((res) => {
            console.log(res);
            if (res.data === "erreur login"){
                throw new Error ('res.data');
            }
            sessionStorage.setItem('userData', res.data.token);
            this.setState({redirect: true});
        })
        .catch((e) => {
            this.setState({redirect: false});
            console.log(e);
        })
    };

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    };

    render() {

        if (this.state.redirect) {
            return (<Redirect to={"/"} />)
        }
        return (
            <div>
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Se connecter</h1>
                    <label htmlFor="inputEmail" className="sr-only">Adresse mail</label>
                    <input name="email" type="email" id="inputEmail" className="form-control" placeholder="Adresse mail" onChange={this.onChange} required autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Mot de passe</label>
                    <input name="password" type="password" id="inputPassword" className="form-control" placeholder="Mot de passe" onChange={this.onChange} required />
                    <div className="checkbox mb-3">
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.login} type="submit">Connexion</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                </form>
            </div>
            )
        }
}

export default LoginForm;


