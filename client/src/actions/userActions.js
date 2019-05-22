import axios from "axios";
import jwt_decode from 'jwt-decode';

import {GET_CURRENT_USER,LOGOUT_USER,LIKE_BLOG} from "./types";
import setAuthToken from "../utils/setAuthToken";


export const likeBlog = (blogCode)=>dispatch=>{
  axios.post("/api/user/likeblog",{blogCode}).then(response=>{
    console.log(response);
    
  })
}


export const getCurrentUser = ()=>dispatch=>{

    axios.get("/api/userauth/current").then(result=>{
        if(result.data.success){
            const {token} =result.data;
                   //set token to storage
                   localStorage.setItem('jwtToken',token);
                    
                   //set token to auth header
                   setAuthToken(token);
        
                   //decode token to get user data
                   const decoded = jwt_decode(token);
                   
                   dispatch({
                    type: GET_CURRENT_USER,
                    payload: decoded.users
                  });
        }
    })
}

export const logoutUser = ()=>dispatch=>{
    setAuthToken();
  localStorage.removeItem("jwtToken");
  axios.get("/api/userauth/logout").then(()=>{
    dispatch({
        type: LOGOUT_USER
      });
  })
 
}