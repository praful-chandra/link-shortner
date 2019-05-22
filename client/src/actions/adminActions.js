import {LOGIN_ADMIN,ADMIN_LOAD,ADMIN_ERROR,SET_ADMIN,LOGOUT_ADMIN} from "./types";
import setAuthToken from "../utils/setAuthToken";

import axios from "axios";
import jwt_decode from 'jwt-decode';




export const loginAdmin = (loginDetails)=>dispatch=>{

    dispatch({
        type:ADMIN_LOAD
        })

        axios.post("/api/adminauth/login",loginDetails).then(result=>{
        
            
            if(result.data.success){
                const {token} =result.data;
                   //set token to storage
                   localStorage.setItem('jwtToken',token);
                    
                   //set token to auth header
                   setAuthToken(token);
        
                   //decode token to get user data
                   const decoded = jwt_decode(token);
                   dispatch({
                    type: LOGIN_ADMIN,
                    payload: decoded.users
                  });
              }else{
                  dispatch({
                      type : ADMIN_ERROR,
                      payload : "AUTH ERROR"
                  })
              }

            }).catch(err=>{
                dispatch({
                    type : ADMIN_ERROR,
                    payload : "AUTH ERROR"
                })
            })

        }

export const getCurrentAdmin = (adminToken)=>dispatch=>{
    dispatch({
        type:ADMIN_LOAD
        })

    
axios.get("/api/adminAuth/current",{
headers :{Authorization : adminToken}
}).then(result=>{
  if(result.data.typeOfUser === "admin"){
    axios.defaults.headers.common['Authorization'] = adminToken;
    dispatch({
        type : SET_ADMIN,
        payload : result.data
    })
  }else{
    dispatch({
        type : ADMIN_ERROR,
        payload : "notLoggedIn"
    })
  }
  
    
}).catch(err=>{
    dispatch({
        type : ADMIN_ERROR,
        payload : "notLoggedIn"
    })
})


}

export const logOutAdmin = ()=>dispatch=>{
    dispatch({
        type : ADMIN_LOAD
    })
    
    setAuthToken();
    localStorage.removeItem("jwtToken");
    dispatch({
        type : LOGOUT_ADMIN
    })
}

export const addTl = (tlData)=>dispatch=>{


axios.post("/api/tlauth/adminregister",tlData).then(result=>{
   
    if(result.data.auth.success && result.data.profile.success &&result.data.notification.success)
    alert("SUCCESSFULLY CREATED")
    else
    alert("SOME ERROR OCCOURED")
    
}).catch(err=>{
        if(err.response.data.email)
            alert(err.response.data.email)
    else
    alert("some error occoured")
});
}

export const addCurator = (curatorData)=>dispatch=>{


    axios.post("/api/curatorauth/adminregister",curatorData).then(result=>{
       
        if(result.data.auth.success && result.data.profile.success &&result.data.notification.success)
        alert("SUCCESSFULLY CREATED")
        else
        alert("SOME ERROR OCCOURED")
        
    }).catch(err=>{
            if(err.response.data.email)
                alert(err.response.data.email)
        else
        alert("some error occoured")
    });
    }
    
export const addWriter = (writerData)=>dispatch=>{


    axios.post("/api/writerauth/adminregister",writerData).then(result=>{
       
        if(result.data.auth.success && result.data.profile.success &&result.data.notification.success)
        alert("SUCCESSFULLY CREATED")
        else
        alert("SOME ERROR OCCOURED")
        
    }).catch(err=>{
            if(err.response)
            if(err.response.data.email)
                alert(err.response.data.email)
        else
        alert("some error occoured")
    });
    }