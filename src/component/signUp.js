import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class SignUp extends React.Component {

  state = {
    name : '',
    email : '',
    password : '',
    password_confirmation : '',
    msg : '',
    massage : '',
  }

  handelChange = (e) => {
     const { name, value } = e.target
     this.setState({ [name] : value })
  }


  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
     
    };

    axios.post(`http://127.0.0.1:8000/api/register`,  user )
      .then(res => {
       
        this.setState({ massage : Object.values(res.data) })
      
      })
      .catch( error=>{
         if (error.response.status === 400 ) {
         this.setState({ massage : 'Something wrong' })
        }
       
      })


      this.setState ({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
     
      })


  }



  render() {

      const btn  = {
        margin: "10px 35px",
        display: 'inline'
      };

    return (
        <div className="container ml-auto">

      <h1>Registration Form</h1>
      { this.state.msg }
      { this.state.massage }


        <form onSubmit={this.handleSubmit}>
        <div className="row">
        <div className="col-sm-12">
          <label htmlFor="inputEmail" className="col-sm-4 col-form-label">Name</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handelChange} id="inputEmail" />
          </div>
        </div>

        <div className="col-sm-12">
          <label htmlFor="inputEmaila" className="col-sm-4 col-form-label">Email</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handelChange} id="inputEmaila" />
          </div>
        </div>


   
        <div className="col-sm-12">
          <label htmlFor="inputEmailaa" className="col-sm-4 col-form-label">Password </label>
          <div className="col-sm-8">
            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handelChange} id="inputEmailaa" />
          </div>
        </div>

        <div className="col-sm-12">
          <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Password Confirmation</label>
          <div className="col-sm-8">
            <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handelChange} className="form-control" id="inputPassword" />
          </div>
        </div>

        <div>
          <button style= { btn } className="btn btn-info" >Sign Up</button>
            <br />
          <a style= { btn } href="/"  >Login</a>
        </div>

        </div>

       </form>

      </div>
    );
}}

export default SignUp;
