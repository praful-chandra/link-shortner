import React, { Component } from 'react'
import {Link} from 'react-router-dom';

 class articleBig extends Component {



  render() {


 
    
    return (
        <div className="articleBig">
      
        {!this.props.invert ? (
            <>
            <div className="articleBig-left">
            <img src={this.props.content.cover} alt="" />
          </div>
  
          <div className="articleBig-right">
            <p className="articleBig-right-title">{this.props.content.title}</p>
            <p className="articleBig-right-desc">
       </p>
         <Link to={"/blog/"+this.props.content.blogCode}  className="articleBig-right-btn">   <button className="btn btn-outline-secondary " >Read more </button></Link> 
          </div>
            </>
          ) : 
          <>
          <div className="articleBig-right articleBig-right-invert">
            <img  className="articleBig-right-invert-img" src={this.props.content.cover} alt="" />
          </div>
  
          <div className="articleBig-left-invert">
            <p className="articleBig-right-title">{this.props.content.title}</p>
            <p className="articleBig-right-desc"></p>
           <Link to={"/blog/"+this.props.content.blogCode} className="articleBig-right-invert-btn" > <button className="btn btn-outline-secondary " >Read more </button></Link> 
  
          </div>
          </>
       }
  
        </div>
    )
  }
}


export default articleBig;