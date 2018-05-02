import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from './App';


let destination = document.querySelector("#container"); // ?????

ReactDOM.render (
        <App/>,
    destination
);

/*
ReactDOM.render (
    <BrowserRouter>
        <Route path="/" component={TodoList}>
        </Route>
    </BrowserRouter>,
    destination
);
*/