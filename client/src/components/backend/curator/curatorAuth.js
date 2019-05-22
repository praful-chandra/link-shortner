import React, { Component } from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


import {loginCurator,getCurrentCurator} from "../../../actions/curatorActions";

 class curatorAuth extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
          email : "",
          password: "",
         curator : {
             isAuthenticated : false
         }
      }
    }

    componentDidMount(){
        if(localStorage.jwtToken && !this.state.curator.isAuthenticated){
  
        this.props.getCurrentCurator(localStorage.jwtToken);
        
        }
         
       }
    

    componentWillReceiveProps(nextProps){
        if(nextProps.curator){
            this.setState({
                curator : nextProps.curator
            })
        }
        }

    handelFormSubmit = (e)=>{
        e.preventDefault();
        const curator={
            email : this.state.email,
            password: this.state.password
        }

        this.props.loginCurator(curator);
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

  render() {
    return (
        <div className="container">
        {this.state.curator.isAuthenticated ? (<Redirect to="/backend/curator/dashboard" />) : null}
           <div className="authPage-signIn  adminAuth" >
    
    <h1>Sign In as Curator</h1>
    <form className="authPage-signIn-form" onSubmit={this.handelFormSubmit}>
      <input type="email" name="email" placeholder="email" id="curatorEmail" value={this.state.email} onChange={this.handleChange} required/>    
      <input type="password" name="password" placeholder="password" id="curatorPassword" value={this.state.password}  onChange={this.handleChange} required/>
    
      <input type="submit" className="authPage-signIn-form-btn adminAuth-btn" value="Log In"/>
    </form>
    
    </div>
    {this.state.curator.curatorError && this.state.curator.curatorError !== "notLoggedIn" ? (
    <div className="alert alert-danger bigger" role="alert">
  {this.state.curator.curatorError}
</div>
) : null}
        </div>
    )
  }
}

const mapStateToProps = state=>({
curator : state.curator
})

export default connect (mapStateToProps,{loginCurator,getCurrentCurator})(curatorAuth)
