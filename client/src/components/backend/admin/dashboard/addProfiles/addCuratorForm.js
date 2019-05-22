import React, { Component } from 'react'
import {connect} from "react-redux";
import {addCurator} from "../../../../../actions/adminActions";
 class AddCuratorForm extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      newProfile : {
        email : "",
        password : "",
        name : "",
        tlCode : ""
      },
      fromTl : false
    }
  }
  
  componentDidMount(){
     // console.log(this.props.tlCode);
      if(this.props.tlCode){
          this.setState({
              newProfile:{
                  ...this.state.newProfile,
                  tlCode : this.props.tlCode
              },
              fromTl : true
          })
      }
  }


  handleAddFormSubmit = (e)=>{
    e.preventDefault();
 this.props.addCurator(this.state.newProfile);  
   
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
  
        <h1>Add new Curator</h1>
   
        <form className="authPage-signIn-form" onSubmit={this.handleAddFormSubmit}>
    <input type="email" name="email" placeholder="email" id="tlEmail" onChange={this.inputChanged} required value={this.state.newProfile.email}/>
    <input type="password" name="password" placeholder="password" id="tlPassword" onChange={this.inputChanged} required value={this.state.newProfile.password}/>
    <input type="text" name="name" placeholder="Name" id="tlName" onChange={this.inputChanged} required value={this.state.newProfile.name}/>
{this.state.fromTl ? (
    <input type="text" name="tlCode" placeholder="tlCode" id="tlCode" onChange={this.inputChanged} required value={this.state.newProfile.tlCode} disabled  />

) : (
    <input type="text" name="tlCode" placeholder="tlCode" id="tlCode" onChange={this.inputChanged} required value={this.state.newProfile.tlCode}  />

)}
    <input type="submit" className="authPage-signIn-form-btn adminAuth-btn" value="CREATE" />
    </form>
        </div>
  
      </div>
    )
  }
}

export default connect(null,{addCurator})(AddCuratorForm)