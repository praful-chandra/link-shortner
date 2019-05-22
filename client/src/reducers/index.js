import {combineReducers} from "redux"; 

import blogReducer from "./blogReducer";
import styleReducer from "./styleReducer";
import designReducer from "./designReducer";

import writerReducer from "./writerReducer";
import adminReducer from "./AdminReducer";
import tlReducer from "./tlReducers";
import curatorReducer from "./curatorReducer";
import userReducer from "./UserReducer";

export default combineReducers({
    blogs : blogReducer,
    styles : styleReducer,
    designs : designReducer,  
    admin : adminReducer,
    writer : writerReducer,
    tl : tlReducer,
    curator : curatorReducer,
    user : userReducer
}); 