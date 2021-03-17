import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import axios from 'axios';
import PostList from './PostList.js';

import 'bootstrap/dist/css/bootstrap.min.css';



class Home extends React.Component {
  constructor(props) {
    super(props)
     if ( localStorage.getItem('token') === null  ) { this.props.history.push('/') }
}

  state = {
    massage : [],
    title: '',
    description: '',
    price: '',
    file: '',
    inputKey: Date.now(),
    post : [],
    redirect : false
  }
  
  changeTitle = event => {
    this.setState({ title: event.target.value });
  }
  changeDescription = event => {
    this.setState({ description: event.target.value });
  }
  changePrice = event => {
    this.setState({ price: event.target.value });
  }
  changeFile = event => {
    this.setState({ file: event.target.files[0] });
    
  }

  handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', this.state.file);
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    this.setState({ inputKey: Date.now() });


    axios.post(`http://127.0.0.1:8000/api/create`, formData, { 
      headers: {
        'Authorization' : localStorage.getItem("token")
      } 
    })
      .then(res => {
         this.setState({ massage : Object.values(res.data) })
          this.props.history.push('/home')
      })
      .catch( error =>{
        if (error.response.status === 400 ) {
             this.setState({ massage : 'Something wrong' });
        }
      })


       this.setState({ title: ''});
       this.setState({ description: '' });
       this.setState({ price: '' });
       this.setState({ file: '' });

  }

  componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/post`, { 
      headers: {
        'Authorization' : localStorage.getItem("token")
      } 
    })
      .then(res => {
         this.setState({ post : res.data.post })
      })
      .catch( err =>{
        console.log( err )
      })
  }

PostShow(){
 return  this.state.post.map( (d,i) => <PostList data={ d } delete={ this.DeletePost }  key={ i } /> )
}


DeletePost = (id) => {
  axios.delete(`http://127.0.0.1:8000/api/delete/` + id, { 
      headers: {
        'Authorization' : localStorage.getItem("token")
      } 
    })
      .then(res => {
         this.setState({ massage : 'Post Deleted' })
         this.setState({ post : res.data.post })
         
      })
      .catch( err =>{
        console.log( err )
      })

}
LogOut = () =>{
  localStorage.removeItem('token')
  this.props.history.push('/')
}
 
  render() {
     


    const btn  = {
        margin: "10px 35px",
        display: 'inline'
      };

    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/home' component={Home} />;
     }


    return (
      <div className="container ml-auto">


      <h1>Home</h1>
      <button className="btn btn-danger" onClick={ this.LogOut } >Log Out</button>
      {  this.state.massage }
<form onSubmit={this.handleSubmit}>
       <div className="col-sm-12">
              <label htmlFor="inputEmail" className="col-sm-4 col-form-label">Title</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" value={this.state.title} onChange={this.changeTitle} id="inputEmail" />
              </div>
            </div>

            <div className="col-sm-12">
              <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea className="form-control" value={this.state.description} onChange={this.changeDescription} />

               
              </div>
            </div>

              <div className="col-sm-12">
              <label htmlFor="inputEmail" className="col-sm-4 col-form-label">Price</label>
              <div className="col-sm-8">
                <input type="number" className="form-control" value={this.state.price} onChange={this.changePrice} id="inputEmail" />
              </div>
            </div>

            <div className="col-sm-12">
              <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Image</label>
              <div className="col-sm-8">
                <input type="file" key={this.state.inputKey} className="form-control" onChange={this.changeFile} />
              </div>
            </div>

  <button style= { btn } className="btn btn-info" >Submit</button>

   </form>

            <h2>Old Post</h2>

<table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Desc</th>
      <th scope="col">Image</th>
     
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>


    { this.PostShow() }


  </tbody>
</table>

        </div>
    );
}}

export default Home;
