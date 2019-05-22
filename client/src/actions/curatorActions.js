import {
  CURATOR_LOGIN,
  GET_ALL_CURATORS,
  CURATOR_LOAD,
  CURATOR_ERROR,
  GET_CURATOR_BY_CODE,
  SET_CURATOR,
  LOGOUT_CURATOR,
  UPDATE_CURATOR,
  GET_CURATOR_STYLES,
  GET_CURATOR_DESIGNS
} from "./types";
import setAuthToken from "../utils/setAuthToken";

import axios from "axios";
import jwt_decode from "jwt-decode";

export const loginCurator = loginDetails => dispatch => {
  dispatch({
    type: CURATOR_LOAD
  });

  axios
    .post("/api/curatorauth/login", loginDetails)
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
          type: CURATOR_LOGIN,
          payload: decoded.users
        });
      } else {
        dispatch({
          type: CURATOR_ERROR,
          payload: "AUTH ERROR"
        });
      }
    })
    .catch(err => {
      dispatch({
        type: CURATOR_ERROR,
        payload: "AUTH ERROR"
      });
    });
};

export const getCurrentCurator = curatorToken => dispatch => {
  dispatch({
    type: CURATOR_LOAD
  });

  axios
    .get("/api/curatorAuth/current", {
      headers: { Authorization: curatorToken }
    })
    .then(result => {
      if (result.data.typeOfUser === "curator") {
        axios.defaults.headers.common["Authorization"] = curatorToken;
        dispatch({
          type: SET_CURATOR,
          payload: result.data
        });
      } else {
        dispatch({
          type: CURATOR_ERROR,
          payload: "notLoggedIn"
        });
      }
    })
    .catch(err => {
      dispatch({
        type: CURATOR_ERROR,
        payload: "notLoggedIn"
      });
    });
};

export const getAllCurators = () => dispatch => {
  dispatch({
    type: CURATOR_LOAD
  });

  axios
    .get("/api/admin/viewallcurator")
    .then(result => {
      dispatch({
        type: GET_ALL_CURATORS,
        payload: result.data
      });
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CURATOR_ERROR,
        payload: err.result
      });
    });
};

export const logOutCurator = () => dispatch => {
  dispatch({
    type: CURATOR_LOAD
  });

  setAuthToken();
  localStorage.removeItem("jwtToken");
  dispatch({
    type: LOGOUT_CURATOR
  });
};

export const updateCurator = curatorData =>dispatch=>{
  dispatch({
    type : CURATOR_LOAD
  })

  axios.post("/api/curator/updateprofile",curatorData).then(result=>{
    if(result.data.success){
      
      dispatch({
        type : UPDATE_CURATOR,
        payload : result.data.Curator
      })
    }else{
      dispatch({
        type : CURATOR_ERROR,
        payload : "Error occoured"
      })
    }
  }).catch(err=>dispatch({type : CURATOR_ERROR , payload : "Error occoured"}))


}

export const getCuratorStyles = ()=>dispatch=>{
  dispatch({
    type : CURATOR_LOAD
  })

  axios.get("/api/curator/mystyles").then(result=>{
    
    if(result.data.success){
      
      dispatch({
        type : GET_CURATOR_STYLES,
        payload : result.data.styles
      })

    }else{
      dispatch({
        type : CURATOR_ERROR,
        payload : "Error occoured"
      })
    }
  }).catch(err=>dispatch({type : CURATOR_ERROR , payload :  "Error occoured"}))

}


export const getCuratorDesigns = ()=>dispatch=>{
  dispatch({
    type : CURATOR_LOAD
  })

  axios.get("/api/curator/mydesigns").then(result=>{
    if(result.data.success){
      
      dispatch({
        type : GET_CURATOR_DESIGNS,
        payload : result.data.designs
      })

    }else{
      dispatch({
        type : CURATOR_ERROR,
        payload : "Error occoured"
      })
    }
  }).catch(err=>dispatch({type : CURATOR_ERROR , payload :  "Error occoured"}))

}

export const addStyles = (data)=>dispatch=>{

  dispatch({
    type : CURATOR_LOAD
  })

  axios.post("/api/curator/addstyle",data).then(result=>{
    if(result.data.success){
      
      dispatch({
        type : GET_CURATOR_STYLES,
        payload : result.data.styles
      })

    }else{
      dispatch({
        type : CURATOR_ERROR,
        payload : "Error occoured"
      })
    }
  }).catch(err=>dispatch({type : CURATOR_ERROR , payload :  "Error occoured"}))
}




export const addDesigns = data =>dispatch=>{
  
  axios.post("/api/curator/adddesign",data,{
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  }).then(res=>console.log(res)).catch(err=>console.log(err)  );
}