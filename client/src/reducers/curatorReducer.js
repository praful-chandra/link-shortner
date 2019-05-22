import {
  GET_ALL_CURATORS,
  CURATOR_LOAD,
  CURATOR_ERROR,
  GET_CURATOR_BY_CODE,
  CURATOR_LOGIN,
  SET_CURATOR,
  LOGOUT_CURATOR,
  UPDATE_CURATOR,
  GET_CURATOR_STYLES,
GET_CURATOR_DESIGNS
} from "../actions/types";

const initialState = {
  curatorLoading: false,
  allCurator: [],
  selectedCurator: null,
  curatorError: null,
  isAuthenticated: false,
  curator: null,
  myStyles : null,
  myDesigns : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CURATOR_LOAD: {
      return {
        ...state,
        curatorLoading: true
      };
    }

    case CURATOR_LOGIN: {
      return {
        ...state,
        curatorLoading: false,
        isAuthenticated: true,
        curator: action.payload
      };
    }
    case SET_CURATOR: {
      return {
        ...state,
        curator: action.payload,
        curatorLoading: false,
        isAuthenticated: true
      };
    }

    case GET_ALL_CURATORS: {
      return {
        ...state,
        allCurator: action.payload,
        curatorLoading: false
      };
    }

    case GET_CURATOR_BY_CODE: {
      return {
        ...state,
        curatorLoading: false,
        selectedCurator: action.payload
      };
    }

    case CURATOR_ERROR: {
      return {
        ...state,
        curatorLoading: false,
        curatorError: action.payload
      };
    }

    case LOGOUT_CURATOR: {
      return {
        ...state,
        curator: null,
        curatorLoading: false,
        isAuthenticated: false,
        curatorError: null
      };
    }

    case UPDATE_CURATOR:{
        return{
            ...state,
            curator : action.payload,
            curatorLoading : false
        }
    }

    case GET_CURATOR_STYLES:{      
      return{
        ...state,
        myStyles : action.payload,
        curatorLoading : false
      }
    }
    
    case GET_CURATOR_DESIGNS:{
      return{
        ...state,
        myDesigns : action.payload,
        curatorLoading : false
      }
    }

    default: {
      return state;
    }
  }
};
