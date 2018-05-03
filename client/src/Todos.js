import React, {Component} from 'react';
import FlipMove from 'react-flip-move';
import axios from 'axios';
import './Todos.css';

class Todos extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            todos: []
        };

        this.autoRender = this.autoRender.bind(this); 
        this.validate = this.validate.bind(this);
        this.add = this.add.bind(this);
        /*this.fetchTodos = this.fetchTodos.bind(this);*/
    }


    delete(id) {
       console.log('todo', this.state.todos);
        this.props.deleteTodo(id);
    }

    validate(id) {
        this.props.validateTodo(id);
    }

    add(e) {
        e.preventDefault();
        this.props.addTodo(e, this._inputElement.value);

        this._inputElement.value = "";
    }

/*
    fetchTodos (e) {

        alert('');

        console.log('goooonne');

        axios.get(`/api/todos/${this.props.listId}`)
        .then((resultat) => {
            console.log('lourd', resultat)
        }).catch((err) => {
            console.log(err);
        });
    }
*/
    autoRender (todo, i) {
        console.log('todo', todo.id);
        return (
            <li id={todo.id} key={i}>{todo.text}
                <button onClick={ () => {
                        this.props.deleteTodo(todo.id);
                    }} className="deleteTodo">
                </button>
                <button onClick={ () => {
                        this.props.validateTodo(todo.id);
                    }} className="validateTodo">
                </button>               
            </li>
        )

    }
    

    render () {
        
        let todoEntries = this.props.entries;
        
        let listTodos = todoEntries.map((t, i) => this.autoRender(t, i)); //on map through them pour les display un à un grace à notre methode

        return (

            <div className="container">
                <div className="todo-list" /*onLoad={this.fetchTodos}*/>
                    <form onSubmit={this.add} className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" placeholder="what r u gonna do ?" ref={(a) => this._inputElement = a}>
                            </input>
                        <button className="btn btn-primary my-2 my-sm-0" type="submit">add it</button>
                    </form>
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    <ul className="list-of-todos">
                        <FlipMove duration={250} easing="ease-out">
                            {listTodos}
                        </FlipMove>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Todos;