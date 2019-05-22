import {LOGIN_ADMIN,ADMIN_LOAD,ADMIN_ERROR,SET_ADMIN,LOGOUT_ADMIN} from "../actions/types";

const initialState = {
    isAuthenticated : false,
    admin:null,
    adminError : null,
    adminLoading : false
}


export default (state = initialState, action) => {
    switch (action.type) {

      case ADMIN_LOAD :{
        return {
          ...state,
          adminLoading : true
        }
      }

      case LOGIN_ADMIN :{
        return {
          ...state,
          isAuthenticated : true,
          admin : action.payload,
         adminLoading : false,
         adminError : null
        }
      }

      case ADMIN_ERROR :{
        return{
          ...state,
          adminLoading : false,
          adminError : action.payload
        }
      }
     
      case SET_ADMIN :{
        return{
          ...state,
          admin :action.payload,
          adminLoading : false,
          isAuthenticated : true

        }
      }
      
      case LOGOUT_ADMIN:{
        return{
          ...state,
          admin : null,
          adminLoading : false,
          isAuthenticated : false,
          adminError : null
        }
      }

      default:
        return state;
    }
  };
  
