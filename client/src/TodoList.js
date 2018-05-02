import React, {Component} from 'react';
import './TodoList.css';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import Todos from './Todos'

class TodoList extends Component {

    constructor(props){
        super(props);

        this.state = {
            todos: [],
            display: false
        };


        this.addTodo = this.addTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this);
        this.validateTodo = this.validateTodo.bind(this);
        this.fetchTodos = this.fetchTodos.bind(this);
        
    }

    addTodo (e) {
        e.preventDefault(); //enlever l'effet de rafraichissement du bouton
        
        if (this._inputElement.value.length > 0){
            let newTodo = {
                text: this._inputElement.value,
                id: '',
                completed: false
            };

            this.setState((prevState) => { //on veut changer le state du composant, car ajout
                return {
                    todos: prevState.todos.concat(newTodo) //on prend l'ancien state, on concat le new todo
                }
            });

            //let todoText = this._inputElement;

            axios.post('/api/todos/addtodo', {
                text: this._inputElement.value
            }).then((res) => {
                console.log('Todo ajoutée avec succès &!');
                newTodo.id = res.data; // quand on ajoute une todo, mongo associe un id unique, on le recupere ici pour nos besoin
                console.log(this.state.todos);
                //console.log(res.data);
            }).catch((e) => {
                console.log('Todo non ajoutée !');
                console.log(e);
            });

            this._inputElement.value = "";

        }else{

        }
    }

    deleteTodo (id) {
        console.log(this.state);
        let filteredTodos = this.state.todos.filter( function (todo) {
            return (todo.id !== id);
        })

        this.setState((prevState) => {
            return {
                todos: filteredTodos
            }
        });

        axios.delete(`/api/todos/${id}`);
    }

    validateTodo (id) {
        
        let todo = this.state.todos.filter( function (todo) {
            return (todo.id === id);
        })

        axios.post(`/api/todos/${id}`, {
            completed: todo[0].completed
        })
        .then((res) => {

            let temp = JSON.parse(JSON.stringify(this.state.todos))

            var index = this.state.todos.findIndex(t=> t.id === id);

            temp[index].completed = res.data.completed;

            this.setState({
                todos: temp 
            }) 

        }).catch((e) => {
            console.log('probleme ici !!');
        });
    }


    createList () {

        axios.post('/api/todos/', {title: 'URGENCES'})
        .then(() => {
            console.log('liste crée avec succès');
        }).catch((e) => {
            console.log('création liste a echouee');
        })

    }

    componentDidMount () {

        let todos = this.props.todos;

        this.setState({todos: todos});

        console.log(this.state);
    }

    
    fetchTodos (e) {
        e.preventDefault();
        console.log('ID', this.props.id);
        axios.get(`/api/todos/${this.props.id}`, {ids: this.props.todosIds})
        .then(() => {
            console.log('on les a fetch');
            this.setState({display: true});
        }).catch(() => {
            console.log(e);
        })
    }

    render () {
       
        if (this.state.display){
            return (

                <div>
                    <Todos listId={this.props.id}
                                deleteTodo={this.deleteTodo}
                                validateTodo={this.validateTodo}/>                
                <div>
                        <span onClick={this.fetchTodos}>{this.props.title}</span>
                    </div>
            </div>
            )
        }
        return (

        <div>
            <span onClick={this.fetchTodos}>{this.props.title}</span>
        </div>
        )
    }
};

export default TodoList;
