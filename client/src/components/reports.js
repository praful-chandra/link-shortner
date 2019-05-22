import React, { Component } from "react";
import {connect} from "react-redux"
import ArticleBig from "./article/articleBig";
import ArticleSmall from "./article/ArticleSmall";
import CuratedStylesContainer from "./CuratedStyles/CuratedStylesContainer";
import CuratedStyles from "./CuratedStyles/CuratedStyles";

import {getAllBlogs} from "../actions/blogActions";

class reports extends Component {
constructor(props) {
  super(props)

  this.state = {
     allBlogs :[]
  }
}

componentDidMount(){
this.props.getAllBlogs();

}

componentWillReceiveProps(nextProps){
  if(nextProps){
    if(this.state.allBlogs !== nextProps.blogs.allBlogs){
      this.setState({
        allBlogs : nextProps.blogs.allBlogs
      })
    }
  }
}

makeid = () => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

renderBlogs = ()=>{

  let content = [];
  let allBlogs = this.state.allBlogs;
  let blogCount = this.state.allBlogs.length-1;
 let divisions = Math.ceil(blogCount/6);

  let blogIndex = -1;

 
  
  


    for(let j =0 ; j< divisions ; j++){

      for (let i = 0; i < 6; i++) {
        
        if (i === 0 && (blogIndex+1 <= blogCount)) {

          content.push(
            <div key={this.makeid()}>
              <ArticleBig invert={false} content={allBlogs[++blogIndex]} />{" "}
            </div>
          );

        }

        if (blogCount >= blogIndex + 3)
          if (i > 0 && i <= 3) {
            
            content.push(
              <div key={this.makeid()}>
                <ArticleSmall
                  content1={allBlogs[++blogIndex]}
                  content2={allBlogs[++blogIndex]}
                  content3={allBlogs[++blogIndex]}
                />
              </div>
            );
            i += 3;
          }

        if (i === 4 && (blogIndex+1 <= blogCount)) {

          content.push(
            <div key={this.makeid()}>
              <ArticleBig invert={true} content={allBlogs[++blogIndex]} />{" "}
            </div>
          );
        }  

        if (i === 5 && (blogIndex+1 <= blogCount)) {

          content.push(
            <div key={this.makeid()}>
              <ArticleBig invert={false} content={allBlogs[++blogIndex]} />{" "}
            </div>
          );
        }

        

      }
    }

return content;

}


  render() {

    

    
    return (
      <div>

{this.state.allBlogs.length >0 ? 
 this.renderBlogs() : null}

       
      </div>
    );
  }
}

const mapStateToProps = state => ({
  blogs : state.blogs
});


export default connect(mapStateToProps,{getAllBlogs})(reports);
