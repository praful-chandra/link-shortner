import axios from "axios";

import {GET_DESIGN_BY_CODE,GET_ALL_DESIGNS ,DESIGN_LOAD,DESIGN_ERROR} from "./types";

export const getDesignByCode = (designCode)=>dispatch=>{

    dispatch({
        type : DESIGN_LOAD
    })

    axios.post("/api/design/byCode",{designCode}).then(data=>{
        const result = data.data;
        if(result.success)
            dispatch({
                type : GET_DESIGN_BY_CODE,
                payload : result.data
            })
    
            else
            dispatch({
                type : DESIGN_ERROR,
                payload : result.error
            })
    
    })

}

export const getAllDesigns = ()=>dispatch=>{
    dispatch({
        type : DESIGN_LOAD
    })

    axios.get("/api/design/all").then(data=>{
        const result = data.data;
        
        if(result.success)
            dispatch({
                type : GET_ALL_DESIGNS,
                payload : result.data
            })
    
            else
            dispatch({
                type : DESIGN_ERROR,
                payload : result.error
            })
    
    
            
        });

}


