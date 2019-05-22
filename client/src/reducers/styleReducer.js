import { GET_STYLE_BY_CODE, STYLE_LOAD ,GET_ALL_STYLES,STYLE_ERROR} from "../actions/types";

const initialState = {
  styleLoading: false,
  allStyles: [],
  selectedStyle: null,
  styleError : null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case STYLE_LOAD  :{
        return{
            styleLoading : true
        }
    }

    case GET_ALL_STYLES :{
        return {
            ...state,
            styleLoading : false,
            allStyles : action.payload
        }
    }

    case STYLE_ERROR :{
        return{
            ...state,
            styleLoading : false,
            styleError : action.payload
        }
    }
    case GET_STYLE_BY_CODE: {
      return {
        ...state,
        styleLoading : false,
        selectedStyle : action.payload
      };
    }

    default:
      return state;
  }
};
