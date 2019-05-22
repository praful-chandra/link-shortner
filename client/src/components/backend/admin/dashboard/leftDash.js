import React, { Component } from 'react';
import classnames from "classnames";

export default class leftDash extends Component {

constructor(props) {
  super(props)

  this.state = {
     tl : true,
     curator : false,
     writer : false,
     notifications : false
  }
}

navLinks = component =>{
    switch(component){

        case "tl" :
            this.setState({
                tl : true,
                curator : false,
                writer : false,
                notifications : false
            })
        
        break;
        
        case "c" :
            this.setState({
                tl : false,
                curator : true,
                writer : false,
                notifications : false
            })
        
        break;
        
        case "w" :
            this.setState({
                tl : false,
                curator : false,
                writer : true,
                notifications : false
            })
        
        break;
        
        case "n" :
            this.setState({
                tl : false,
                curator : false,
                writer : false,
                notifications : true
            })
        
        break;

        default :{
            this.setState({
                tl : false,
                curator : false,
                writer : false,
                notifications : false
            })
        }

    }


}


  render() {
    this.props.render(this.state)

    return (
      <div className="adminDash-leftPanel">
        <div className="adminDash-leftPanel-profile">

        <div className="adminDash-leftPanel-profile-avatar"> 
        <img src={require("../../../../images/curator/best-curator.png")} alt=""/>
             </div>
        <div className="adminDash-leftPanel-profile-name"> ADMIN </div>

        </div>

        <div className="adminDash-leftPanel-links">
                <ul>
                    <li onClick={()=>this.navLinks("tl")} className={classnames({"adminDash-leftPanel-activeLink" : this.state.tl})}>Team Leader</li>
                    <li onClick={()=>this.navLinks("c")} className={classnames({"adminDash-leftPanel-activeLink" : this.state.curator})}>curator</li>
                    <li onClick={()=>this.navLinks("w")} className={classnames({"adminDash-leftPanel-activeLink" : this.state.writer})}>Writer</li>
                    <li onClick={()=>this.navLinks("n")} className={classnames({"adminDash-leftPanel-activeLink" : this.state.notifications})}>Notifications</li>
                </ul>
        </div>
      </div>
    )
  }
}
