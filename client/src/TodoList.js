import React, {Component} from 'react';
import './TodoList.css';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import Todos from './Todos';
import { Link } from 'react-router-dom';
import './App.css';

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

    componentWillMount () {

        console.log('TodoList id', this.props.listId, this.props.title);
    }

    addTodo (e, champs) {

        console.log('VERIF', this.props.title);

        e.preventDefault();
        
        if (champs.length > 0){

            let newTodo = {
                text: champs,
                id: '',
                listId: this.props.listId,
                completed: false
            };


            axios.post('/api/todos/addtodo', {
                text: champs,
                listId: newTodo.listId
            }).then((res) => {
                console.log('Todo ajoutée avec succès !');
                newTodo.id = res.data;
               // console.log(this.state.todos);

            }).catch((e) => {
                console.log('Todo non ajoutée !');
                console.log(e);
            });

            this.setState((prevState) => {
                console.log('Previous state', prevState);
                return {
                    todos: prevState.todos.data.concat(newTodo)
                }
            });

        }else{

        }
    }

    deleteTodo (id) {
        console.log(this.state);
        let filteredTodos = this.state.todos.data.filter( function (todo) {
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
        
        let todo = this.state.todos.data.filter( function (todo) {
            return (todo.id === id);
        })

        axios.post(`/api/todos/${id}`, {
            completed: todo[0].completed
        })
        .then((res) => {

            let temp = JSON.parse(JSON.stringify(this.state.todos.data))

            var index = this.state.todos.data.findIndex(t=> t.id === id);

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

    fetchTodos () {
    
        if (this.props.listId){
            //console.log('ID', this.props.listId);
            axios.get(`/api/todos/${this.props.listId}`)
            .then((todos) => {

                console.log(todos);

                this.setState(() => {
                    return {
                        todos: todos,
                        display: true
                    }
                });

            }).catch((e) => {
                console.log('fetch pas bien déroulé');
                console.log(e);
            })
        }

    }

    componentDidMount () {

        this.fetchTodos();
    }

    render () {
 
        if (!this.props.liste && this.state.todos.data && (this.props.theId === this.props.listId)){
            return (
                <div>
                    <Todos 
                        listId={this.props.id}
                        deleteTodo={this.deleteTodo}
                        validateTodo={this.validateTodo}
                        addTodo={this.addTodo}
                        entries={this.state.todos.data}
                    />                
                </div>
            )
        }
        return (
        <div>
            <span>{this.props.title}</span>
        </div>
        )
    }
};

export default TodoList;
