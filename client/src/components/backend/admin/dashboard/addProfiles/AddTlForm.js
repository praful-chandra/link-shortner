import React, { Component } from 'react'
import {connect} from "react-redux";
import {addTl} from "../../../../../actions/adminActions";
 class AddTlForm extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      newProfile : {
        tlemail : "",
        tlpassword : "",
        tlname : ""
      }
    }
  }
  


  handleAddFormSubmit = (e)=>{
    e.preventDefault();
  this.props.addTl(this.state.newProfile);    
  }
  inputChanged = (e)=>{
    this.setState({
        newProfile:{
          ...this.state.newProfile,
          [e.target.name] : e.target.value
        }
    })
}

  render() {
    return(
      <div className="adminDash-addProfile">
        <div className="container authPage-signIn adminAuth adminDash-addProfile-container">
        <i className="fas fa-times-circle adminDash-addProfile-close" style={{cursor : "pointer"}} onClick={this.props.viewCards}></i>              
  
        <h1>Add new TL</h1>
   
        <form className="authPage-signIn-form" onSubmit={this.handleAddFormSubmit}>
    <input type="email" name="tlemail" placeholder="email" id="tlEmail" onChange={this.inputChanged} required value={this.state.newProfile.tlemail}/>
    <input type="password" name="tlpassword" placeholder="password" id="tlPassword" onChange={this.inputChanged} required value={this.state.newProfile.tlpassword}/>
    <input type="text" name="tlname" placeholder="Name" id="tlName" onChange={this.inputChanged} required value={this.state.newProfile.tlname}/>
  
    <input type="submit" className="authPage-signIn-form-btn adminAuth-btn" value="CREATE" />
    </form>
        </div>
  
      </div>
    )
  }
}

export default connect(null,{addTl})(AddTlForm)