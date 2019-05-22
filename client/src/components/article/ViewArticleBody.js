import React, { Component } from 'react';
import {connect} from 'react-redux';
import CuratedStylesContainer from "../CuratedStyles/CuratedStylesContainer";
import CuratedStyles from "../CuratedStyles/CuratedStyles";
import renderHtml from "react-render-html";
import ReactQuill from "react-quill";

import {likeBlog} from "../../actions/userActions";

 class ViewArticleBody  extends Component {

constructor(props) {
  super(props)

  this.state = {
    isLiked : this.props.isLiked,
    likes : this.props.content.likedBy.length
  }
}

  componentDidMount(){

  }

  likeBlog = ()=>{
    
    if(this.props.user.isAuthenticated){
      this.props.likeBlog(this.props.content.blogCode);
      this.setState({
        isLiked : true,
        likes : this.state.likes + 1
      })
    }else
      alert("login to like blogs")
    
  }

  unLikeBlog = ()=>{
    if(this.props.user.isAuthenticated){
      this.props.likeBlog(this.props.content.blogCode);
      this.setState({
        isLiked : false,
        likes : this.state.likes - 1
      })
    }else
      alert("login to like blogs")
  }

  render() {
    let styleReference = [];
    let selectedStyle = [];
   let blogBody = this.props.content.description;


   
    return (
        <div className="container-fluid">
    
            
              <div className="viewArticle-img-wrapper">
                <img src={this.props.content.cover} alt="cover" />
              </div>
                <div className="viewArticle-socialLinks">
                {this.state.isLiked ? (
                  <span><i className="fas fa-thumbs-up" onClick={this.unLikeBlog}  ></i>{' '}<span>{this.state.likes}</span></span> 
                ):(
                  <span><i className="far fa-thumbs-up" onClick={this.likeBlog} ></i>{' '}<span>{this.state.likes}</span></span> 
                )}
               <i className="fas fa-share-alt" onClick={this.props.blogShare}></i>
                  {/* {this.props.share ? <Share link={window.location.href} /> : null} */}
                </div>
              <div className="viewArticle-title">
                {this.props.content.title}
              </div>
    
              <div className="viewArticle-desc container" >
                {/* {renderHtml(blogBody)} */}
                <ReactQuill 
                readOnly
                value={blogBody}
                modules={{"toolbar" : false}}
                theme="bubble"
                />
                  </div>
              {this.props.content.content.map((content, i) =>{
                if(content.styleReference && content.styleReference.length >0){
                  if(!styleReference.includes(content.styleReference))
                    styleReference.push(content.styleReference);
                }
                
               return (i + 1) % 2 !== 0 ? (
                  <div key={i} className="viewArticle-content-wrapper">
                    <a
                      href={content.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={content.img}
                        alt=""
                        className="viewArticle-content-img"
                      />
                    </a>
                    <div className="viewArticle-content-body">
                      {content.blogContent}
                      
                    </div>
                  </div>
                ) : (
                  <div key={i} className="viewArticle-content-wrapper">
                    <a
                      href={content.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={content.img}
                        alt=""
                        className="viewArticle-content-img-invert"
                      />
                    </a>
                    <div className="viewArticle-content-body-invert">
                      {content.blogContent}
                     
                    </div>
                  </div>
                )}
              )}
    


     

            </div>
      )
  }
}
const mapStateToProps = state=>({
  user : state.user
})
export default connect(mapStateToProps,{likeBlog})(ViewArticleBody)