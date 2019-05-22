import { GET_ALL_TL, TL_LOAD, TL_ERROR ,GET_TL_BY_CODE} from "../actions/types";

const initialState = {
  allTl: [],
  tlLoading: false,
  selectedTl: null,
  tlError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TL_LOAD: {
      return {
        ...state,
        tlLoading: true
      };
    }

    case GET_ALL_TL: {
      return {
        ...state,
        tlLoading: false,
        allTl: action.payload,
        tlError: null
      };
    }

    case TL_ERROR: {
      return {
        ...state,
        tlLoading: false,
        tlError: action.payload
      };
    }

    case GET_TL_BY_CODE:{
        return{
            ...state,
            tlLoading : false,
            selectedTl : action.payload
        }
    }

    default:
      return state;
  }
};
