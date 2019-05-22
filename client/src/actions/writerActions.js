import {
  LOGIN_WRITER,
  WRITER_LOAD,
  WRITER_ADD_BLOG_HEAD,
  GET_ALL_WRITERS,
  LOGOUT_WRITER,
  WRITER_ERROR,
  WRITER_ADD_BLOG_CONTENT,
  GET_WRITER_BLOGS
} from "./types";
import setAuthToken from "../utils/setAuthToken";

import axios from "axios";
import jwt_decode from "jwt-decode";

export const getAllWriters = () => dispatch => {
  dispatch({
    type: WRITER_LOAD
  });

  axios
    .get("/api/admin/viewallwriter")
    .then(result => {
      dispatch({
        type: GET_ALL_WRITERS,
        payload: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: WRITER_ERROR,
        payload: err.result
      });
    });
};

export const loginWriter = loginDetails => dispatch => {
  dispatch({
    type: WRITER_LOAD
  });

  axios
    .post("/api/writerAuth/login", loginDetails)
    .then(result => {
      if (result.data.success) {
        const { token } = result.data;
        //set token to storage
        localStorage.setItem("jwtToken", token);

        //set token to auth header
        setAuthToken(token);

        //decode token to get user data
        const decoded = jwt_decode(token);
        dispatch({
          type: LOGIN_WRITER,
          payload: decoded.users
        });
      }
    })
    .catch(err => console.log(err));
};

export const addBlogHead = blogHead => dispatch => {
  dispatch({
    type: WRITER_LOAD
  });
  axios.post("/api/writer/addBlogHead", blogHead).then(result => {
    if (result.data.success) {
      dispatch({
        type: WRITER_ADD_BLOG_HEAD,
        payload: result.data.savedBlog
      });
    }
  });
};

export const addBlogContent = blogContent =>dispatch =>{
  dispatch({
    type : WRITER_LOAD
  })
  axios.post("/api/writer/addBlogContent",blogContent).then(result=>{
    if(result.data.success){
      dispatch({
        type : WRITER_ADD_BLOG_CONTENT,
        payload : result.data.updatedBlog
      })
    }else{
      dispatch({
        type: WRITER_ERROR,
        payload: "error occoured"
      });
    }
  }).catch(()=>{
    dispatch({
      type: WRITER_ERROR,
      payload: "error occoured"
    });
  })
}

export const getWriterBlogs = ()=>dispatch=>{
  dispatch({
    type : WRITER_LOAD
  })

  axios.post("/api/writer/writerblogs").then(result=>{
    if(result.data.success){
      dispatch({
        type : GET_WRITER_BLOGS,
        payload : result.data.blogs
      })
    }else{
      dispatch({
        type: WRITER_ERROR,
        payload: "error occoured"
      });
    }
  }).catch(()=>{
    dispatch({
      type: WRITER_ERROR,
      payload: "error occoured"
    });
  })
}


export const logOutWriter = ()=>dispatch=>{
  dispatch({
    type: WRITER_LOAD
  });

  setAuthToken();
  localStorage.removeItem("jwtToken");
  dispatch({
    type: LOGOUT_WRITER
  });
}

export const getCurrentWriter = (writerToken)=>dispatch=>{
  dispatch({
    type: WRITER_LOAD
  });

  axios
    .get("/api/writerAuth/current", {
      headers: { Authorization: writerToken }
    })
    .then(result => {
      if (result.data.typeOfUser === "writer") {
        axios.defaults.headers.common["Authorization"] = writerToken;
        
        dispatch({
          type: LOGIN_WRITER,
          payload: result.data
        });
      } else {
        dispatch({
          type: WRITER_ERROR,
          payload: "notLoggedIn"
        });
      }
    })
    .catch(err => {
      dispatch({
        type: WRITER_ERROR,
        payload: "notLoggedIn"
      });
    });
}

