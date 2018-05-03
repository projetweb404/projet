import React, {Component} from 'react';
import TodoList from './TodoList';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Tasks.css'

class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todoLists: []
        };

        this.getLists = this.getLists.bind(this);
    }

    getLists () {
        
        axios.get('/api/todos/listTodos/')

        .then((lists) => {
            console.log(lists);
            this.setState((prevState) => {
                return {
                    todoLists: lists.data
                }
            })
        }).catch((e) => {
            console.log(e);
        })
    };

    componentDidMount () {
        
        this.getLists();
    };



    render () {
        console.log("nn une fois", this.props.keh);
        let lists = this.state.todoLists;
        //console.log(lists);


        if (this.props.milieu) {

            let id = this.props.id;

            console.log('l id', id);

            function find (element) {
                return element._id === id;
            }

           // let i = lists.findIndex(find);

            //console.log(i);

           // if (lists[i]) {
                return (
                    <div>
                        {lists.map((l, i) => <TodoList key={i} theId={id} milieu={this.props.milieu} title={lists[i].title} listId={lists[i]._id}/> )}
                    </div>
                )
           // }

        }



        return (

            <div>
                <ul className="nav flex-column in">
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Listes</span>
                        <a className="d-flex align-items-center text-muted" href="">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>                
                   {lists.map((l, i) => <Link to={`/list/${lists[i]._id}`} key={i} className="nav-link"><li key={i} className="nav-item" ><TodoList key={i} liste={true} title={lists[i].title} listId={lists[i]._id}/></li></Link>)}
                </ul>
            </div>
        )


    }
}

export default Tasks;
