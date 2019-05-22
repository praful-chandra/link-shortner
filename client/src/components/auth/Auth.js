import React, { Component } from 'react'

export default class Auth extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           signIn : true,
           signUp : false
        }
      }


      toggleAuth=(e)=>{
          if(e){
            e.preventDefault();
          }

          this.setState({
            signIn:!this.state.signIn,
            signUp:!this.state.signUp
          })
      }

  render() {



    return (
      <div className="container">

      {this.state.signIn ? (
          <div className="authPage-signIn" >

          <h1>Sign In with Infrnt</h1>
          <form className="authPage-signIn-form">
            <input type="email" name="email" placeholder="email" id=""/>
            <input type="text" name="password" placeholder="password" id=""/>

            <input type="submit" className="authPage-signIn-form-btn" value="Log In"/>
          </form>
    <div className="authPage-signIn-links">    
    <a href="#"><u>Recover Password</u></a>
    <a href="#" onClick={this.toggleAuth}> New to Mysterious Affair? <u>Create Account!</u></a>

    </div>
  </div>
      ):(
        <div className="authPage-signIn" >

        <h1>Sign Up with Infrnt</h1>
        <form className="authPage-signIn-form">
          <input type="email" name="email" placeholder="email" id=""/>
          <input type="password" name="password" placeholder="password" id=""/>
          <input type="text" name="mobno" placeholder="mobile Number" id=""/>   

          <input type="submit" className="authPage-signIn-form-btn" value="Log In"/>
        </form>
          <div className="authPage-signIn-links">
          <a href="#" onClick={this.toggleAuth}> Already have account<u>LogIn</u></a>

 
  </div>
</div>
      )}


      </div>
    )
  }
}
