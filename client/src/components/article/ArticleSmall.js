import React, { Component } from "react";
import {Link} from 'react-router-dom';

class ArticleSmall extends Component {






  render() {
    
    return (
      <div className="articleSmall row">
        {this.props.content1 ? (
          <div className="col-md-4 articleSmall-item">
            <img src={this.props.content1.cover} alt="" />
            <p className="articleSmall-item-title">
              {this.props.content1.title}
            </p>
          <Link to={"/blog/"+this.props.content1.blogCode} >  <button className="btn btn-outline-secondary " >Read More</button></Link> 
          </div>
                    

        ) : null}

        {this.props.content2 ? (
          <div className="col-md-4 articleSmall-item">
            <img src={this.props.content2.cover} alt="" />
            <p className="articleSmall-item-title">
              {" "}
              {this.props.content2.title}
            </p>
          <Link to={"/blog/"+this.props.content2.blogCode} >  <button className="btn btn-outline-secondary " >Read more </button></Link> 
          </div>
                    

        ) : null}

        {this.props.content3 ? (
          <div className="col-md-4 articleSmall-item">
            <img src={this.props.content3.cover} alt="" />
            <p className="articleSmall-item-title">
              {" "}
              {this.props.content3.title}
            </p>
         <Link to={"/blog/"+this.props.content3.blogCode} >   <button className="btn btn-outline-secondary ">Read more </button></Link> 
          </div>
                    

        ) : null}
      </div>
    );
  }
}

export default ArticleSmall;
