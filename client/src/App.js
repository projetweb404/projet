import React, {Component} from 'react';
import { BrowserRouter as Router, Route , Link} from 'react-router-dom';
import SignUp from './SignUp';
import './App.css'
import Tasks from './Tasks';
import LoginForm from './LoginForm';
import Todos from './Todos';
import TodoList from './TodoList';


class App extends Component {

    render () {
        return (
            <Router>

                <div id="router-wrapper"className="container-fluid go">

 {/************************************ A TOUJOURS AVOIR *******************************************************************************/}

                    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/profile/">ORGUENIZED</Link>
                        <ul className="navbar-nav px-3">
                            <li className="nav-item text-nowrap">
                                <Link className="nav-link" to="/logout/">Déconnexion</Link>
                            </li>
                        </ul>
                    </nav>  

                    <div className="col-md-2">
                        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky">
                                    <Tasks keh={'oui'}/>
                            </div>
                        </nav>
                    </div>

{/************************************ A TOUJOURS AVOIR *******************************************************************************/}                          
                        <br/>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">

                        
                       {/*<Route path="/todos/" exact strict component={Tasks}/>                    
                        <Route path="/login/" exact strict render={
                            () => {
                                return (<LoginForm/>);
                            }
                        }/>
                        <Route path="/signup/" exact strict render={
                            () => {
                                return (
                                    <div className="col-md-3" style={{background: 'blue'}}>
                                        <SignUp/>
                                    </div>
                                )
                            }
                        }/>
                    */}
                        <Route path="/list/:id" exact strict render={
                            ({match}) => {
                                return (
                                    <div>                    
                                        <Tasks id={match.params.id} milieu={true}/>
                                  </div>
                                )
                            }
                        }/> 
                        
                    </main>
            </div>                               
            </Router>
        )
    }
}

export default App;