import {GET_CURRENT_USER,LOGOUT_USER} from "../actions/types";

const initialState = {
    isAuthenticated : false,
    userLoading : false,
    user : null
}

export default (state = initialState,action)=>{
    switch(action.type){

        case GET_CURRENT_USER :{
            return{
                ...state,
                isAuthenticated : true,
                user : action.payload,
                userLoading : false
            }
        }

        case LOGOUT_USER :{
            return{
                ...state,
                isAuthenticated : false,
                user : null,
                userLoading  : false
            }
        }

        default : return state
    }
}