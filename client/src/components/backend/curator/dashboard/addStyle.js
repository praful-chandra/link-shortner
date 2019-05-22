import React, { Component } from 'react';
import {connect} from "react-redux";
import {addStyles} from "../../../../actions/curatorActions";

class AddStyle extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         name : "",
         description : "",
         styleCover :""
      }
    }
    
    onChange = e=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handelFormSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData();

        formData.append("name",this.state.name);
        formData.append("description",this.state.description);
        formData.append("styeCover",this.state.styleCover);

        this.props.addStyles(formData);

        
        
    }

  render() {
    return (
      <div className="addStyle">
        <div className="authPage-signIn  adminAuth addStyle-body" >
    
    <h1>Add style</h1>
    <form className="authPage-signIn-form" onSubmit={this.handelFormSubmit}>
      <input type="text" name="name" placeholder="title" id="styleTitle" value={this.state.name}  onChange={this.onChange}required/>    
      <textarea className="bigger" name="description" id="styleDescription" 
      cols="30" rows="10" placeholder="enter description here"
      value={this.state.description}  onChange={this.onChange} />
    <input type="file" name="styleCover" id="styleCover"  value={this.state.styleCover} onChange={this.onChange} />

      <input type="submit" className="authPage-signIn-form-btn adminAuth-btn" value="ADD Style"/>
    </form>
    
    </div>
      </div>
    )
  }
}


export default connect(null,{addStyles})(AddStyle)