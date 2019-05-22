import {GET_BLOG_BY_CODE,BLOG_LOADING,BLOG_ERROR,GET_ALL_BLOGS} from "../actions/types";

const initialState = {
  blogLoading: false,
  allBlogs :[],
  selectedBlog : null,
  blogError : null
 
};

export default (state = initialState, action) => {
  switch (action.type) {

case BLOG_LOADING :{
  return {
    ...state,
    blogLoading : true
  }
}

    case GET_BLOG_BY_CODE :{

      return {
        ...state,
        selectedBlog : action.payload,
        blogLoading : false,
        blogError : null
      }
    }

    case GET_ALL_BLOGS :{
      return {
        ...state,
        blogLoading : false,
        allBlogs : action.payload,
        blogError : null
      }
    }

    case BLOG_ERROR :{
      return {
        ...state,
        blogLoading : false,
        blogError : action.payload
      }
    }
    
    default:
      return state;
  }
};
