import { GET_ALL_TL, TL_LOAD, TL_ERROR ,GET_TL_BY_CODE} from "./types";

import axios from "axios";

export const getAllTl = () => dispatch => {
  dispatch({
    type: TL_LOAD
  });

  axios
    .get("/api/admin/viewalltl")
    .then(result => {
      dispatch({
        type: GET_ALL_TL,
        payload: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: TL_ERROR,
        payload: err.result
      });
    });
};

export const getTlByCode = (tlCode)=>dispatch=>{
    dispatch({
        type : TL_LOAD
    })

    axios.post("/api/tl/byCode",{tlCode}).then(result=>{
        if(result.data.success){
          dispatch({
            type : GET_TL_BY_CODE,
            payload : result.data.tlData
          })
        }else
        dispatch({
          type : TL_ERROR,
          payload : "SOME ERROR OCCOURED"
        })
        
    }).catch();
}
