import {
  WRITER_LOAD,
  LOGIN_WRITER,
  WRITER_ADD_BLOG_HEAD,
  GET_ALL_WRITERS,
  WRITER_ERROR,
  LOGOUT_WRITER,
  WRITER_ADD_BLOG_CONTENT,
  GET_WRITER_BLOGS
} from "../actions/types";

const initialState = {
  writerLoading: false,
  isAuthenticated: false,
  writer: null,
  writerError: null,
  addBlog: null,
  allWriters: [],
  writerBlogs : []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WRITER_LOAD: {
      return {
        ...state,
        writerLoading: true
      };
    }

    case LOGIN_WRITER: {
      return {
        ...state,
        writerLoading: false,
        writer: action.payload,
        isAuthenticated: true
      };
    }

    case WRITER_ADD_BLOG_HEAD: {
      return {
        ...state,
        writerLoading: false,
        addBlog: {
          head: action.payload
        }
      };
    }

    case WRITER_ADD_BLOG_CONTENT:{
      return{
        ...state,
        writerLoading : false,
        addBlog:{
          ...state.addBlog,
          content : action.payload.content
        }
      }
    }

    case GET_WRITER_BLOGS :{
      return{
        ...state,
        writerLoading : false,
        writerBlogs : action.payload
      }
    }

    case GET_ALL_WRITERS: {
      return {
        ...state,
        writerLoading: false,
        allWriters: action.payload
      };
    }

    case WRITER_ERROR: {
      return {
        ...state,
        writerLoading: false,
        writerError: action.payload
      };
    }

    case LOGOUT_WRITER :{
        return{
            ...state,
            writerLoading : false,
            writer : null,
            writerError  : null,
            isAuthenticated : false,
            addBlog: null,
            allWriters: [],
            writerBlogs : []
        }
    }
    default: {
      return state;
    }
  }
};
