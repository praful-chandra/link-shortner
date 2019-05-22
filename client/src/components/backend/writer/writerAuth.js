import React,{Component} from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {loginWriter,getCurrentWriter} from "../../../actions/writerActions";




 class writerAuth extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       writer : {
         isAuthenticated : false
       }
    }
  }
  

  componentDidMount(){
    
    if(localStorage.jwtToken && !this.state.writer.isAuthenticated){
      this.props.getCurrentWriter(localStorage.jwtToken);
      
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.writer){
        this.setState({
            writer : nextProps.writer
        })
    }
    }

  render() {
    
    const handelFormSubmit = e=>{

      e.preventDefault();
  const data = {
      email : document.getElementById("writerEmail").value,
      password : document.getElementById("writerPassword").value
  }

          this.props.loginWriter(data);

  
  }

return (
  <div className="container">
  {this.state.writer.isAuthenticated ? (<Redirect to="/backend/writer/dashboard" />) : null}
     <div className="authPage-signIn  adminAuth" >

<h1>Sign In as Writer</h1>
<form className="authPage-signIn-form" onSubmit={handelFormSubmit}>
<input type="email" name="email" placeholder="email" id="writerEmail"/>
<input type="password" name="password" placeholder="password" id="writerPassword"/>

<input type="submit" className="authPage-signIn-form-btn adminAuth-btn" value="Log In"/>
</form>

</div>
  </div>
)
  }
}


const mapStateToProps = state=>({
writer : state.writer
})
export default connect(mapStateToProps,{loginWriter,getCurrentWriter})(writerAuth)
