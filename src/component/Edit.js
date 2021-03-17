import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

class PostList extends React.Component {
 
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
    post : []
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
    formData.append("id", this.props.match.params.id );
    this.setState({ inputKey: Date.now() });
   // console.log( this.state.title )

   
    axios.post(`http://127.0.0.1:8000/api/edit`, formData, { 
      headers: {
        'Authorization' : localStorage.getItem("token")
      } 
    })
      .then(res => {
         this.setState({ massage : 'Updated' })
         this.props.history.push('/home')
      })
      .catch( error =>{
        if (error.response.status === 400 ) {
             this.setState({ massage : 'Something wrong' });
        }
         console.log( error )
      })


     

  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/edit/`+ this.props.match.params.id, { 
      headers: {
        'Authorization' : localStorage.getItem("token")
      } 
    })
      .then(res => {
         this.setState({ title : res.data.post.title })
         this.setState({ description : res.data.post.description })
         this.setState({ price : res.data.post.price })
         this.setState({ image : res.data.post.image })
         this.setState({ post : res.data.post})
    
      })
      .catch( err =>{
        console.log( err )
      })
  }

  
  render() {
  	
  	const btn  = {
        margin: "10px 35px",
        display: 'inline'
      };

    return (
     
      <div className="container ml-auto">


      <h1>Edit Page</h1>
      {  this.state.massage }
      
      { this.state.post.length != 0 && 

      <form onSubmit={this.handleSubmit}>
       <div className="col-sm-12">
              <label htmlFor="inputEmail" className="col-sm-4 col-form-label">Title</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.changeTitle} id="inputEmail" />
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
                <input type="file" key={this.state.inputKey}  className="form-control" onChange={this.changeFile} />
              </div>
            </div>

        <button style= { btn } className="btn btn-info" >Submit</button>

        	
      		    <img height="100" weight='100' src={`http://127.0.0.1:8000/uploads/`+ this.state.image }  />
      	     
         </form>
        }
    </div>


    );
}}

export default PostList;
