import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  Link
} from "react-router-dom";


import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';



class SignIn extends React.Component {
  constructor(props) {
    super(props)
}
  state = {
    msg: '',
   
    email: '',
    password: ''
  }
  
  changeEmail = event => {
    this.setState({ email: event.target.value });
  }
  changePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();



    const user = {
      email: this.state.email,
      password: this.state.password
     
    };

    axios.post(`http://127.0.0.1:8000/api/login`,  user )
      .then(res => {
         this.setState({ msg : 'Login Success.' });
          const token =  'Bearer '+ res.data.token ;
          console.log(token)
         localStorage.setItem('token', token);

         this.props.history.push('/home')
      })
      .catch( error=>{
        if (error.response.status === 400 ) {
        this.setState({ msg : 'Email Or Password was wrong.' });
        }
      })
  }


  render() {
   
      const btn  = {
        margin: "10px 35px",
        display: 'inline'
      };

    return (
      <div className="container ml-auto">

      <h1>Login Form</h1>
      { this.state.msg }
        
        <form onSubmit={this.handleSubmit}>
         <div className="row">

            <div className="col-sm-12">
              <label htmlFor="inputEmail" className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input type="text" className="form-control"  onChange={this.changeEmail} id="inputEmail" />
              </div>
            </div>

            <div className="col-sm-12">
              <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Password</label>
              <div className="col-sm-8">
                <input type="password" className="form-control"  onChange={this.changePassword} id="inputPassword" />
              </div>
            </div>

            <div>
              <button style= { btn } className="btn btn-info" >Login</button>
                <br />

                <Link style= { btn } to="/signup">Registration</Link>

            </div>

        

        </div>

         </form>
        </div>
    );
}}

export default SignIn;
