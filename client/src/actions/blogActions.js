import axios from "axios";
import {GET_BLOG_BY_CODE,GET_ALL_BLOGS,BLOG_ERROR,BLOG_LOADING} from "./types";

export const getBlogByCode =(blogCode)=>dispatch=>{
const blogData= {
    blogCode
}
    axios.post("/api/blog/byCode",blogData).then(data=>{
        const result = data.data;
        
        if(result.success)
        dispatch({
            type : GET_BLOG_BY_CODE,
            payload : result.data
        })

        else
        dispatch({
            type : BLOG_ERROR,
            payload : result.error
        })
        
        
    })


}

export const getAllBlogs = ()=>dispatch=>{

    dispatch({
        type : BLOG_LOADING
    })


    axios.get("/api/blog/all").then(data=>{
    const result = data.data;
    
    if(result.success)
        dispatch({
            type : GET_ALL_BLOGS,
            payload : result.data
        })

        else
        dispatch({
            type : BLOG_ERROR,
            payload : result.error
        })


        
    })

   
}