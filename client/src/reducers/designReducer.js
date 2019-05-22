import {GET_DESIGN_BY_CODE ,GET_ALL_DESIGNS,DESIGN_LOAD,DESIGN_ERROR} from "../actions/types";


const initialState = {
  allDesigns: [],
selectedDesign : null,
designLoading : false,
designError : null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case DESIGN_LOAD :{
      return {
        ...state,
        designLoading : true
      }
    }

    case GET_DESIGN_BY_CODE :{
     
        return{
            ...state,
            selectedDesign : action.payload,
            designLoading : false
        }
    }

    case GET_ALL_DESIGNS :{

      return{
        ...state,
        designLoading : false,
        allDesigns : action.payload
      }
    }

    case DESIGN_ERROR:{
      return{
        ...state,
        designLoading : false,
        designError : action.payload
      }
    }

 

    default:
      return state;
  }
};
