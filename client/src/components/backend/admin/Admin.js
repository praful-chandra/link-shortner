import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";
import {loginAdmin,getCurrentAdmin} from "../../../actions/adminActions"; 


 class Admin extends Component {
constructor(props) {
  super(props)

  this.state = {
     email : "",
     password : "",
     admin :{
         isAuthenticated : false
     }
  }
}

componentDidMount(){
 if(localStorage.jwtToken){
  // console.log(localStorage.jwtToken);
 //  console.log(axios.defaults.headers.common['Authorization']);
   
 this.props.getCurrentAdmin(localStorage.jwtToken);
 
 }
  
}

componentWillReceiveProps(nextProps){
if(nextProps.admin){
    this.setState({
        admin : nextProps.admin
    })
}
}

inputChanged = (e)=>{
    this.setState({
        [e.target.name] : e.target.value
    })
}

handleFormSubmit = e=>{
    e.preventDefault();

    const loginDetails = {
        email : this.state.email,
        password : this.state.password
    }

    this.props.loginAdmin(loginDetails);

    // this.setState({
    //     email : "",
    //     password : ""
    // });
}


  render() {

    if(this.state.admin.isAuthenticated){
    return  <Redirect to="/backend/admin/dashboard"/>
    }

    return (
      <div className="container">
         <div className="authPage-signIn adminAuth" >

<h1>Sign In with Infrnt</h1>
<form className="authPage-signIn-form" onSubmit={this.handleFormSubmit}>
  <input type="email" name="email" placeholder="email" id="adminEmail" onChange={this.inputChanged} required value={this.state.email}/>
  <input type="password" name="password" placeholder="password" id="adminPassword" onChange={this.inputChanged} required value={this.state.password}/>

  <input type="submit" className="authPage-signIn-form-btn adminAuth-btn" value="Log In"/>
</form>

</div>

{this.state.admin.adminError && this.state.admin.adminError !== "notLoggedIn" ? (
    <div className="alert alert-danger bigger" role="alert">
  {this.state.admin.adminError}
</div>
) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    admin : state.admin
})

export default connect(mapStateToProps,{loginAdmin,getCurrentAdmin})(Admin);