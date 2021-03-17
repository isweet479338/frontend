import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import SignIn  from './component/signIn.js'
import SignUp  from './component/signUp.js'
import Home  from './component/Home.js'
import Edit  from './component/Edit.js'

class App extends React.Component {

  render() {
    
      const btn  = {
        margin: "10px 35px",
        display: 'inline'
      };

    return (
      
        <Router>

         <Switch>

          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/edit/:id" component={Edit} />
      

  
        </Switch>

      </Router>
    );
}}

export default App;
