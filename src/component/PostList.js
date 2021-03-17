import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class PostList extends React.Component {
 
 constructor(props) {
    super(props)
     if ( localStorage.getItem('token') === null  ) { this.props.history.push('/') }
}

  render() {
    return (
     
      <tr key={ this.props.data.id } >
      <th scope="row">1</th>
      <td> { this.props.data.title }</td>
      <td>{ this.props.data.price }</td>
      <td>{ this.props.data.description }</td>
      <td><img height="50" weight='50' src={`http://127.0.0.1:8000/uploads/`+ this.props.data.image }  /></td>
  
        <td>
        <Link className="btn btn-info"  to={`/edit/`+ this.props.data.id} >Update</Link>
        <button className="btn btn-danger" onClick={() => this.props.delete(this.props.data.id) } >Delete</button>
      </td>
    </tr>


   
    );
}}

export default PostList;
