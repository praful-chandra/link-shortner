import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from 'classnames';


import ViewArticleBody from "./ViewArticleBody";
import {getBlogByCode} from "../../actions/blogActions";
class ViewArticle extends Component {

constructor(props) {
  super(props)

  this.state = {
     selectedBlog : null
  }
}

componentDidMount(){
  const blogCode = this.props.match.params.id
  this.props.getBlogByCode(blogCode);
  
}

componentWillReceiveProps(nextProps){
  
  if(nextProps.blogs.selectedBlog){
this.setState({
  selectedBlog : nextProps.blogs.selectedBlog
})    
  }
}






  render() {

if(this.state.selectedBlog){
  let isLiked = [];
  
 if(this.props.user.user ){
   
   isLiked = this.state.selectedBlog.likedBy.filter(users=>{
    return users.userId === this.props.user.user._id
  })
 }
 
      return (
        <>

          <ViewArticleBody
            content={this.state.selectedBlog}
            isLiked={isLiked.length === 0 ? false : true}
           // blogShare={this.blogShare}
          //  share={this.state.share}
          />

        </>
      )}
      else
        return <h1>infrnt</h1>
      
}
}

const mapStateToProps = state =>({
  blogs : state.blogs,
  user : state.user
})

export default connect(  mapStateToProps,  {getBlogByCode })(ViewArticle);
