import React, {Component} from 'react';
import FlipMove from 'react-flip-move';
import axios from 'axios';

class Todos extends Component {
    constructor(props) {
        super(props);
        

        this.autoRender = this.autoRender.bind(this); 
        this.validate = this.validate.bind(this);
    }


    delete(id) {
        this.props.deleteTodo(id);
    }

    validate(id) {
        this.props.validateTodo(id);
    }


    fetchTodos (id) {
        console.log('goooonne');

        axios.get(`/api/todos/${this.props.listId}`)
        .then((resultat) => {
            console.log('lourd', resultat)
        }).catch((err) => {
            console.log(err);
        });
    }
    
    autoRender (todo) {
        console.log(todo.id);
        return (
            <li id={todo.id} key={todo.id}>{todo.text}
                <button onClick={ () => {
                        this.delete(todo.id);
                    }} className="deleteTodo">
                </button>
                <button onClick={ () => {
                        this.validate(todo.id);
                    }} className="validateTodo">
                </button>               
            </li>
        )

    }
    

    render () {
        
        fetch(this.props.id);
        //let todoEntries = this.props.entries; //on récupère les todos
        
       // let listTodos = todoEntries.map((t) => this.autoRender(t)); //on map through them pour les display un à un grace à notre methode

    // let listTodos = 
        return (

            <div>
                <div className="todo-list">
                    <form onSubmit={this.addTodo} className="form-inline my-2 my-lg-0">
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
            </div>
                <ul className="list-of-todos">
                    <FlipMove duration={250} easing="ease-out">
                        {/*listTodos*/}
                    </FlipMove>
                </ul>
        </div>






        )
    }
}

export default Todos;